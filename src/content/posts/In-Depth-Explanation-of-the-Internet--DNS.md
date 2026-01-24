---
title: 详解互联网-DNS篇之根服务器
published: 2025-12-06
description: '根服务器，一个经常被提到的互联网关键设施，但是不凡想想，我们在使用互联网浏览任意网站时，我们都会向本地（实际上大多数本地DNS都会向公共DNS发出请求）或公共DNS服务器发出请求。这其中根服务器好像并没有为我们提供任何服务，那么根服务器是互联网的基石这种说法又从何而来呢？'
image: ''
tags: [互联网,根服务器]
category: '详解互联网'
draft: false 
lang: 'zh_CN'
series: "详解互联网-DNS篇"
---
引言：根服务器，一个经常被提到的互联网关键设施，但是不凡想想，我们在使用互联网浏览任意网站时，我们都会向本地（实际上大多数本地DNS都会向公共DNS发出请求）或公共DNS服务器发出请求。  
这其中根服务器好像并没有为我们提供任何服务，那么根服务器是互联网的基石这种说法又从何而来呢？
![](https://cdn1.f9e8ac3a.er.aliyun-esa.net/4-2025/202508261531763.webp)

## 什么是DNS
TCP/IP协议为互联网设备提供了通过IP地址相互连接的能力，但IP地址是一串数字，对用户而言难以记忆且不便使用。为解决这一问题，DNS（Domain Name System）应运而生。  
DNS的核心功能是将域名（Domain Name）与IP地址建立映射关系，用户只需输入域名，DNS系统即可自动解析为对应的IP地址，实现快速访问。  
这种“以名代址”的机制极大地降低了互联网使用的门槛，是互联网架构中不可或缺的一环。

## DNS的架构
由于互联网中的域名非常非常多，如果都存放在一台域名服务器中，那么不仅查询速度慢，服务器压力大，而且难以保证服务的可靠性。因此，DNS采用了分布式的设计方案，大量的域名服务器之间通过层级方式组织，分布在全世界范围内。  
就一般而言，域名服务器可以分为以下四类：
#### 根域名服务器：
最高层级的域名服务器，互联网上一共有13组根域名服务器（以英文字母A到M依序命名，格式为[a~m].root-servers.net）
#### 顶级域名服务器：
对于每个顶级域名，如.com、.org、.top等，都有对应的顶级域名服务器。
#### 权威域名服务器：
一个网站需要将其域名和IP地址注册到相应的权威域名服务器中。
#### 本地域名服务器：
本地域名服务器不属于上述域名服务器的层次结构，但是它对域名系统非常重要。每个 ISP（如一个大学、一个公司）都有一个本地域名服务器。

## DNS是如何运作的
当我们在使用互联网浏览任意网站时，我们都会向本地（实际上大多数本地DNS都会向公共DNS发出请求）或公共DNS服务器发出请求。它依靠大量缓存来显著提升用户查询DNS服务器的可靠性与可达性和降低查询的延迟。 

那么公共DNS的缓存是哪里来的呢？  
这里我们引入一个概念：递归解析和迭代解析。  
递归解析：客户端向DNS服务器发起请求，要求 必须返回最终答案（IP 或错误），DNS 服务器负责完成所有后续查询。  
上面的DNS查询路径称之为递归DNS，下面我们将会讲解一种不同的解析方式——迭代解析  
迭代解析：DNS 服务器收到请求后，若无缓存，会返回 “你该去问谁”（如上级服务器地址），由请求方继续查询。  
差异：递归解析是我们平时最经常用的DNS解析方式。而迭代解析则主要用于各大公共DNS服务器接受到没有缓存或缓存过期后的解析方式。  
这两种解析方式的不同导致了我们在平时中都是使用递归解析而非迭代解析。对于公共DNS服务器后面的个层级DNS服务器不熟悉，因此根域名服务器貌似在域名解析的过程中用处不大，其实用处大的很呢。  

## 实践出真知
下面我们以本博客域名：`blog.azuremio.com`为例进行一次迭代解析。  
#### 1.向根域名服务器查询负责`.top`的权威域名服务器。
```bash
nslookup -type=ns com. a.root-servers.net
DNS request timed out.
    timeout was 2 seconds.
服务器:  UnKnown
Address:  2001:503:ba3e::2:30

com     nameserver = l.gtld-servers.net
com     nameserver = j.gtld-servers.net
com     nameserver = h.gtld-servers.net
com     nameserver = d.gtld-servers.net
com     nameserver = b.gtld-servers.net
com     nameserver = f.gtld-servers.net
com     nameserver = k.gtld-servers.net
com     nameserver = m.gtld-servers.net
com     nameserver = i.gtld-servers.net
com     nameserver = g.gtld-servers.net
com     nameserver = a.gtld-servers.net
com     nameserver = c.gtld-servers.net
com     nameserver = e.gtld-servers.net
l.gtld-servers.net      internet address = 192.41.162.30
l.gtld-servers.net      AAAA IPv6 address = 2001:500:d937::30
j.gtld-servers.net      internet address = 192.48.79.30
j.gtld-servers.net      AAAA IPv6 address = 2001:502:7094::30
h.gtld-servers.net      internet address = 192.54.112.30
h.gtld-servers.net      AAAA IPv6 address = 2001:502:8cc::30
d.gtld-servers.net      internet address = 192.31.80.30
d.gtld-servers.net      AAAA IPv6 address = 2001:500:856e::30
b.gtld-servers.net      internet address = 192.33.14.30
b.gtld-servers.net      AAAA IPv6 address = 2001:503:231d::2:30
f.gtld-servers.net      internet address = 192.35.51.30
f.gtld-servers.net      AAAA IPv6 address = 2001:503:d414::30
k.gtld-servers.net      internet address = 192.52.178.30
k.gtld-servers.net      AAAA IPv6 address = 2001:503:d2d::30
m.gtld-servers.net      internet address = 192.55.83.30
m.gtld-servers.net      AAAA IPv6 address = 2001:501:b1f9::30
i.gtld-servers.net      internet address = 192.43.172.30
i.gtld-servers.net      AAAA IPv6 address = 2001:503:39c1::30
g.gtld-servers.net      internet address = 192.42.93.30
g.gtld-servers.net      AAAA IPv6 address = 2001:503:eea3::30
a.gtld-servers.net      internet address = 192.5.6.30
a.gtld-servers.net      AAAA IPv6 address = 2001:503:a83e::2:30
c.gtld-servers.net      internet address = 192.26.92.30
c.gtld-servers.net      AAAA IPv6 address = 2001:503:83eb::30
e.gtld-servers.net      internet address = 192.12.94.30
e.gtld-servers.net      AAAA IPv6 address = 2001:502:1ca1::30
```

#### 2.下面我们任选一个负责该顶级域名的权威域名服务器查询负责`azuremio.com`的权威域名服务器。
```bash
nslookup azuremio.com a.gtld-servers.net
(root)  nameserver = b.root-servers.net
(root)  nameserver = c.root-servers.net
(root)  nameserver = d.root-servers.net
(root)  nameserver = e.root-servers.net
(root)  nameserver = f.root-servers.net
(root)  nameserver = g.root-servers.net
(root)  nameserver = h.root-servers.net
(root)  nameserver = i.root-servers.net
(root)  nameserver = j.root-servers.net
(root)  nameserver = k.root-servers.net
(root)  nameserver = l.root-servers.net
(root)  nameserver = m.root-servers.net
(root)  nameserver = a.root-servers.net
服务器:  UnKnown
Address:  2001:503:a83e::2:30

名称:    azuremio.com
Served by:
- arch.ns.cloudflare.com
          108.162.193.68
          172.64.33.68
          173.245.59.68
          2606:4700:58::adf5:3b44
          2803:f800:50::6ca2:c144
          2a06:98c1:50::ac40:2144
          azuremio.com
- elisabeth.ns.cloudflare.com
          108.162.194.224
          162.159.38.224
          172.64.34.224
          2606:4700:50::a29f:26e0
          2803:f800:50::6ca2:c2e0
          2a06:98c1:50::ac40:22e0
          azuremio.com
```

#### 3.下面我们任选一个负责该域名的权威域名服务器查询`blog.azuremio.com`的权威域名服务器/解析记录。
```bash
nslookup blog.azuremio.com elisabeth.ns.cloudflare.com
服务器:  UnKnown
Address:  2606:4700:50::a29f:26e0

名称:    blog.azuremio.com
Served by:
- ns1.huaweicloud-dns.cn

          blog.azuremio.com
- ns1.huaweicloud-dns.com

          blog.azuremio.com
- ns1.huaweicloud-dns.net

          blog.azuremio.com
- ns1.huaweicloud-dns.org

          blog.azuremio.com
```

#### 4.下面我们任选一个负责该域名的权威域名服务器查询负责`blog.azuremio.com`的权威域名服务器/解析记录。
```bash
nslookup -type=cname blog.azuremio.com ns1.huaweicloud-dns.com
服务器:  UnKnown
Address:  2407:c080:20:ffff:ffff:fffe:0:1

blog.azuremio.com       canonical name = blog.azuremio.com.a1.inittt.com
```
<div style="background-color: #000; color: #000; padding: 8px; border-radius: 4px; display: inline-block; cursor: default;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#000'">其实这里的cname还要和前面的步骤一样再来一次，就是这样会导致篇幅太长了</div>

至此，你已成功手动完成了一次 DNS 迭代查询的全过程。虽然日常上网时我们依赖的是本地 DNS 提供的递归服务，但其背后正是通过这种逐级迭代的方式，从根服务器一路查到最终的 IP 地址。这也体现了 DNS 分布式、分层、高可用的设计精髓。

### Q&A
`Q`：根服务器域名的顶级域名是`.net`，那`.net`的权威域名服务器出现问题会不会导致互联网的根域名服务器崩溃，导致全球互联网崩溃。  
`A`：在所有主流 DNS 软件（如BIND、Windows DNS）和操作系统中，称为“根提示（Root Hints）”。即使`.net`域名无法解析，本地 DNS 仍能直接通过IP地址联系根服务器，因此不会形成循环依赖。  
`Q`：全球有13个根域名服务器，而中国没有根服务器会不会被其它国家恶意断网。  
`A`：不会，根域名服务器采用了anycast技术，某些营销号说是都在国外，实际上国内也是有节点，并且国内有根服务器镜像，不会被恶意断网。  

感兴趣的话可以到ICANN及相关网站查看详细内容  
[全球根服务器分布](https://root-servers.org/ "全球根服务器分布")   
[ICANN](https://www.iana.org/domains/root/servers "ICANN")