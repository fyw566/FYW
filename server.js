/**
 * 飞鱼丸工作台 · 后端服务
 * - 静态托管前端 (public/)
 * - GET  /api/data         读取共享数据 (public/data.json)
 * - POST /api/data         写入共享数据 (需要 token，由每日自动化任务调用)
 * - GET  /api/refresh      触发一次 best-effort 抓取（token 保护）
 * - 每日 09:00 自动 best-effort 刷新
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'public');
const DATA_FILE = path.join(DATA_DIR, 'data.json');
const API_TOKEN = process.env.API_TOKEN || 'feiyuwan-secret-2026';

app.use(express.json({ limit: '4mb' }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, x-api-token');
  next();
});

// ---------------- 数据读写 ----------------
function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    return {
      meta: { updatedAt: null, source: 'init' },
      exhibitions: [], xianJobs: [], shenyangJobs: [], douyinHot: []
    };
  }
}

function writeData(obj) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8');
}

// ---------------- 路由 ----------------
// 静态资源（必须在 API 路由之后或之前均可，express 会按路径匹配）
app.use(express.static(DATA_DIR));

app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(readData());
});

app.post('/api/data', (req, res) => {
  const token = req.query.token || req.headers['x-api-token'];
  if (token !== API_TOKEN) return res.status(403).json({ ok: false, error: 'unauthorized' });
  const d = req.body;
  if (!d || typeof d !== 'object') return res.status(400).json({ ok: false, error: 'bad body' });

  const merged = {
    meta: { updatedAt: new Date().toISOString(), source: 'automation' },
    exhibitions: Array.isArray(d.exhibitions) ? d.exhibitions : [],
    xianJobs: Array.isArray(d.xianJobs) ? d.xianJobs : [],
    shenyangJobs: Array.isArray(d.shenyangJobs) ? d.shenyangJobs : [],
    douyinHot: Array.isArray(d.douyinHot) ? d.douyinHot : []
  };
  try {
    writeData(merged);
    res.json({ ok: true, updatedAt: merged.meta.updatedAt });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.get('/api/refresh', async (req, res) => {
  const token = req.query.token || req.headers['x-api-token'];
  if (token !== API_TOKEN) return res.status(403).json({ ok: false, error: 'unauthorized' });
  const result = await refreshBestEffort();
  res.json({ ok: true, ...result });
});

// best-effort：尝试抓取 B站 热门，成功则仅做日志；权威策展数据由每日自动化任务(WorkBuddy)推送
async function refreshBestEffort() {
  const cur = readData();
  try {
    const r = await fetch('https://api.bilibili.com/x/web-interface/popular?ps=20&pn=1', {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.bilibili.com' }
    });
    if (r.ok) {
      const j = await r.json();
      console.log('[refresh] B站热门抓取成功，条目数:', j && j.data && j.data.list ? j.data.list.length : 0);
    }
  } catch (e) {
    console.log('[refresh] B站抓取失败(可忽略):', e.message);
  }
  return {
    note: 'best-effort 抓取完成；完整策展数据由每日 09:00 自动化任务推送',
    updatedAt: cur.meta && cur.meta.updatedAt
  };
}

// ---------------- 每日 09:00 自动刷新 ----------------
function scheduleDaily() {
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 9 && now.getMinutes() === 0) {
      refreshBestEffort()
        .then(() => console.log('[cron] 每日 09:00 自动刷新已触发'))
        .catch(e => console.log('[cron] 自动刷新异常:', e.message));
    }
  }, 60 * 1000);
}
scheduleDaily();

app.listen(PORT, () => {
  console.log(`✅ 飞鱼丸工作台后端已启动: http://localhost:${PORT}`);
  console.log(`📁 共享数据文件: ${DATA_FILE}`);
});
