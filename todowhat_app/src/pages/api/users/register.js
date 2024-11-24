export default function handler(req, res) {
    if (req.method === "POST") {
      const { username, email, password, captcha } = req.body;
  
      // 验证 CAPTCHA（模拟）
      if (!captcha) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request data",
            details: {
              captcha: "CAPTCHA is required",
            },
          },
        });
      }
  
      // 校验数据完整性
      const errors = {};
      if (!username) errors.username = "Username is required";
      if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
      if (!password || password.length < 8) errors.password = "Password must be at least 8 characters long";
  
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request data",
            details: errors,
          },
        });
      }
  
      // 模拟重复用户检查
      if (email === "existing_user@example.com") {
        return res.status(409).json({
          success: false,
          error: {
            code: "DUPLICATE",
            message: "Registration denied: User with this email already exists.",
          },
        });
      }
  
      // 模拟成功响应
      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: 1,
          username,
          email,
        },
      });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }