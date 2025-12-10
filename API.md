# 自动作业批改平台 API 文档

**基础 URL**: `http://localhost:5000/api`

## 统一响应格式

### 成功响应

```json
{
  "success": true,
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 错误响应
```json
{
  "success": false,
  "code": 40001,
  "message": "具体错误信息",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 错误码规范

### 客户端错误

| 错误码 | 说明 |
|--------|------|
| 40001 |      |
|        |      |
|        |      |
|        |      |
|        |      |
|        |      |
|        |      |

### 服务端错误

| 错误码 | 说明 |
|--------|------|
| 50001 |      |
|        |      |
|        |      |
|        |      |

## 认证相关 API

### 用户登录

**端点**: `POST /api/auth/login`

**请求体**:
```json
{
  "username": "string, required",
  "password": "string, required"
}
```

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "登录成功",
  "data": {
    "user_id": "用户ID",
    "username": "用户名",
    "token": "JWT令牌（暂时不需要）",
    "expires_in": 3600
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 用户注册
**端点**: `POST /api/auth/register`

**请求体**:
```json
{
  "username": "string, required",
  "password": "string, required",
  "role": "student"
}
```

**响应**: 

**响应**:

```json
{
  "success": true,
  "code": 200,
  "message": "登录成功",
  "data": {
    "user_id": "用户ID",
    "username": "用户名",
    "token": "JWT令牌（暂时不需要）",
    "expires_in": 3600
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```



### 获取用户信息
**端点**: `GET /api/auth/profile`

**请求头**:
```
Authorization: Bearer {token}
```

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "user_id": "用户ID",
    "username": "用户名",
    "role": "student",
    "created_at": "注册时间"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 作文 API

### 提交作文批改

**端点**: `POST /api/essay/submit`

**请求头**:

```
Authorization: Bearer {token}  # 可选
Content-Type: multipart/form-data 或 application/json
```

**请求体**:

```json
{
  	"id": string,   // 相同question, student_answer视为同一个id
    "question": string,
    "student_answer": string,
    "ground_truth": string,
    "model_feedback": string,
    "edits": Array<Object>  // {username: string, feedback: string}，哪个老师给出什么评论
}
```

**响应**:

```json
{
  "success": true,
  "code": 200,
  "message": "提交成功",
  "data": {
    "id": "自动生成的唯一ID",
  }
}
```



## 作业批改 API

### 提交作业批改
**端点**: `POST /api/assignments/submit`

**请求头**:
```
Authorization: Bearer {token}  # 可选
Content-Type: multipart/form-data 或 application/json
```

**请求体**:
```json
{
  "subject": "math | chinese | english, required",
  "questions": [
    {
      "question": "string, required", // 题目内容
      "student_answer": "string, required", // 学生答案
      "image_file": "base64编码图片或文件对象, optional",
      "question_type": "string, optional", // 题目类型细分
    }
  ],
  "user_id": "string, optional", // 如果已登录可省略
}
```

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "提交成功",
  "data": {
    "assignment_id": "自动生成的唯一ID",
    "status": "queued", // queued, processing, completed, failed
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 查询批改状态（暂不需要）

**端点**: `GET /api/assignments/{assignment_id}/status`

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "assignment_id": "作业ID",
    "status": "processing", // queued, processing, completed, failed
    "started_at": "开始处理时间",
    "updated_at": "最后更新时间"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 获取批改结果

**端点**: `GET /api/assignments/{assignment_id}/result`

**响应**:
```json
{
  "success": true,
  "data": {
    "id": "作业ID",
  	"user_id": string
    "status": "completed",
    "createded_at": "提交时间",
    "updated_at": "完成时间",
    "score": 85,    // 注：默认所有作业满分都是100
    "questions": [{question}],
    "model_feedback": []
  }
}
```

## 历史记录 API（暂不需要）

### 获取批改历史

**端点**: `GET /api/assignments/history`

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| page | integer | 页码，默认1 |
| page_size | integer | 每页数量，默认20，最大100 |
| subject_filter | string | 学科过滤 |
| type_filter | string | 作业类型过滤 |
| date_from | string | 开始日期 (YYYY-MM-DD) |
| date_to | string | 结束日期 (YYYY-MM-DD) |
| sort_by | string | 排序字段 (submitted_at, score) |
| sort_order | string | 排序方向 (asc, desc) |

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "assignments": [
      {
        "assignment_id": "作业ID",
        "subject_id": "math",
        "title": "作业标题",
        "overall_score": 85,
        "status": "completed",
        "submitted_at": "提交时间",
        "completed_at": "完成时间",
        "question_count": 5,
        "correct_count": 4
      }
    ],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total_count": 150,
      "total_pages": 8,
      "has_prev": false,
      "has_next": true
    },
    "summary": {
      "total_assignments": 150,
      "average_score": 78.5,
      "completion_rate": 95.2
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 获取单个历史记录详情
**端点**: `GET /api/assignments/history/{assignment_id}`

**响应**: 同批改结果接口响应格式

### 删除历史记录
**端点**: `DELETE /api/assignments/history/{assignment_id}`

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "删除成功",
  "data": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 文件上传 API（暂不需要）

### 上传文件
**端点**: `POST /api/files/upload`

**请求头**:
```
Content-Type: multipart/form-data
```

**请求体**:
- `file`: 文件对象 (required)
- `purpose`: 文件用途 (assignment, avatar, temporary) (required)
- `assignment_id`: 关联的作业ID (optional)

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "上传成功",
  "data": {
    "file_id": "文件唯一ID",
    "filename": "原始文件名",
    "file_url": "文件访问URL",
    "file_size": 1024000,
    "mime_type": "image/jpeg",
    "uploaded_at": "上传时间",
    "expires_at": "过期时间（临时文件）"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 文件限制
- 最大文件大小: 10MB
- 支持的图片格式: JPG, PNG, GIF, WebP
- 支持的文档格式: PDF, DOC, DOCX (未来扩展)

## 批量操作 API（暂不需要）

### 批量提交作业
**端点**: `POST /api/assignments/batch-submit`

**请求体**:
```json
{
  "assignments": [
    {
      // 同单个提交的作业数据
    }
  ],
  "batch_metadata": {
    "name": "批量作业名称",
    "description": "描述"
  }
}
```

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "批量提交成功",
  "data": {
    "batch_id": "批量作业ID",
    "assignment_ids": ["作业ID1", "作业ID2"],
    "total_count": 5,
    "success_count": 5
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 获取批量结果
**端点**: `GET /api/assignments/batch/{batch_id}/results`

**响应**: 包含所有作业结果的数组

## 统计分析 API（暂不需要）

### 学习进度分析
**端点**: `GET /api/analytics/progress`

**查询参数**: 
- `time_range`: 时间范围 (7d, 30d, 90d, all)
- `subject_id`: 学科ID

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "summary": {
      "total_assignments": 50,
      "average_score": 82.5,
      "improvement_rate": 15.2
    },
    "subject_breakdown": [
      {
        "subject_id": "math",
        "assignment_count": 20,
        "average_score": 85.0,
        "trend": "improving"
      }
    ],
    "weekly_progress": [
      {
        "week": "2024-W01",
        "average_score": 78.0,
        "assignment_count": 5
      }
    ],
    "knowledge_analysis": [
      {
        "topic": "一元二次方程",
        "mastery_level": 85,
        "practice_count": 15
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 系统状态 API（暂不需要）

### 服务状态检查
**端点**: `GET /api/health`

**响应**:
```json
{
  "success": true,
  "code": 200,
  "message": "服务正常",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0",
    "uptime": 86400,
    "services": {
      "ai_grading": "healthy",
      "file_processing": "healthy",
      "database": "healthy"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```
