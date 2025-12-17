# 自动作业批改平台

一个基于AI的多学科智能作业批改平台，支持语文、数学、英语等科目的作业批改。

前端使用Vite+Vue

后端使用Flask

## 使用

这个项目用PyCharm打开，首先在backend中新建 `.env` 文件，输入：

```
API_KEY=llm_api_key
API_BASE_URL=https://api.deepseek.com
API_MODEL_NAME=deepseek-reasoner
```

其中， API_KEY需要自行替换（不重要）。

运行backend/app.py。

> **注意**： 1. python 需要flask, dotenv, openai软件包； Node.js 需要 Vue, Vite, marked, katex 等。请先配置好相关环境。
>
> 2. Python项目的根目录是 backend/ ，需确认根目录设置是否正确，否则会出现无法import的问题。 
> 3. 后端端口是 localhost:5000，需要确保端口无冲突。

然后在项目根目录的Terminal里写：

```
cd backend
python app.py

cd ../frontend
npm run dev
```

访问命令行里的链接，不出意外应该是 `Local:   http://localhost:5173/` 。



# 前端

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **状态管理**: Pinia
- **路由**: Vue Router
- **HTTP 客户端**: Axios (通过 `api/request.ts` 配置)
- **构建工具**: Vite
- **样式**: CSS

## 项目结构

### 1. `components/` - 可复用组件

- **核心功能组件**
  - `AssignmentForm.vue` - 作业提交表单
  - `AssignmentDetail.vue` - 作业详情展示
  - `AssignmentHistory.vue` - 历史记录列表组件
  - `EssayForm.vue` - 作文提交表单
  - `HandleLogin.vue` - 登录处理组件
  - `HandleRegister.vue` - 注册处理组件
  - `HelloWorld.vue` - 示例组件

- **测试文件** (`__tests__/`)
  - `HelloWorld.spec.ts` - 组件单元测试

### 2. `views/` - 页面级组件

- **主页面**
  - `HomeView.vue` - 首页
  - `AboutView.vue` - 关于页面

- **核心功能页面**
  - `AssignmentView.vue` - 作业提交页面
  - `ResultView.vue` - 批改结果页面
  - `HistoryView.vue` - 历史记录页面
  - `UserView.vue` - 用户信息页面

- **认证页面**
  - `LoginView.vue` - 登录页面
  - `RegisterView.vue` - 注册页面

### 3. `stores/` - 状态管理 (Pinia)

用于管理全局应用状态

- `userStore.ts` - 管理用户登录状态、用户信息等
- `assignmentStore.ts` - 管理作业提交、获取批改结果等
- `counter.ts` - 示例计数器状态 (可用于测试)

### 4. `api/` - API 接口层

用于与后端服务通信

- **核心配置**
  - `request.ts` - 基础请求配置，包含基础 URL、请求超时和响应拦截器
  - `index.ts` - API 统一导出和管理

- **业务模块**
  - `assignment.ts` - 作业相关 API
  - `essay.ts` - 作文相关 API
  - `auth.ts` - 登录/注册认证相关 API

### 5. `utils/` - 工具函数

- `markdownRender.ts` - Markdown 渲染相关工具

### 6. `types/` - TypeScript 类型定义

- `index.ts` - 统一的类型定义文件

### 7. `router/` - 路由配置

- `index.ts` - 路由配置和页面导航管理

### 8. `styles/` - 样式文件

- CSS 样式文件目录

### 9. `assets/` - 静态资源文件

- **样式文件**
  - `base.css` - 基础样式
  - `main.css` - 主样式文件
  
- **图像资源**
  - `logo.svg` - 应用 Logo

### 10. 根目录文件

- `App.vue` - 应用根组件
- `main.ts` - 应用入口文件

## 组件间数据流

```
用户操作 → views/ → components/ → stores/ → api/ → 后端 Flask 服务
 ↓          ↓          ↓          ↓         ↓
界面交互 → 页面控制 → 组件处理 → 状态更新 → 网络请求 → 数据处理
```



# 后端

## 后端框架

使用 Flask ，前后端通过 JSON 格式进行数据交换。

## 项目结构

#### 0. 根目录

- **`app.py`** - Flask 应用主程序
  
- **`config.py`** - 应用配置

#### 1. `models/` - 数据模型

用于定义数据库表和业务对象

- **`assignment.py`** - 作业数据模型
  
- **`user.py`** - 用户数据模型
  

#### 2. `routes/` - API 路由层

处理 HTTP 请求，定义 API 端点

- **`assignment.py`** - 作业相关路由
  
- **`auth.py`** - 认证相关路由
  
- **`essay.py`** - 作文相关路由

#### 3. `services/` - 业务逻辑层

实现核心业务逻辑，处理复杂操作

- **`assignment_service.py`** - 作业服务
  
- **`auth_service.py`** - 认证服务
  
- **`chat_service.py`** - LLM 集成服务
  

# API 设计规范

## 响应格式

```json
{
  "success": true,
  "data": { /* 响应数据 */ },
  "message": "操作成功",
  "code": 200
}
```

## 错误处理

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  },
  "code": 400
}
```

## 常用状态码

- `200` - 成功
- `201` - 创建成功
- `400` - 客户端错误（验证失败等）
- `401` - 未授权
- `403` - 禁止访问
- `404` - 资源不存在
- `500` - 服务器内部错误



# 数据库设计

## 作业表 (assignments)

| 字段名              | 数据类型       | 约束                 | 默认值              | 描述                                                         |
| :------------------ | :------------- | :------------------- | :------------------ | :----------------------------------------------------------- |
| **id**              | `String(64)`   | **主键**             | 自动生成            | 条目的唯一标识符 (uuid)                                      |
| **user_id**         | `String(64)`   | **外键**，关联 users | -                   | 关联的用户标识符，必填项。                                   |
| **subject**         | `String(100)`  | **非空**             | -                   | 作业或任务的主题/标题。                                      |
| **questions**       | `JSON/Text`    | **非空**             | -                   | 作业的题目与学生回答，存储为 JSON 格式。                     |
| **model_feedback**  | `JSON/Text`    | 可空                 | `NULL`              | 作业的批改结果或模型输出数据，存储为 JSON 格式。             |
| **status**          | `String(20)`   | **非空**，有检查约束 | `'pending'`         | 条目的当前处理状态：<br>`'pending'` - 待处理<br>`'processing'` - 处理中<br>`'completed'` - 已完成<br>`'failed'` - 失败 |
| **score**           | `Numeric(5,2)` | 可空                 | `NULL`              | 作业分数，范围 0-100，保留两位小数。                         |
| **assignment_type** | `String(20)`   | 可空                 | `NULL`              | 作业类型：`'math'`, `'essay'`, `'english'` 等。              |
| **created_at**      | `DateTime`     | **非空**             | `CURRENT_TIMESTAMP` | 记录创建的时间戳。                                           |
| **updated_at**      | `DateTime`     | **非空**，自动更新   | `CURRENT_TIMESTAMP` | 记录最后更新的时间戳，每次更新时自动更新。                   |

## 用户表 (users)

| 字段名         | 数据类型      | 约束                 | 默认值              | 描述                                                         |
| :------------- | :------------ | :------------------- | :------------------ | :----------------------------------------------------------- |
| **user_id**    | `String(64)`  | **主键**             | 自动生成            | uuid                                                         |
| **username**   | `String(50)`  | **非空**，**唯一**   | -                   | 用户自定义用户名                                             |
| **password**   | `String(255)` | **非空**             | -                   | 密码                                                         |
| **role**       | `String(20)`  | **非空**，有检查约束 | `'student'`         | 用户角色：<br>`'student'` - 学生<br>`'teacher'` - 教师<br>`'admin'` - 管理员 |
| **created_at** | `DateTime`    | **非空**             | `CURRENT_TIMESTAMP` | 账号创建的时间戳。                                           |
