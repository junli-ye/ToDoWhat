export default function handler(req, res) {
    if (req.method === "POST") {
      const { email } = req.body;
  
      // 模拟邮箱数据库
      const mockDatabase = ["user@example.com", "test@example.com"];
  
      // 检查请求体是否包含邮箱
      if (!email) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Email is required.",
          },
        });
      }
  
      // 模拟邮箱验证逻辑
      if (mockDatabase.includes(email)) {
        // 邮箱存在，返回成功响应
        return res.status(200).json({
          success: true,
          message: "A temporary password has been sent to your email address.",
        });
      } else {
        // 邮箱不存在，返回成功响应
        return res.status(200).json({
          success: true,
          message: "The provided email address is not registered.",
        });
      }
    } else {
      // 方法不被允许
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({
        success: false,
        error: {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${req.method} is not allowed.`,
        },
      });
    }
  }