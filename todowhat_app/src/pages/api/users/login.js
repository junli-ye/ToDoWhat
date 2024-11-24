export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // 模拟校验逻辑
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request data",
          details: {
            email: !email ? "Email is required" : undefined,
            password: !password ? "Password is required" : undefined,
          },
        },
      });
    }

    // 模拟用户数据
    const mockUser = {
      id: 1,
      username: "example_user",
      email: "user@example.com",
      password: "password123"
    };

    // 校验用户邮箱和密码
    if (email !== mockUser.email || password !== mockUser.password) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password.",
        },
      });
    }

    // 模拟生成 JWT Token
    const mockToken = "JWT_TOKEN";

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: mockToken,
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      },
    });
  } else {
    // 不支持的请求方法
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}