---
title: 给butterfly主题的hexo博客配置rss订阅
date: 2025-04-18 01:53:19
tags:
  - 博客配置
categories: 琐碎问题解决
comments: "true"
---
# 配置缘由
突然某学长晚上提到关于rss订阅，以前还没了解过这个东西，于是迅速的了解了一下，RSS 的全称是 Really Simple Syndication（简易信息聚合），它是一种消息来源的格式规范，网站可以按照这种格式规范提供文章的标题、摘要、全文等信息给订阅用户，用户可以通过订阅不同网站 RSS 链接的方式将不同的信息源进行聚合，在一个工具里阅读这些内容。

简单来说，RSS 就是一种订阅某个网站内容更新的协议。这种略显「古老」的协议在社交媒体和聚合阅读的冲击下日渐式微，大多数人都不知道这个东西的存在了，更者在算法推荐为各大厂商盈利的当下，rss的订阅显得有那么一些反算法。

但是rss的阅读精简模式可以让我们专注于想要阅读的内容，在信息裹挟的洪流下可以精准迅速的获得想要的内容，像是一种在pick的过程，捣鼓捣鼓还是很好玩的。
# 配置步骤
## step1 下载hexo支持的rss插件
hexo的rss插件，叫**hexo-generator-feed**，在hexo文件夹终端下载插件
```bash
npm install hexo-generator-feed --save
```
## step2 根目录配置
然后在根目录中的_config.yml中添加如下配置
```
feed:  
  enable: true  
  type: atom  
  path: atom.xml  
  limit: 0
```
**官网还说明了一些其他的参数，如：**

- enable: 默认开启可以省略
- type: RSS的类型(atom/rss2)
- path: 文件路径，默认是 atom.xml/rss2.xml
- limit: 展示文章的数量,使用 0 或则 false 代表展示全部
- hub: 如果使用不到可以为空
- content: （可选）设置 true 可以在 RSS 文件中包含文章全部内容，默认：false
- content_limit: （可选）摘要中使用的帖子内容的默认长度。 仅在内容设置为false且未显示自定义帖子描述时才使用。
- content_limit_delim :（可选）如果content_limit用于缩短帖子内容，则仅在达到字符限制之前在此分隔符的最后一次出现处剪切。默认不使用。
- icon: (可选）自定义图标。默认为主配置中指定的电子邮件头像。
- autodiscovery: 添加提要自动发现，默认开启
- template : 自定义模板路径。该文件用于生成 xml 文件
## step3 主题配置
然后去主题的_config.yml中添加配置
```yaml
rss: /atom.xml
```
这样你在用hexo g生成静态网页的时候会在public文件夹中（也就是你静态网页文件夹中）生成一个rss2.xml文件
## step4 添加主页rss按钮（可选）
如果你想让别人知道你的RSS链接，可以在主题中的social中添加如下配置（就是在那侧边栏个人资料下面添加一个图标并链接到你的RSS文件）
```yaml
fas fa-rss: /atom.xml || RSS || '#ee802f'
```
并且添加了rss的橘黄配色（）
# re
好晚了，迅速结束配置，过几天再来捣鼓rss阅读器，感觉很好玩的样子ahh