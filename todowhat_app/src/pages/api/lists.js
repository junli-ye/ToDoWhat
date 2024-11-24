export default function handler(req, res) {
    // Check HTTP method
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed. Use GET.",
      });
    }
  
    // Mock Authorization header validation
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== "Bearer YOUR_TEST_TOKEN") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Invalid or missing token.",
      });
    }
  
    // Mock response data
    const mockData = {
      success: true,
      message: "Lists information retrieved successfully.",
      Private: {
        myList: 5,
        assignedToMe: 3,
        dueToday: 0,
      },
      Group: [
        { id: 1, name: "Team Alpha", count: 4 },
        { id: 2, name: "Project Beta", count: 7 },
      ],
    };
  
    // Return the mock data
    return res.status(200).json(mockData);
  }