#!/bin/bash

# 回到 Hexo 项目根目录（如果脚本不在根目录）
cd "$(dirname "$0")"

# 确保 CNAME 文件存在
if [ ! -f source/CNAME ]; then
    echo "auberginewly.site" > source/CNAME
    echo "CNAME 文件已自动创建"
fi

# 构建并部署
echo "开始构建和部署..."
npx hexo g
npx hexo d

# 部署完成后，只清理 public（不要清理 db.json！）
echo "部署完成，清理 public 目录..."
rm -rf public

echo "部署完成！"
