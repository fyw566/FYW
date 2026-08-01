const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'public');

const data = {
  meta: {
    updatedAt: "2026-08-01T03:50:47.479Z",
    source: "daily-automation"
  },
  exhibitions: [
    {
      title: "梅花之韵——2026·中国画花鸟作品展",
      level: "国家级",
      deadline: "申报截止：2026年08月20日",
      location: "中国美协线上征稿系统",
      description: "中国美术家协会主办的花鸟画专题国家级展览。面向全国征稿，中国画作品要求章款齐全、严禁代笔抄袭。投稿需登录中国美协线上系统实名申报，每人限投1件。",
      note: "无省份限制，全国均可投稿，非常适合工笔花鸟方向。",
      link: "https://www.caanet.org.cn/newsdetail.mx?id=10214"
    },
    {
      title: "遵道而行——2026年中国画作品展",
      level: "国家级",
      deadline: "展览日期：2026年08月（湖南衡阳）",
      location: "南岳美术馆（湖南衡阳）",
      description: "中国美术家协会、湖南省文联、衡阳市南岳区人民政府共同主办。面向全国公开征集中国画作品，题材不限，装框后尺寸不超240×200cm。",
      note: "无省份限制，全国均可投稿。",
      link: "https://www.caanet.org.cn/newsdetail.mx?id=10166"
    },
    {
      title: "时代湾区 美术作品展览",
      level: "国家级",
      deadline: "展览日期：2026年08月（深圳）",
      location: "关山月美术馆（深圳）",
      description: "中国美术家协会、深圳市委宣传部、福田区人民政府共同主办。面向国内公开征集中国画、油画原创作品约120件。",
      note: "无省份限制，全国均可投稿。",
      link: "https://www.lumei.edu.cn/__local/B/C3/DB/61064941F28C2E399B0AF442AB8_5B5A879D_300A7.pdf"
    },
    {
      title: "万年浦江——2026·中国画作品展",
      level: "国家级",
      deadline: "征稿通知已发布（2026年06月30日）",
      location: "浦江（浙江）",
      description: "中国美术家协会主办的中国画作品展，面向全国征稿，以浦江为展地。",
      note: "无省份限制，全国均可投稿。",
      link: "https://www.caanet.org.cn/"
    },
    {
      title: "2026·百家金陵画展（中国画）",
      level: "国家级",
      deadline: "征稿通知已发布（2026年06月30日）",
      location: "南京（江苏）",
      description: "中国美术家协会、江苏省文联主办的中国画双年展品牌，面向全国征稿。",
      note: "无省份限制，全国均可投稿。",
      link: "https://www.caanet.org.cn/"
    }
  ],
  xianJobs: [
    {
      title: "西安美术学院2026年第二批公开招聘博士教师",
      status: "报名中",
      school: "西安美术学院（公办本科艺术院校）",
      subject: "美术与书法 / 美术学（需本硕博专业相近）",
      count: "若干（博士岗）",
      registerTime: "2026年07月24日 — 2026年08月07日",
      examContent: "面试+专业技能考核（艺术院校自主招聘，无统考职测综应）",
      examTime: "校内组织（2026年8月）",
      link: "https://new.xafa.edu.cn/info/1041/22701.htm"
    }
  ],
  shenyangJobs: [],
  douyinHot: [
    {
      songName: "红豆",
      originalArtist: "王菲",
      coverArtist: "白慕寒 / 落日微醺（女声 r&b 版）",
      status: "热歌",
      copyText: "《红豆》\n原唱：王菲\n翻唱：白慕寒 / 落日微醺（女声 r&b 版）\n\n相思阙里说相思，温柔试问知不知。\n#翻唱 #女生翻唱 #王菲 #经典老歌",
      tags: ["红豆", "王菲", "女生翻唱", "#翻唱", "#女生翻唱", "#经典老歌"],
      source: "抖音翻唱热榜"
    },
    {
      songName: "不仅仅是喜欢",
      originalArtist: "萧全 / 孙语赛",
      coverArtist: "虎二（老烟嗓翻唱）",
      status: "热歌",
      copyText: "《不仅仅是喜欢》\n原唱：萧全 / 孙语赛\n翻唱：虎二\n\n副歌最后一段改编，配上老烟嗓，感觉特别到位。\n#翻唱 #女生翻唱 #萧全 #孙语赛",
      tags: ["不仅仅是喜欢", "萧全", "孙语赛", "女生翻唱", "#翻唱", "#女生翻唱"],
      source: "抖音翻唱热榜"
    },
    {
      songName: "走马",
      originalArtist: "陈粒",
      coverArtist: "摩登兄弟（刘宇宁）",
      status: "热歌",
      copyText: "《走马》\n原唱：陈粒\n翻唱：摩登兄弟（刘宇宁）\n\n经略带摇滚节奏的重新混音，演绎出别具一格的味道。\n#翻唱 #女生翻唱 #陈粒 #走马",
      tags: ["走马", "陈粒", "女生翻唱", "#翻唱", "#女生翻唱"],
      source: "抖音翻唱热榜"
    },
    {
      songName: "让我做你的眼睛",
      originalArtist: "子芮",
      coverArtist: "莉哥",
      status: "热歌",
      copyText: "《让我做你的眼睛》\n原唱：子芮\n翻唱：莉哥\n\n歌词唯美、曲风轻快、节奏洗脑，上半年抖音超人气金曲。\n#翻唱 #女生翻唱 #子芮 #莉哥",
      tags: ["让我做你的眼睛", "子芮", "莉哥", "女生翻唱", "#翻唱", "#女生翻唱"],
      source: "抖音翻唱热榜"
    },
    {
      songName: "That Girl",
      originalArtist: "Ally Murs",
      coverArtist: "抖音中学生翻唱",
      status: "热歌",
      copyText: "《That Girl》\n原唱：Ally Murs\n翻唱：抖音中学生（教室讲台清唱走红）\n\n这名中学生在讲台唱了这首歌，被同学录下发到抖音后火了。\n#翻唱 #女生翻唱 #AllyMurs #ThatGirl",
      tags: ["That Girl", "Ally Murs", "女生翻唱", "#翻唱", "#女生翻唱"],
      source: "抖音翻唱热榜"
    }
  ]
};

fs.writeFileSync(p + '/data.json', JSON.stringify(data, null, 2));
fs.writeFileSync(p + '/data.js', 'window.SHARED_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('data.json / data.js 已生成，条目：展览', data.exhibitions.length, '西安', data.xianJobs.length, '沈阳', data.shenyangJobs.length, '抖音', data.douyinHot.length);
