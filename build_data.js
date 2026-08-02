const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'public');

// 清洗字符串：移除 Unicode 行分隔符 U+2028/U+2029（JSON 合法但 JS 字符串非法，
// 会导致 data.js 作为 <script> 加载时整段报语法错误）、控制字符、回车换行，并折叠多余空格。
function sanitize(o) {
  if (o && typeof o === 'object') {
    if (Array.isArray(o)) return o.map(sanitize);
    const out = {};
    for (const k of Object.keys(o)) out[k] = sanitize(o[k]);
    return out;
  }
  if (typeof o === 'string') {
    let s = o
      .replace(/\u2028/g, '')
      .replace(/\u2029/g, '')
      .replace(/\r/g, '')
      .replace(/\n/g, ' ')
      .replace(/\t/g, '')
      .replace(/[\u0000-\u001f]/g, ' ');
    return s.replace(/ {2,}/g, ' ').trim();
  }
  return o;
}

const raw = fs.readFileSync(path.join(p, 'data.json'), 'utf8');
const data = sanitize(JSON.parse(raw));
fs.writeFileSync(path.join(p, 'data.js'), 'window.SHARED_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('data.js 已从 data.json 重新生成（已清洗非法字符），条目：展览', data.exhibitions.length, '西安', data.xianJobs.length, '沈阳', data.shenyangJobs.length, '抖音', data.douyinHot.length);
