export default function handler(req, res) {
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
  
      // 模拟返回分配的任务列表
      const todos = [
        {
          groupId: 1,
          task: "Complete the API design",
          text: "Text",
          category: "Work",
          deadline: "2024-12-01T12:00:00Z",
          status: "In Progress",
          assigned_time: "2024-11-15T08:00:00Z",
          created_time: "2024-11-10T10:00:00Z",
          updated_time: "2024-11-11T12:00:00Z",
        },
        {
          groupId: 2,
          task: "Prepare presentation",
          text: "Complete the slides for the meeting",
          category: "Teamwork",
          deadline: "2024-11-25T18:00:00Z",
          status: "To Do",
          assigned_time: "2024-11-20T10:00:00Z",
          created_time: "2024-11-18T12:00:00Z",
          updated_time: "2024-11-19T14:00:00Z",
        },
      ];
  
      if (todos.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Assigned todos retrieved successfully",
          todos,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No assigned todos found",
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