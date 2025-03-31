# 代理配置

本页面详细介绍 XHS1 的代理服务器配置。

## 代理类型支持

XHS1 支持以下类型的代理服务器：

### HTTP/HTTPS 代理

```json
{
  "type": "http",
  "host": "proxy.example.com",
  "port": 8080,
  "username": "user",
  "password": "pass"
}
```

### SOCKS5 代理

```json
{
  "type": "socks5",
  "host": "socks.example.com",
  "port": 1080,
  "username": "user",
  "password": "pass"
}
```

### 隧道代理

```json
{
  "type": "tunnel",
  "host": "tunnel.example.com",
  "port": 443,
  "token": "your-tunnel-token"
}
```

## 配置方法

### 方法一：配置文件

在 `config/proxy.json` 中配置：

```json
{
  "enabled": true,
  "default": "proxy1",
  "rotation": {
    "enabled": true,
    "interval": 300,
    "strategy": "round-robin"
  },
  "proxies": {
    "proxy1": {
      "type": "http",
      "host": "proxy1.example.com",
      "port": 8080
    },
    "proxy2": {
      "type": "socks5",
      "host": "proxy2.example.com",
      "port": 1080
    }
  },
  "test": {
    "url": "https://www.xiaohongshu.com",
    "timeout": 5000,
    "interval": 60
  }
}
```

### 方法二：环境变量

```env
# 基本配置
PROXY_ENABLED=true
PROXY_DEFAULT=proxy1

# 代理服务器
PROXY_1_TYPE=http
PROXY_1_HOST=proxy1.example.com
PROXY_1_PORT=8080

PROXY_2_TYPE=socks5
PROXY_2_HOST=proxy2.example.com
PROXY_2_PORT=1080

# 轮换设置
PROXY_ROTATION_ENABLED=true
PROXY_ROTATION_INTERVAL=300
PROXY_ROTATION_STRATEGY=round-robin
```

### 方法三：用户界面

1. 进入设置页面
2. 选择"代理设置"
3. 添加或编辑代理服务器
4. 配置代理参数
5. 保存设置

## 代理轮换

### 轮换策略

1. 轮询（Round-Robin）
   - 按顺序循环使用代理
   - 适合负载均衡
   - 默认策略

2. 随机（Random）
   - 随机选择代理
   - 提高安全性
   - 分散访问压力

3. 权重（Weighted）
   - 根据权重选择代理
   - 支持性能优先
   - 可自定义权重

### 轮换配置

```json
{
  "rotation": {
    "enabled": true,
    "interval": 300,
    "strategy": "weighted",
    "weights": {
      "proxy1": 3,
      "proxy2": 2,
      "proxy3": 1
    }
  }
}
```

## 代理测试

### 测试配置

```json
{
  "test": {
    "enabled": true,
    "url": "https://www.xiaohongshu.com",
    "timeout": 5000,
    "interval": 60,
    "retries": 3,
    "parallel": 2
  }
}
```

### 测试项目

1. 连接测试
   - TCP 连接
   - DNS 解析
   - SSL 验证

2. 性能测试
   - 响应时间
   - 下载速度
   - 稳定性

3. 可用性测试
   - 网站访问
   - API 调用
   - 内容获取

## 错误处理

### 故障转移

```json
{
  "failover": {
    "enabled": true,
    "maxRetries": 3,
    "timeout": 10000,
    "backoff": {
      "initial": 1000,
      "max": 30000,
      "factor": 2
    }
  }
}
```

### 错误类型

1. 连接错误
   - 连接超时
   - 连接拒绝
   - DNS 解析失败

2. 认证错误
   - 用户名/密码错误
   - 令牌过期
   - 权限不足

3. 性能问题
   - 响应慢
   - 带宽限制
   - 连接不稳定

## 安全配置

### 加密设置

```json
{
  "security": {
    "ssl": {
      "enabled": true,
      "verify": true,
      "cert": "path/to/cert.pem",
      "key": "path/to/key.pem"
    },
    "encryption": {
      "enabled": true,
      "algorithm": "aes-256-gcm",
      "key": "your-encryption-key"
    }
  }
}
```

### 访问控制

```json
{
  "access": {
    "whitelist": [
      "192.168.1.0/24",
      "10.0.0.0/8"
    ],
    "blacklist": [
      "1.2.3.4",
      "5.6.7.8"
    ]
  }
}
```

## 监控和日志

### 监控配置

```json
{
  "monitoring": {
    "enabled": true,
    "metrics": [
      "response_time",
      "success_rate",
      "error_rate"
    ],
    "alerts": {
      "slow_response": 5000,
      "error_threshold": 0.1
    }
  }
}
```

### 日志设置

```json
{
  "logging": {
    "level": "info",
    "file": "logs/proxy.log",
    "rotation": {
      "size": "10M",
      "keep": 7
    },
    "format": "json"
  }
}
```

## 最佳实践

### 性能优化

1. 代理选择
   - 选择地理位置近的代理
   - 使用专业代理服务
   - 避免公共代理

2. 连接管理
   - 合理设置超时
   - 启用连接池
   - 控制并发数

### 可靠性

1. 高可用配置
   - 配置多个代理
   - 启用故障转移
   - 定期测试代理

2. 监控告警
   - 监控代理状态
   - 设置告警阈值
   - 及时处理异常

### 安全性

1. 访问控制
   - 限制 IP 访问
   - 加密传输数据
   - 定期更换密钥

2. 数据保护
   - 加密敏感信息
   - 安全存储凭证
   - 定期审计日志

## 常见问题

### 连接问题

1. 代理无法连接
   - 检查网络连接
   - 验证代理配置
   - 测试代理可用性

2. 连接速度慢
   - 选择更快的代理
   - 优化网络设置
   - 检查带宽限制

### 认证问题

1. 认证失败
   - 检查凭证正确性
   - 更新认证信息
   - 确认权限设置

2. 令牌过期
   - 更新访问令牌
   - 检查有效期
   - 配置自动更新

## 相关链接

- [基础配置](/config/basic)
- [环境变量](/config/env)
- [常见问题](/guide/faq) 