// 获取所有有类名panel列的合集
const panels = document.querySelectorAll('.panel');// 获取所有panel元素类名而不是id名
// panels是一个NodeList对象，包含了所有具有类名panel的元素

// 遍历每个panel
panels.forEach(panel => {
    // 为每个panel添加点击监听事件
    panel.addEventListener('click', () => {
        // 移除所有panel的active类
        removeActiveClasses();
        // 为当前点击的panel添加active类
        panel.classList.add('active');
    });
});

// 定义一个函数来移除所有panel的active类
function removeActiveClasses() {
    // 遍历每个panel
    panels.forEach(panel => {
        // 移除active类
        panel.classList.remove('active');
    });
}
