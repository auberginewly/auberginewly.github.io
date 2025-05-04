---
title: 关于解决每次hexo部署后CNAME被清除导致域名与仓库解绑和简化hexo的部署命令
date: 2025-04-16 12:26:43
tags:
  - 博客配置
categories: 琐碎问题解决
comments: "true"
---
# 问题起源
在我昨天给博客绑定一个自己的域名之后，我发现每次写完文章进行部署上传的时候，执行以下命令之后:
```bash
hexo d
hexo g
```
用`auberginewly.site`访问不了我的博客，然后就去设置里githubpages查看，发现我绑定的domain被清空了，这就导致每次部署上传之后我都要手动与自己的域名绑定，相当的麻烦，于是我想着怎么解决下这个问题，顺便实现了下怎么样去简化部署的命令，下面是步骤。
# 为什么绑定的domain会被清空？
大概率是 Hexo 每次部署（`hexo g && hexo d`）的时候，把 GitHub Pages 仓库里的 `CNAME`文件覆盖或删除了，导致绑定的自定义域名（如 `auberginewly.site`）失效。
## 背景小科普
GitHub Pages 绑定自定义域名时，会在你的仓库根目录生成一个名为 `CNAME` 的文件，里面只写着你的域名（如 `auberginewly.site`）。**如果这个文件被删除或不在部署后的文件夹中，域名就会失效。**
## 解决方法
进入你的 Hexo 项目目录
```bash
cd your-hexo-folder
```
创建一个 `source/CNAME` 文件，内容是`auberginewly.site`(替换成你自己的域名)
```bash
echo 'auberginewly.site' > source/CNAME
```
确保 `.gitignore` 没有忽略 `CNAME` 文件。
然后执行：
```bash
hexo clean
hexo g
hexo d
```
这样 Hexo 每次生成静态文件时都会把 `CNAME` 文件一并部署上去，GitHub Pages 的绑定就不会断了，也不用费劲心思的每次手动部署了。
# 自动化脚本简化hexo部署
如果你想让 Hexo 部署流程更加自动化，避免每次都手动确认和添加 `CNAME` 文件，可以通过编写一个简单的自动化脚本来实现。下面是步骤：
## 创建部署脚本
在 Hexo 项目根目录创建一个 `deploy.sh` 脚本文件：
```bash
touch deploy.sh
```
我的系统是macos，如果是windows的话应该是`deploy.bat`脚本文件，取决于不同的操作系统，我的脚本如下：
```shell
#!/bin/bash

# 切换到 Hexo 项目根目录
cd "$(dirname "$0")"

# 确保 CNAME 文件存在
if [ ! -f source/CNAME ]; then
    echo "auberginewly.site" > source/CNAME
    echo "CNAME 文件已自动创建"
fi

# 执行 Hexo 构建和部署
echo "开始构建和部署..."
npx hexo g
npx hexo d

# 部署完成后，只清理 public 文件夹，保留 db.json
echo "部署完成，开始删除 public 目录..."
rm -rf public

echo "部署和清理完成！"
```
因为不会nano编辑器，我直接选择在文本里编辑，可以使用vim或者nano编辑器进行命令行的编辑：
```bash
# 可以进行选择的使用
nano deploy.sh # nano
vi deploy.sh # vim
```
## 赋予脚本执行权限(linux或者macos适用)
如果你在 Linux 或 macOS 上，可以通过以下命令赋予脚本执行权限：
```bash
chmod +x deploy.sh
```
然后你就可以运行 `./deploy.sh` 来完成部署。
## 简化部署过程
每次你运行 `./deploy.sh`，它会先检查 `CNAME` 文件是否存在，如果不存在会自动创建，然后再进行构建和部署。这样你就不用每次都担心 `CNAME` 文件的问题，整个流程更为流畅。
## 进一步简化——使用 `alias` 命令简化
可以在你的 macOS 上创建一个 **命令别名**，使得每次部署只需要一个简单的命令。
### 打开你的终端配置文件（例如 `.bash_profile` 或 `.zshrc`，具体取决于你使用的 shell）
我这里的是`.zshrc`，使用命令打开文件（我这里是使用`zsh`）：
```bash
nano ~/.zshrc
```
有小朋友要问了，`zsh`是什么？？
#### 关于`zsh`
Zsh（Z Shell）是一种功能强大的Unix shell，它是Bash（Bourne Again Shell）的一种替代品，并且在许多方面有所增强。Zsh 提供了丰富的功能，包括：

1. **自动补全**：Zsh 能够智能地完成命令、文件路径、命令参数等的自动补全，比 Bash 更加灵活。
   
2. **插件和主题支持**：Zsh 允许用户安装插件和主题，常见的插件管理器是 `oh-my-zsh`，它大大增强了 Zsh 的可用性和外观。

3. **高级路径展开**：Zsh 具有强大的文件路径和通配符扩展功能。

4. **历史管理**：Zsh 能够更加智能地管理命令历史，并支持在历史中查找和搜索。

5. **自定义功能**：Zsh 支持高度的自定义，包括快捷键、变量、命令别名等。

6. **更多的内建命令和选项**：Zsh 提供了许多内建命令，能够更方便地进行文件操作、字符串处理等。

由于其易用性和强大功能，Zsh 成为很多开发者和系统管理员的首选shell之一。
### 修改或添加 `hexo` 别名
修改或添加以下行来让 `hexo` 成为你的部署命令：
```bash
alias hexo="cd ~/your-hexo-folder && ./deploy.sh"
```
记得将 `~/your-hexo-folder` 替换成你实际的 Hexo 项目路径喔。
### 保存并加载配置
保存后，通过以下命令让修改生效：
```bash
source ~/.zshrc
```
### 于是你得到了
如果设置了 `alias hexo`，你只需在任何地方输入：
```bash
hexo
```
它就会自动的进入到hexo的根目录当中并进行部署上传（记得把魔法关了）。

### 一个小问题
但是我这样简化部署上传流程之后，发现我想创建新markdown博客的时候，这个命令:
```bash
hexo new "your-post-name"
```
它失效了，不会帮我在_post目录下创建新的文档而是运行deploy的脚本，我找了半天也没想到怎么解决，要么就把之前简化的步骤全删了，然后我就了解到了这个：
#### 执行`npx`命令
使用 `npx` 来确保使用的是当前项目中安装的 Hexo，而不是全局安装的 Hexo。这样能够避免由于路径问题造成的执行错误。
#### 关于`npx`
在使用 Hexo 时，`npx` 和全局安装的 `hexo` 命令之间有一些区别，下面详细解释它们的工作原理和为什么使用 `npx` 可以帮助避免一些潜在问题。
##### 1. `npx` 命令：
- **`npx` 是一个来自 `npm` 的命令行工具**，它通常用于执行在 `node_modules` 目录中的本地依赖包，或者在没有全局安装的情况下直接执行某个命令。
- 当你运行 `npx hexo` 时，它会优先执行 **项目本地安装** 的 Hexo 版本（即项目中的 `node_modules/hexo`），如果没有安装本地 Hexo，它会尝试下载并执行它。
- `npx` 会确保你使用的是项目特定版本的 Hexo，而不是全局安装的 Hexo。这样，你的项目始终使用与项目配置兼容的 Hexo 版本，避免因为版本不匹配而导致问题。
##### 2. 全局安装的 `hexo` 命令：
- 如果你使用全局安装的 Hexo，执行 `hexo` 命令时，它会使用全局安装的 Hexo 版本（即通过 `npm install -g hexo-cli` 安装的版本）。
- 全局安装的 Hexo 可能与项目中的 Hexo 版本不同，尤其是当你在不同的项目中使用 Hexo 时，全局安装的 Hexo 可能不是项目所需的特定版本。
- 这样可能会导致一些版本兼容性问题，尤其是在使用特定插件或者不同 Hexo 版本时。
##### 区别总结：
- **使用 `npx hexo`**：确保使用的是当前项目中的 Hexo 版本（从 `node_modules` 目录中读取）。这样可以避免因为全局安装的 Hexo 版本不同而导致的潜在问题。
- **使用全局安装的 `hexo` 命令**：使用的是全局安装的 Hexo 版本，这可能与项目中的版本不同，导致不一致或者不兼容的情况。
##### 为什么使用 `npx hexo` 更好？
1. **版本一致性**：`npx hexo` 确保每次执行命令时都使用与项目相同版本的 Hexo，避免全局安装的 Hexo 版本不同步的问题。
2. **避免路径问题**：有时全局安装的 Hexo 路径可能不对，尤其是在你使用多个项目时。`npx` 会确保命令从项目根目录中的 `node_modules` 目录执行，避免了路径配置错误的风险。
3. **无需全局安装 Hexo**：如果你的项目中有本地安装 Hexo，就不需要全局安装它，避免了全局和局部依赖的冲突。
##### 实际操作：
如果你有一个 Hexo 项目，并且在项目目录中执行 `npx hexo new "test-post"`，它会使用项目中的 Hexo 版本创建一个新文章。如果你使用全局安装的 `hexo new`，它可能会使用不同版本的 Hexo，这可能导致意外的行为，特别是当你升级或更改项目 Hexo 配置时。因此，推荐使用 `npx`，确保每次都使用与项目相匹配的 Hexo 版本。
#### 所以解决方式如下
就是每次在`hexo new "page"`前加上一个`npx`，使用项目中的 Hexo 版本创建一个新文章，避免与脚本的冲突产生。
### 关于删除脚本
我之前发现了上面的那个问题之后，直接把`deploy.sh`丢到废纸篓里，结果发现`hexo`、`hexo d`、`hexo g`、`hexo new "pages"`这些命令全部失效了，并且报错：
```bash
zsh: no such file or directory: ./deploy.sh
```
当前所在目录里找不到名为 `deploy.sh` 的文件，但执行了一个指向它的命令。说明 **可能还残留了一些配置** 指向这个脚本，我们一步步来解决它。
#### 检查 `.zshrc` 是否还存在 `alias` 指向 `deploy.sh`
在终端输入：
```bash
nano ~/.zshrc
```
然后看看里面有没有这类语句：
```bash
alias deploy="./deploy.sh"
alias hexo="./deploy.sh"
alias hexo="cd ~/xxx && ./deploy.sh"
```
如果有，就**删掉或者注释掉（在前面加 `#`）**。
然后按 `Ctrl + O` 保存，`Enter` 确认，`Ctrl + X` 退出。
最后，重新加载配置：
```bash
source ~/.zshrc
```
#### 删除 `deploy.sh` 别名缓存（如果之前跑过 alias）
在终端里执行下面这个命令，彻底清除当前会话里的 `hexo` 和 `deploy` 别名（如果有）：
```bash
unalias hexo
unalias deploy
```
如果不确定当前有没有残留 alias 设置，可以运行这个命令查一下：
```bash
alias | grep deploy
alias | grep hexo
```
如果还看到指向 `./deploy.sh` 的 alias，那说明 alias 没清干净，需要删 `.zshrc` 里那一行。
可以执行这个命令之后试一下：
```bash
hexo d
```
或者用 npm 的方式：
```bash
npm run deploy
```
# FINISH
至此，每次hexo部署后CNAME被清除导致域名与仓库解绑和简化hexo的部署命令的问题就解决了，所遗留的暂时性解决方案就是`npx hexo new "page"`，但是在此之后就不用手动添加域名了，记录一下解决问题的过程，希望对遇到相同问题的人有帮助。
- re:累了喵，吃饭去了。