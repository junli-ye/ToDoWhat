export default function handler(req, res) {
    const { groupId } = req.query;
  
    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        members: [
          { id: 1, name: "Alice", role: "Admin" },
          { id: 2, name: "Bob", role: "Member" },
          { id: 3, name: "Charlie", role: "Member" },
          { id: 8888, name: "Junli", role: "Owner" },
        ],
      });
    }
  
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      success: false,
      error: {
        message: `Method ${req.method} not allowed`,
      },
    });
  }