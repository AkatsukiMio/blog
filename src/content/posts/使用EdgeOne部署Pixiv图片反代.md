---
title: 使用EdgeOne部署Pixiv图片反代
published: 2025-08-22
description: '使用EdgeOne边缘函数部署Pixiv图片反代'
image: ''
tags: [EdgeOne,Pixiv,代理]
category: '教程'
draft: false 
lang: 'zh_CN'
---
众所周知，Pixiv的服务在中国大陆内一直被墙，而且Pixiv的图片服务器均有防盗链的保护，只要Referer不是来自 Pixiv的请求无一例外都会返回403状态码 \
***How can we do?***
## 开始前的准备：
- **一个能思考的脑子**: 遇到问题先思考,想不通就去问度娘，度娘找不到就去和AI调情一下再来
- **一个EdgeOne账号**: 用于创建一个加速服务并且绑定域名支持访问
- **一个属于你的域名**: 用于Pixiv反代的最终访问域名

**相关信息：**
> Pixiv服务器域名：`i.pximg.net` \
> Pixiv的Referer：`www.pixiv.net`

## 开始
打开链接进入EdgeOne登录界面，打开对应站点管理页面
> https://edgeone.ai/

<img src="https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145753.png" width="350px" height="350px">
如上图添加加速域名配置，按照指引添加记录，然后申请SSL证书并部署SSL证书,在等待期间让我们来部署边缘函数吧ヾ(≧▽≦*)o 到站点管理页面的侧边栏向下拉看到“边缘函数”点击函数管理

![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145749.png)
![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145752.png)

新建一个函数，随便选一个模板，如图所示复制下面的代码保存并应用ヾ(^▽^*)))
```java
addEventListener("fetch", event => {
  let url = new URL(event.request.url);
  url.hostname = "填写你的域名";

  let request = new Request(url, event.request);
  event.respondWith(
    fetch(request, {
      headers: {
        'Referer': 'https://www.pixiv.net/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      }
    })
  );
});
```
![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145748.png)
**然后你就会看到：**
![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145754.png)
点击“新增触发规则”如下图所示进行添加规则( 不要来个小笨蛋照抄下去了哦( ´･･)ﾉ(._.`) )
![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145755.png)

## 测试
配置完成后，就可以直接通过URL直接访问p站图片了。
Pixiv 网站上的原始链接(直接打开或在其他网站使用会返回 403)： \
https://i.pximg.net/img-master/img/2021/06/10/18/09/04/90457556_p0_master1200.jpg \
原始图片链接(无法正常显示)
<img src="https://i.pximg.net/img-master/img/2021/06/10/18/09/04/90457556_p0_master1200.jpg" width="350px" height="200px">
反向代理(能正常访问)(来源https://blog.yuki.sh )： \
https://i.yuki.sh/img-master/img/2021/06/10/18/09/04/90457556_p0_master1200.jpg
<img src="https://i.yuki.sh/img-master/img/2021/06/10/18/09/04/90457556_p0_master1200.jpg" width="350px" height="350px">

## 番外
其实还可以添加一些配置哦（＾∀＾●）ﾉｼ 找到“站点加速”找到“节点缓存TTL”点击差异化设置，然后有时间可以有多长拉多长，可以降低热门图片请求时间的等待哦(╹ڡ╹ )
![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145746.png)
![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145750.png)
![](https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221145751.png)

## 今日说法(bushi
你要拿来涩涩？(っ °Д °;)っ
<img src="https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508221327616.png" width="350px" height="400px">
我问大家：张三在网络上用某境外平台的网络服务商提供色图，居然还发给ta的好兄弟一起鉴赏，请问张三的行为触犯了什么法律？ \
啊~ 这时候有些小伙伴就要说了，张三ta有没有盈利，ta只是助人为乐帮帮ta的好兄弟嘛。各位小伙伴啊，总有一条法律适合你： \
根据《中华人民共和国刑法》第三百六十四条，传播淫秽的书刊、影片、音像、图片或者其他淫秽物品，如果情节严重，即构成传播淫秽物品罪。此罪的关键在于“传播”行为，即广泛散布淫秽物品，且不以牟利为目的。 \
什么盈利不盈利的，自己看看得了，技术虽无罪，但还是提醒一下，发送的图片请务必遵守你所在国家及其地区的法律法规，别警察叔叔被请喝茶了。