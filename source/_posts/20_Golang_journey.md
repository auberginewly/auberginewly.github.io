---
title: Golang——从入门到入土
date: 2025-04-25 11:31:12
tags:
  - GO
  - CS
categories: 学习笔记
---

# 开发环境

Go 官网下载地址：https://golang.org/dl/

Go 官方镜像站（推荐）：https://golang.google.cn/dl/

## IDE

vscode 或者 goland

个人是新手觉得 goland 比较省事

# 语法
## 第一个 go 程序
关于导入与使用
```go
// hello.go
package main // 程序的包名

import "fmt"
import "time"

// import语句用于引入其他包，fmt是格式化输出的包
// 也可以引入其他包，如math、strings等
// 也可以引入自定义的包，如"myapp/mypackage"
// 也可以引入多个包，如
// import (
// 	"fmt"
// 	"math"
// 	"strings"
// )

func main() { // 函数的{ 和函数名在同一行，否则编译错误
	// main函数是程序的入口，分号可加可不加，建议是不加
	fmt.Println("hello world")

	time.Sleep(1 * time.Second) // 暂停1秒
}
```
## var 变量
变量的声明
`:=`简短声明变量，类型自动推导对应的数据类型
`:=`只能在函数内部使用，不能在函数外部使用  
其他的可以看看注释部分
```go
// 1_test1_var.go
package main  
  
import "fmt"  
  
// 全局变量声明只能用 var 关键字  
var ga int = 100 // 全局变量声明，默认值是0  
var gb = 200  
  
// 全局变量声明，类型自动推导对应的数据类型  
// gc := 300  
// := 只能在函数内部使用，不能在函数外部使用  
  
// 四种变量声明方式  
  
func main() {  
    // 1. 声明变量 默认的值是0  
    var a int  
    fmt.Println("a =  ", a)           // Println 打印变量的值  
    fmt.Printf("type of a = %T\n", a) // %T 打印变量的类型 // Printf 格式化输出  
  
    // 2. 声明变量并赋值  
    var b int = 100  
    fmt.Println("b = ", b)  
    fmt.Printf("type of b = %T\n", b) // %T 打印变量的类型  
  
    // 3. 声明变量并赋值，类型自动推导对应的数据类型  
    var c = 200  
    fmt.Println("c = ", c)  
    fmt.Printf("type of c = %T\n", c) // %T 打印变量的类型  
  
    var cc = "abcd"  
    fmt.Printf("cc = %s, type of cc = %T\n", cc, cc) // %s 打印字符串类型的变量  
  
    // 4. 简短声明变量，类型自动推导对应的数据类型  
    d := 300 // := 是简短声明变量的方式，既初始化也赋值  
    fmt.Println("d = ", d)  
    fmt.Printf("type of d = %T\n", d) // %T 打印变量的类型  
  
    f := "abc"  
    fmt.Printf("f = %s, type of f = %T\n", f, f) // %s 打印字符串类型的变量  
  
    g := 3.14  
    fmt.Printf("g = %f, type of g = %T\n", g, g) // %f 打印浮点数类型的变量  
  
    // 打印全局变量  
    fmt.Println("ga = ", ga)  
    fmt.Printf("type of ga = %T\n", ga) // %T 打印变量的类型  
    fmt.Println("gb = ", gb)  
    fmt.Printf("type of gb = %T\n", gb) // %T 打印变量的类型  
    //fmt.Println("gc = ", gc)  
    //fmt.Printf("type of gc = %T\n", gc) // %T 打印变量的类型  
  
    // 5. 多个变量声明  
    var x, y, z int = 1, 2, 3  
    fmt.Println("x = ", x)  
    fmt.Println("y = ", y)  
    fmt.Println("z = ", z)  
  
    var xx, yy = 100, "abcde"  
    fmt.Println("xx = ", xx, "yy = ", yy)  
  
    // 6. 多行变量声明  
    var (  
       vv int  = 100  
       jj bool = true  
    )  
    fmt.Println("vv = ", vv, "jj = ", jj)  
}
```
## 常量 const 与枚举递增 iota
常量（const）声明，只读属性 
const 来定义枚举类型
可以在 const() 添加关键字 iota，每行的 iota 都会累积 1，第一行 iota 的值是 0
枚举的值都符合 iota 的规则 
```go
// 1_test2_const.go
package main  
  
import "fmt"  
  
// const 来定义枚举类型  
//const (  
//  // 可以在 const() 添加关键字 iota，每行的 iota 都会累积 1，第一行 iota 的值是 0//  // 第二行 iota 的值是 1，第三行 iota 的值是 2//  // 以此类推  
//  // iota 只能在 const() 中使用，不能在其他地方使用  
//  BEIJING   = iota // iota = 0  
//  SHANGHAI         // iota = 1  
//  GUANGZHOU        // iota = 2  
//)  
  
const (  
    // 可以在 const() 添加关键字 iota，每行的 iota 都会累积 1，第一行 iota 的值是 0    // 第二行 iota 的值是 1，第三行 iota 的值是 2    // 以此类推  
    // iota 只能在 const() 中使用，不能在其他地方使用，只有在 const 里有累加效果  
    BEIJING   = 10 * iota // iota = 0  
    SHANGHAI              // iota = 1  
    GUANGZHOU             // iota = 2  
)  
  
const (  
    a, b = iota + 1, iota + 2  
    c, d  
    e, f  
  
    g, h = iota * 2, iota * 3  
    i, j  
    // 下面的值都符合 iota 的规则  
)  
  
func main() {  
    // 常量（const）声明，只读属性  
    const length int = 10  
  
    fmt.Println("length = ", length)  
  
    // length = 100 // 常量不能被修改  
  
    fmt.Println("BEIJING = ", BEIJING)  
    fmt.Println("SHANGHAI = ", SHANGHAI)  
    fmt.Println("GUANGZHOU = ", GUANGZHOU)  
  
    fmt.Println("a = ", a, "b = ", b)  
    fmt.Println("c = ", c, "d = ", d)  
    fmt.Println("e = ", e, "f = ", f)  
    fmt.Println("g = ", g, "h = ", h)  
    fmt.Println("i = ", i, "j = ", j)  
    // iota 的值是 0  
}
```
## 函数 function
注意返回值类型在后边，没有的话会报错
返回可以返回单个值，多个值，有形参的，也可以匿名的
```go
// 1_test3_function.go
package main  
  
import "fmt"  
  
// 返回单个值  
func foo1(a string, b int) int { // 注意 int 返回值在后边，没有的话会报错  
    fmt.Println("a = ", a)  
    fmt.Println("b = ", b)  
  
    c := 100  
  
    return c  
}  
  
// 返回多个值，匿名的  
func foo2(a string, b int) (int, int) { // 注意 int 返回值在后边，没有的话会报错  
    fmt.Println("a = ", a)  
    fmt.Println("b = ", b)  
  
    return 666, 777  
}  
  
// 返回多个值，有形参名称的  
func foo3(a string, b int) (c int, d int) { // 注意 int 返回值在后边，没有的话会报错  
    fmt.Println("---- foo3 ----")  
    fmt.Println("a = ", a)  
    fmt.Println("b = ", b)  
  
    // c,d 属于 foo3 的形参，返回形参变量默认初始化的值为 0    // c,d 的作用域空间是 foo3 整个函数体的{}空间  
    fmt.Println("c = ", c)  
    fmt.Println("d = ", d)  
    // 给有名称的返回值变量赋值  
    c = 100  
    d = 200  
  
    return  
}  
  
// 返回 int 共用，此写法类似 3func foo4(a string, b int) (c, d int) { // 注意 int 返回值在后边，没有的话会报错  
    fmt.Println("---- foo4 ----")  
    fmt.Println("a = ", a)  
    fmt.Println("b = ", b)  
  
    // 给有名称的返回值变量赋值  
    c = 100  
    d = 200  
  
    return  
}  
func main() {  
    c := foo1("abc", 100)  
  
    fmt.Println("c = ", c)  
  
    ret1, ret2 := foo2("111", 222)  
    fmt.Println("ret1 = ", ret1, " ret2 = ", ret2)  
  
    ret1, ret2 = foo3("abc", 100)  
    fmt.Println("ret1 = ", ret1, " ret2 = ", ret2)  
  
    ret1, ret2 = foo4("abd", 300)  
    fmt.Println("ret1 = ", ret1, " ret2 = ", ret2)  
}
```
## import 导包路径问题

```go
// lib1/lib1.go
package lib1  
  
import "fmt"  
  
// 当前lib1包提供的api  
func Lib1Test() {  
    fmt.Println("lib1Test()...")  
}  
  
func init() {  
    fmt.Println("lib1.init()...")  
}
```

```go
// lib2/lib2.go
package lib2  
  
import "fmt"  
  
// 当前lib2包提供的api  
func Lib2Test() {  
    fmt.Println("lib2Test()...")  
}  
  
func init() {  
    fmt.Println("lib2.init()...")  
}
```

```go
// 1_main.go
package main  
  
import (  
    "go_learning/5_init/lib1"  
    "go_learning/5_init/lib2")  
  
func main() {  
    lib1.Lib1Test()  
    lib2.Lib2Test()  
}
```
### 注意一定要有 go.mod 的存在，不然 go 会去 gopath 里找包然后报错
这里是gpt的解答：
在 Go 中，如果没有 `go.mod` 文件，Go 会根据 **`GOPATH` 模式** 来查找包，而不是使用 **Go Modules**（模块化依赖管理）。这是 Go 1.11 之前的行为，而现代 Go 项目通常推荐使用 Go Modules。

---

### **为什么没有 `go.mod` 会去其他路径找包？**
1. **历史行为（GOPATH 模式）**：
   - 在 Go Modules 引入之前（Go 1.11 之前），Go 依赖 `GOPATH` 环境变量来管理包。
   - 所有第三方包和本地项目都必须放在 `$GOPATH/src` 下，编译器会从 `GOPATH` 中查找包。

2. **查找顺序**：
   - 如果没有 `go.mod`，Go 会按以下顺序查找包：
     1. **标准库**（如 `fmt`、`net/http` 等，位于 `GOROOT/src`）。
     2. **`GOPATH/src` 目录**：尝试在 `$GOPATH/src/go_learning/5_init/lib1` 中查找包。
     3. **当前目录**（但通常不适用，除非是相对路径导入）。

3. **你的错误信息分析**：
   ```plaintext
   1_main.go:4:2: package go_learning/5_init/lib1 is not in std (/opt/homebrew/opt/go/libexec/src/go_learning/5_init/lib1)
   ```
   - 编译器在标准库（`std`）和 `GOPATH` 中都没找到 `go_learning/5_init/lib1`，因此报错。

---

### **解决方法**
#### 1. **启用 Go Modules（推荐）**
在项目根目录（如 `go_learning/`）下运行：
```bash
go mod init go_learning
```
这会生成 `go.mod` 文件，之后 Go 会基于模块路径解析本地包，不再依赖 `GOPATH`。

#### 2. **检查包路径**
确保导入路径与模块名一致。例如：
- 如果 `go.mod` 声明 `module go_learning`，则导入应为：
  ```go
  import "go_learning/5_init/lib1"
  ```

#### 3. **避免依赖 `GOPATH`**
- 现代 Go 项目应始终使用 `go.mod`，避免将代码放在 `$GOPATH/src` 下。

---

### **关键区别：GOPATH vs Go Modules**
| 特性                | GOPATH 模式                     | Go Modules 模式               |
|---------------------|--------------------------------|-------------------------------|
| 依赖管理            | 代码必须放在 `$GOPATH/src`      | 任意目录，通过 `go.mod` 管理  |
| 导入路径            | 从 `GOPATH/src` 开始查找        | 基于模块名（`module xxx`）     |
| 版本控制            | 手动管理                       | 通过 `go.mod` 和 `go.sum`     |
| 本地包引用          | 必须符合 `GOPATH` 结构          | 支持相对路径或模块路径        |

---

### **总结**
- **没有 `go.mod`**：Go 回退到 `GOPATH` 模式，导致编译器去 `GOPATH/src` 或标准库中查找包。
- **正确做法**：始终使用 `go mod init` 初始化项目，确保依赖和本地包能被正确解析。

如果仍有问题，请检查项目结构和 `go.mod` 内容，或提供更多上下文进一步分析。

### 同时调用的方法和参数也要是大写的首字母，不然不能通过 import 调用
- **大写**：允许跨包访问（类似 `public`）。
- **小写**：仅限当前包内使用（类似 `private`）。