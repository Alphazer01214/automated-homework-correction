# 自动作业批改平台
一个基于AI的多学科智能作业批改平台，支持语文、数学、英语等科目的作业批改。

前端使用Vite+Vue

后端使用Flask

## 前端框架

### 1. `components/` -可复用组件

- `SubjectSelector.vue` - 学科选择器
  
  ```
  作用：让用户选择要批改的学科（数学、语文、英语）
  功能：
  - 显示学科卡片列表
  - 处理学科选择事件
  - 根据学科显示不同的输入表单
  ```
  
- `AssignmentForm.vue` - 作业提交表单
  
  ```
  作用：通用的作业提交表单容器
  功能：
  - 集成学科特定的输入组件
  - 处理文件上传
  - 表单验证
  - 提交数据到后端
  ```
- `MathAnswerInput.vue` - 数学答题输入
  
  ```vue
  作用：数学题目的专用输入界面
  功能：
  - 支持公式输入（LaTeX）
  - 分步解题输入
  - 几何图形标注
  - 计算过程书写
  ```
  
- `ChineseAnswerInput.vue` - 语文答题输入
  ```vue
  作用：语文作业的专用输入界面
  功能：
  - 富文本编辑器（作文）
  - 阅读理解答题区
  - 诗词鉴赏模板
  - 字数统计
  ```

- `EnglishAnswerInput.vue` - 英语答题输入
  ```vue
  作用：英语作业的专用输入界面
  功能：
  - 英语作文编辑器
  - 语法练习输入
  - 翻译练习区域
  - 实时拼写检查
  ```
> 注：未来可能加入更多学科

- `ImageUpload.vue` - 图片上传组件
  ```vue
  作用：处理图片上传和预览
  功能：
  - 拖拽上传
  - 图片预览
  - 图片裁剪
  - 多图上传
  ```

- `ResultPanel.vue` - 批改结果展示
  
  ```vue
  作用：显示AI批改结果
  功能：
  - 分数展示
  - 分项评分
  - 批注展示
  - 改进建议
  ```
  
- `LoadingSpinner.vue` - 加载状态组件
  
  ```vue
  作用：显示加载中的状态
  功能：
  - 全屏加载
  - 局部加载
  - 进度提示
  ```

### 2. `views/` - 页面级组件

- `HomeView.vue` - 首页
  
  ```vue
  作用：应用入口页面
  功能：
  - 学科选择入口
  ```
  
- **`SubmitAssignment.vue`** - 作业提交页面
  
  ```vue
  作用：主要的作业提交界面
  功能：
  - 集成所有输入组件
  - 表单验证
  - 提交处理
  ```
  
- **`ResultView.vue`** - 批改结果页面
  
  ```vue
  作用：详细展示批改结果
  功能：
  - 完整批改报告
  - 错题分析
  - 改进建议
  - 历史对比
  ```
  
- **`HistoryView.vue`** - 历史记录页面
  
  ```vue
  作用：查看批改历史
  功能：
  - 历史记录列表
  - 结果筛选
  - 进度追踪
  ```

### 3. `stores/` - 状态管理

用于管理全局信息

- `userStore.js` ：管理用户登录、信息等

- `assignmentStore.js` ：管理作业提交、获取结果等
- `subjectStore.js` ：管理学科列表、选中学科等



### 4. `api/` - API接口层
用于与后端沟通

- `request.js` ：这个文件用于配置基础 URL（Flask 地址）、请求超时和响应拦截器。
- `subject.js`：用于获取学科
- `file.js`：用于上传文件
- `assignment.js`：用于处理作业
- `index.js`  ： 用于统一管理所有api



### 5. `utils/` - 工具函数

- **`validation.js`** - 表单验证
  
  ```javascript
  作用：通用的表单验证逻辑，用于检测输入内容是否合法
  ```
  
- **`fileHandler.js`** - 文件处理
  
  ```javascript
  作用：处理文件（图像）上传和转换
  ```
  
- **`mathHelper.js`** - 数学工具
  
  ```javascript
  作用：数学相关的工具函数
  方法：
  - parseLatex(): LaTeX解析
  - validateEquation(): 方程验证
  - formatMathExpression(): 数学表达式格式化
  ```
  
- `textHelper.js` - 文本处理

  ```
  语文/英语文本处理（分词/字数统计/关键词抽取/相似度）
  ```

  

### 6. `styles/` - 样式文件
css







### 7. `assets/` - 静态资源文件





### 8. `router/` - 页面切换





### 组件间数据流

```
用户操作 → views/ → components/ → stores/ → api/ → 后端
     ↓          ↓          ↓          ↓         ↓
界面交互 → 页面控制 → 组件处理 → 状态更新 → 网络请求
```



## 后端框架

使用Flask，前后端通过 JSON 文本交流。

具体参考 `app.py`


