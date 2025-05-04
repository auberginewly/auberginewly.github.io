---
title: 基础算法之排序
date: 2025-04-13 02:55:31
tags:
  - 算法
categories: 学习笔记
comments: "true"
---

# 为什么要开始这个章节

蓝桥杯捐款了，痛定思痛开始好好学算法，太丢脸了ww

跟着acwing的y神继续学！！！！！

加油加油www

# 排序的本质理解

- 快排：把两边切开分别排序，再切开递归，本质是分治

# 快速排序

## 代码

```python
def quick_sort(arr): # 定义快排的函数，输入为一个数组
    if len(arr) <= 1:
        return arr # 判断输入的数组如果小于等于一个元素就返回本身不用排序
    pivot = arr[ len(arr) // 2 ] # 定义一个参照的元素povit为arr列表中间元素
    left = [x for x in arr if x < pivot] # left列表如果x比参照pivot小就把其输入到其中
    middle = [x for x in arr if x == pivot] # middle就是pivot
    right = [x for x in arr if x > pivot] # right列表如果x比参照pivot大就把其输入到其中
    return quick_sort(left) + middle + quick_sort(right) # 递归左右直到排序完全并返回
    
n = int(input()) # 输入数组长度并转换为int
arr = list(map(int,input().split())) # 输入数组元素以空格分开并全部为int形成列表

sorted_arr = quick_sort(arr) # 把快排结果储存在sorted_arr当中
print(" ".join(map(str,sorted_arr))) # 以空格的形式输出字符串列表
```

## 一些python的用法更新

- 一些需要注意的用法

  - 列表推导式

    好的，这个问题非常关键！让我们深入理解列表推导式的语法，特别是为什么 `for` 前面有一个 `x`。

    ### 列表推导式的基本结构

    列表推导式的基本结构如下：

    ```python
    [expression for item in iterable if condition]
    ```

    - **`expression`**：这是你希望每个元素变成的样子，或者说是处理每个元素的结果。通常这是你想要生成的结果。
    - **`item`**：这是迭代过程中的每个元素，代表你从 `iterable` 中获取的元素。
    - **`iterable`**：这是你要遍历的对象，通常是一个列表、元组、字符串等。
    - **`condition`**（可选）：这是一个过滤条件，只有满足这个条件的元素才会被包含在最终的列表中。

    ### 为什么第一个 `for` 前有一个 `x`？

    在你的代码中：

    ```python
    left = [x for x in arr if x < pivot]
    ```

    - **第一个 `x`** 是 **表达式部分**。它表示你希望列表推导式结果中的每个元素应该是什么。这里，`x` 代表你希望新列表中的每个元素直接是 `arr` 中小于 `pivot` 的元素。
    - **`for x in arr`** 是 **迭代部分**，表示你要遍历 `arr` 中的每个元素，并将它们赋值给 `x` 。
    - **`if x < pivot`** 是 **过滤条件部分**，它表示你只想把那些小于 `pivot` 的元素放入新列表 `left`。

    ### 解释 `x for x in arr` 部分

    - `for x in arr` 表示遍历 `arr` 数组中的每一个元素，并将当前的元素赋值给 `x`。这个 `x` 是一个 **占位符**，代表当前的元素。
    - 在列表推导式中，`x` 会出现在 **`for` 语句前**，它表示生成的新列表中每一个元素的值。换句话说，**`x` 是你要生成的新列表中的元素**。

    ### 举个例子

    假设 `arr = [3, 6, 8, 10, 1, 2, 1]`，`pivot = 6`。执行这行代码时：

    ```python
    left = [x for x in arr if x < 6]
    ```

    **执行步骤**：
    1. `x` 会依次取 `arr` 中的每个元素：
       - `x = 3`，满足 `3 < 6`，所以 `3` 被加入到 `left`。
       - `x = 6`，不满足 `6 < 6`，所以 `6` 不被加入。
       - `x = 8`，不满足 `8 < 6`，所以 `8` 不被加入。
       - `x = 10`，不满足 `10 < 6`，所以 `10` 不被加入。
       - `x = 1`，满足 `1 < 6`，所以 `1` 被加入到 `left`。
       - `x = 2`，满足 `2 < 6`，所以 `2` 被加入到 `left`。
       - `x = 1`，满足 `1 < 6`，所以 `1` 被加入到 `left`。

    最终，`left` 变成了 `[3, 1, 2, 1]`。

    ### 总结

    第一个 `x` 代表了我们想要生成的新列表中的元素。它位于 `for` 语句之前，因为它定义了列表推导式的“输出”，即新的列表中的元素是什么。而 `for x in arr` 则是指定我们遍历 `arr` 数组并从中选取元素 `x`。

  - `list()` 函数

    Python 中的 `list()` 也是一个内置函数，用于将其他可迭代对象（如元组、字符串、字典等）转换为列表。

  - `join` 是 Python 字符串类型的一个方法，用于将 **可迭代对象**（如列表、元组、集合等）中的元素连接成一个字符串，并且你可以指定一个 **分隔符**，这个分隔符会插入到每两个元素之间。

    ### `join` 方法的基本语法：
    ```python
    separator.join(iterable)
    ```

    - **`separator`**：指定连接符，即在每个元素之间插入的字符串。可以是任何字符串（例如空格、逗号、下划线等）。
    - **`iterable`**：这是你想要连接的可迭代对象（如列表、元组、集合等）。它的元素通常需要是字符串类型，或者可以通过 `str()` 转换为字符串。

    ### `join` 方法的工作原理：
    1. `join` 方法将遍历 `iterable` 中的每个元素。
    2. 然后，它会将元素连接成一个字符串，每个元素之间使用指定的 `separator` 作为分隔符。
    3. 最终返回一个新的连接后的字符串。

    ### 示例：

    1. **基本使用：**
       假设我们有一个字符串列表，想要将它们通过空格连接成一个字符串。

       ```python
       words = ["Hello", "world", "Python"]
       result = " ".join(words)
       print(result)
       ```

       输出：
       ```
       Hello world Python
       ```

       这里，`" "` 是分隔符，它将列表中的元素用空格连接起来。

    2. **使用其他分隔符：**
       你可以指定不同的分隔符，如逗号、下划线等。

       ```python
       words = ["apple", "banana", "cherry"]
       result = ", ".join(words)
       print(result)
       ```

       输出：
       ```
       apple, banana, cherry
       ```

       这里，`", "` 是分隔符，元素之间用逗号加空格连接。

    3. **没有分隔符：**
       如果你不想在元素之间添加任何分隔符，可以使用空字符串 `""`。

       ```python
       words = ["H", "e", "l", "l", "o"]
       result = "".join(words)
       print(result)
       ```

       输出：
       ```
       Hello
       ```

       这里，空字符串 `""` 作为分隔符，将列表中的元素直接连接成一个没有空格的字符串。

    4. **连接数字（需要转换为字符串）：**
       如果列表中的元素是非字符串类型（例如数字），你需要将它们转换为字符串类型。可以使用 `map(str, iterable)` 来实现转换。

       ```python
       numbers = [1, 2, 3, 4]
       result = "-".join(map(str, numbers))
       print(result)
       ```

       输出：
       ```
       1-2-3-4
       ```

       这里，`map(str, numbers)` 会将每个数字转换为字符串，然后再用 `"-"` 连接它们。

    5. **处理空列表：**
       如果列表是空的，`join` 方法会返回一个空字符串。

       ```python
       empty_list = []
       result = " ".join(empty_list)
       print(result)  # 输出 ''
       ```

    ### 总结：
    - **`join`** 方法是将一个可迭代对象中的元素连接成一个字符串，元素之间用指定的分隔符连接。
    - 它的语法是：`separator.join(iterable)`，其中 `separator` 是你希望使用的连接符。
    - `join` 适用于字符串类型的元素，若元素是其他类型（如数字），需要先将其转换为字符串。

    这个方法非常高效，尤其是当你需要连接大量字符串时，它比直接使用 `+` 更高效。

  - map 把字符串列表转换为整数

  - 其他用法

  - `map()` 是 Python 中的一个内置函数，用于 **将一个函数应用到可迭代对象（如列表、元组等）中的每个元素**，并返回一个迭代器，包含了应用函数后的结果。

    ### `map()` 的基本语法：
    ```python
    map(function, iterable, ...)
    ```
    - **`function`**：一个函数，可以是内置的函数、lambda 表达式或用户定义的函数，表示你希望应用于每个元素的操作。
    - **`iterable`**：一个可迭代对象（如列表、元组、字符串等），`map()` 会将 `function` 应用到其中的每个元素。
    - 如果有多个可迭代对象作为参数，`map()` 会将它们一一配对，并将 `function` 应用到对应元素的组合上。

    ### `map()` 的工作流程：
    1. `map()` 会将传入的 `function` 应用到 `iterable` 中的每一个元素。
    2. 它返回一个 **迭代器**，而不是直接返回一个列表（如果需要可以通过 `list()` 或 `tuple()` 等转换为具体的类型）。
    3. 你可以使用 `for` 循环或 `list()` 函数来遍历这个迭代器，获取每个元素的结果。

    ### 示例：

    1. **简单的例子：**

       假设我们有一个列表，想将其中的每个数字乘以 2。

       ```python
       numbers = [1, 2, 3, 4, 5]
       result = map(lambda x: x * 2, numbers)
       print(list(result))
       ```

       输出：
       ```
       [2, 4, 6, 8, 10]
       ```

       - 这里，`lambda x: x * 2` 是一个匿名函数，表示对每个元素执行 `x * 2` 操作。
       - `map()` 会将这个操作应用到 `numbers` 列表中的每个元素。
       - 由于 `map()` 返回的是一个迭代器，我们使用 `list()` 将其转换为列表，并打印输出。

    2. **将字符串转换为数字：**

       如果你有一个包含数字字符串的列表，想将它们转换为整数：

       ```python
       str_numbers = ["1", "2", "3", "4"]
       result = map(int, str_numbers)
       print(list(result))
       ```

       输出：
       ```
       [1, 2, 3, 4]
       ```

       - 这里，`int` 是一个内置函数，它将每个字符串转换为整数。
       - `map(int, str_numbers)` 会把 `str_numbers` 列表中的每个字符串应用 `int` 函数，得到一个整数列表。

    3. **多个可迭代对象：**

       `map()` 也可以接受多个可迭代对象。如果传入多个可迭代对象，`map()` 会将它们的元素按位置进行配对，并将 `function` 应用于每一组元素。例如：

       ```python
       numbers1 = [1, 2, 3]
       numbers2 = [4, 5, 6]
       result = map(lambda x, y: x + y, numbers1, numbers2)
       print(list(result))
       ```

       输出：
       ```
       [5, 7, 9]
       ```

       - 这里，`map()` 会将 `numbers1` 和 `numbers2` 中对应位置的元素配对：`(1, 4)`, `(2, 5)`, `(3, 6)`，然后对每一对元素应用 `lambda x, y: x + y`，即将它们相加。

    ### `map()` 返回的是一个迭代器
    需要注意的是，`map()` 返回的是一个 **迭代器**，不是一个列表。因此，在使用时，我们通常需要用 `list()` 函数将其转换为列表，或者使用 `for` 循环来遍历。

    ### 例子总结：
    1. **应用函数到每个元素：**
       ```python
       numbers = [1, 2, 3]
       result = map(lambda x: x * 2, numbers)
       print(list(result))  # 输出 [2, 4, 6]
       ```

    2. **将字符串转换为数字：**
       ```python
       str_numbers = ["10", "20", "30"]
       result = map(int, str_numbers)
       print(list(result))  # 输出 [10, 20, 30]
       ```

    3. **多个可迭代对象：**
       ```python
       nums1 = [1, 2, 3]
       nums2 = [4, 5, 6]
       result = map(lambda x, y: x + y, nums1, nums2)
       print(list(result))  # 输出 [5, 7, 9]
       ```

    ### 总结：
    - `map()` 是一个高效的函数式编程工具，能够将一个函数应用到多个元素上，并返回一个新的迭代器。
    - 它通常用于将某种操作应用于一个或多个可迭代对象的每个元素，像是转换数据类型、数学运算等。
    - 返回值是一个迭代器，你可以使用 `list()`、`tuple()` 或直接迭代它来获取结果。

    希望这个解释能帮你理解 `map()` 的使用！

# 归并排序
