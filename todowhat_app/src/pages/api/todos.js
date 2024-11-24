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
  
      // Mock response
      const todos = [
        {
          id: 1,
          task: "Complete the API design",
          text: "Finalize and submit the API documentation",
          category: "Work",
          deadline: "2024-12-01T12:00:00Z",
          status: "In Progress",
          is_private: true,
          created_time: "2024-11-20T08:00:00Z",
          updated_time: "2024-11-21T10:00:00Z",
        },
        {
          id: 2,
          task: "Fix backend bug",
          text: "Debugging the API response issue",
          category: "Work",
          deadline: "2024-11-30T18:00:00Z",
          status: "To Do",
          is_private: true,
          created_time: "2024-11-15T10:00:00Z",
          updated_time: "2024-11-16T12:00:00Z",
        },
        {
          id: 3,
          task: "Submit project proposal",
          text: "Prepare and submit the initial proposal for the project",
          category: "Work",
          deadline: "2024-11-25T14:00:00Z",
          status: "Done",
          is_private: true,
          created_time: "2024-11-10T08:00:00Z",
          updated_time: "2024-11-20T15:00:00Z",
        },
        {
          id: 4,
          task: "Buy groceries",
          text: "Milk, eggs, and bread",
          category: "Personal",
          deadline: "2024-11-22T16:00:00Z", // 已逾期
          status: "To Do",
          is_private: true,
          created_time: "2024-11-15T09:00:00Z",
          updated_time: "2024-11-18T10:00:00Z",
        },
        {
          id: 5,
          task: "Plan holiday trip",
          text: "Book flights and hotels for the Japan trip",
          category: "Leisure",
          deadline: "2024-11-29T20:00:00Z",
          status: "In Progress",
          is_private: true,
          created_time: "2024-11-05T14:00:00Z",
          updated_time: "2024-11-10T10:00:00Z",
        },
        {
          id: 6,
          task: "Team meeting",
          text: "Discuss Q1 targets",
          category: "Work",
          deadline: "2024-11-28T10:00:00Z",
          status: "Delay", // 延期任务
          is_private: true,
          created_time: "2024-11-10T09:00:00Z",
          updated_time: "2024-11-12T11:00:00Z",
        },
        {
          id: 7,
          task: "Prepare budget report",
          text: "Q4 financial data analysis",
          category: "Finance",
          deadline: "2024-12-10T15:00:00Z",
          status: "To Do",
          is_private: true,
          created_time: "2024-11-22T10:00:00Z",
          updated_time: "2024-11-23T11:00:00Z",
        },
        {
          id: 8,
          task: "Yoga class",
          text: "Attend online yoga session",
          category: "Health",
          deadline: "2024-11-23T08:00:00Z", // 当前日期内
          status: "To Do",
          is_private: true,
          created_time: "2024-11-22T08:00:00Z",
          updated_time: "2024-11-22T10:00:00Z",
        },
        {
          id: 9,
          task: "Organize files",
          text: "Arrange documents in order",
          category: "Personal",
          deadline: "2024-11-25T09:00:00Z",
          status: "Done",
          is_private: true,
          created_time: "2024-11-01T10:00:00Z",
          updated_time: "2024-11-20T12:00:00Z",
        },
        {
          id: 10,
          task: "Follow up with client",
          text: "Discuss project deliverables",
          category: "Work",
          deadline: "2024-11-27T11:00:00Z",
          status: "In Progress",
          is_private: true,
          created_time: "2024-11-15T14:00:00Z",
          updated_time: "2024-11-18T15:00:00Z",
        },
      ];
  
      if (todos.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Todos retrieved successfully",
          todos,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No private todos found",
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