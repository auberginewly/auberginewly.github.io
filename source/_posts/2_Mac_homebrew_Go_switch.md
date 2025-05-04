---
title: Mac利用homebrew进行多版本Go切换
date: 2025-04-13 02:45:46
tags:
  - CS
  - GO
categories: 琐碎问题解决
comments: "true"
---

# 管理go版本

```bash
go version # 查看当前go版本
```

```bash
brew install go@x.xx # 安装指定版本go
```

```bash
brew unlink go # 解除已有的链接
```

```bash
brew link --force go@x.xx # 建立到x.xx版本的新链接
```

这样就可以用brew来切换go版本了

解决了喵
