#!/bin/bash

# 如果没有提供 commit 信息，显示使用帮助
if [ -z "$1" ]; then
  echo "请输入提交信息！"
  echo "用法：$0 <commit-message>"
  exit 1
fi

# 获取提交信息
commit_message=$1

# 执行 Git 操作：添加更改、提交、推送到 source 分支
git add .
git commit -m "$commit_message" && git push origin source

# 确认信息
echo "已成功将更改推送到 'source' 分支，提交信息：'$commit_message'"

