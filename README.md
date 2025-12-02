# 自动作业批改平台
一个基于AI的多学科智能作业批改平台，支持语文、数学、英语等科目的作业批改。

前端使用Vite+Vue

后端使用Flask

## 前端框架

### 1. `components/` -可复用组件

- `AssignmentForm.vue` - 作业提交表单

  ```
  作用：通用的作业提交表单容器
  功能：
  - 集成学科特定的输入组件
  - 处理文件上传
  - 表单验证
  - 提交数据到后端
  ```

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
  
- `UserLogin.vue` - 登录/注册组件

- `UserProfile` - 用户信息组件





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
  
- `UserView.vue` -用户页面：包括查看用户信息、登陆注册等

- `LoginView.vue` 

-  `RegisterView.vue`



### 3. `stores/` - 状态管理

用于管理全局信息

- `userStore.ts` ：管理用户登录、信息等

- `assignmentStore.ts` ：管理作业提交、获取结果等



### 4. `api/` - API接口层
用于与后端沟通

- `request.ts` ：这个文件用于配置基础 URL（Flask 地址）、请求超时和响应拦截器。
- `file.js`：用于上传文件
- `assignment.ts`：用于处理作业
- `index.ts`  ： 用于统一管理所有api
- `auth.ts` ： 认证相关



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

### 1. `models/` - 模型

用于定义用户、作业的数据结构

- `assignment.py` 作业模型
- `user.py` 用户模型

### 2. `routes/` - 路由

用于前后端交互

- `assignment.py` 提交、获取作业等
- `auth.py` 登录、注册等认证

### 3. `services/` - 服务

- `assignment_service.py` 交作业、批改作业功能的具体实现
-  `auth_service.py` 认证服务具体实现




## 数据库

### 作业

| 字段名              | 数据类型   | 约束     | 默认值              | 描述                                                         |
| :------------------ | :--------- | :------- | :------------------ | :----------------------------------------------------------- |
| **id**              | `String`   | **主键** | -                   | 条目的唯一标识符。                                           |
| **user_id**         | `String`   | 可空     | `NULL`              | 关联的用户标识符。如果系统支持多用户，此字段为必填。         |
| **subject**         | `String`   | 非空     | -                   | 作业或任务的主题/标题。                                      |
| **assignment_type** | `String`   | 非空     | -                   | 作业或任务的类型分类。例如：'essay', 'math_problem', 'code_review'。 |
| **questions**       | `JSON`     | 非空     | -                   | 作业的题目与学生回答。                                       |
| **model_feedback**  | `JSON`     | 可空     | `NULL`              | 作业的处理结果或输出数据。用于存储结构化的结果，如AI回复、计算答案、处理状态等。 |
| **status**          | `String`   | -        | `'pending'`         | 条目的当前处理状态。典型工作流：`pending` -> `processing` -> `completed`/`failed`。 |
| score               | Numeric    | -        | -                   | 作业分数                                                     |
| **created_at**      | `DateTime` | -        | `datetime.utcnow()` | 记录创建的时间戳（UTC）。                                    |
| **updated_at**      | `DateTime` | -        | `datetime.utcnow()` | 记录最后更新的时间戳（UTC）。自动更新。                      |

### 用户

| 字段名   | 数据类型 | 约束 | 默认值           | 描述         |
| :------- | :------- | :--- | :--------------- | :----------- |
| user_id  | String   |      |                  | 用户唯一id   |
| username | String   |      | Takamatsu_Tomori | 自定义用户名 |
|          |          |      |                  |              |
|          |          |      |                  |              |
|          |          |      |                  |              |
|          |          |      |                  |              |
|          |          |      |                  |              |
|          |          |      |                  |              |
|          |          |      |                  |              |
|          |          |      |                  |              |
