// 获取进度条元素
const progress = document.getElementById('progress');

// 获取“上一步”按钮元素
const prev = document.getElementById('prev');

// 获取“下一步”按钮元素
const next = document.getElementById('next');

// 获取所有步骤圆圈（节点）
const circles = document.querySelectorAll('.circle');

// 当前处于第几个步骤，初始为第 1 步
let currentActive = 1;

// 监听“下一步”按钮点击事件
next.addEventListener('click', () => {
    currentActive++; // 当前步骤 +1
    if (currentActive > circles.length) {
        // 如果超过总步骤数量，限制在最大值
        currentActive = circles.length;
    }
    update(); // 调用更新函数，刷新界面
});

// 监听“上一步”按钮点击事件
prev.addEventListener('click', () => {
    currentActive--; // 当前步骤 -1
    if (currentActive < 1) {
        // 如果小于 1，限制为最小值
        currentActive = 1;
    }
    update(); // 调用更新函数，刷新界面
});

// 更新进度条和圆圈状态的函数
function update() {
    // 遍历每个圆圈，控制是否添加 .active 类
    circles.forEach((circle, index) => {
        if (index < currentActive) {
            circle.classList.add('active'); // 当前及之前的步骤添加激活样式
        } else {
            circle.classList.remove('active'); // 后面的步骤去掉激活样式
        }
    });

    // 获取当前所有处于激活状态的圆圈（有 .active 类）
    const actives = document.querySelectorAll('.active');

    // 根据当前激活圆圈数量，动态设置进度条宽度
    // 比如共 4 个圆圈，当前是第 2 个： (2-1)/(4-1) = 1/3 = 33.3%
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

    // 控制按钮的禁用状态
    if (currentActive === 1) {
        prev.disabled = true; // 当前是第一步时，禁用“上一步”按钮
    } else if (currentActive === circles.length) {
        next.disabled = true; // 当前是最后一步时，禁用“下一步”按钮
    } else {
        // 中间步骤时，两个按钮都可用
        prev.disabled = false;
        next.disabled = false;
    }
}
