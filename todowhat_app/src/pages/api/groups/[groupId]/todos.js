export default function handler(req, res) {
    const { groupId } = req.query;
  
    if (req.method === "GET") {
      const { authorization } = req.headers;
  
      // 模拟检查 Authorization token
      if (!authorization || authorization !== "Bearer YOUR_TEST_TOKEN") {
        return res.status(401).json({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authorization token is required or invalid.",
          },
        });
      }
  
      // 模拟返回指定 groupId 的任务列表
      const todos = [
        {
          task: "Complete group tasks",
          text: "Prepare group report",
          category: "Work",
          deadline: "2024-12-10T12:00:00Z",
          status: "To Do",
          assignedUser: "John Doe",
        },
        {
          task: "Team meeting",
          text: "Discuss Q1 objectives",
          category: "Work",
          deadline: "2024-11-30T15:00:00Z",
          status: "In Progress",
          assignedUser: "Jane Smith",
        },
      ];
  
      if (todos.length > 0) {
        return res.status(200).json({
          success: true,
          message: `Todos for group ${groupId} retrieved successfully`,
          todos,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `No todos found for group ${groupId}`,
          todos: [],
        });
      }
    } else {
      // 不支持的方法
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({
        success: false,
        error: {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${req.method} is not allowed.`,
        },
      });
    }
  }