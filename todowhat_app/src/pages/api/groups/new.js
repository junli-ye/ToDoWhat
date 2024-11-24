let mockGroups = [
    { id: 1, GroupName: "Team Alpha", owner_id: 1 },
    { id: 2, GroupName: "Project Beta", owner_id: 1 },
];
  
export default function handler(req, res) {
    if (req.method === "POST") {
            // Extract Authorization header and validate it
            const authHeader = req.headers.authorization;
            if (!authHeader || authHeader !== "Bearer YOUR_TEST_TOKEN") {
            return res.status(401).json({
                success: false,
                error: {
                code: "UNAUTHORIZED",
                message: "Authorization token is required or invalid.",
                },
            });
        }

        // Parse the request body
        const { GroupName } = req.body;

        // Validation: Check if GroupName is provided
        if (!GroupName || GroupName.trim() === "") {
            return res.status(400).json({
                success: false,
                error: {
                code: "VALIDATION_ERROR",
                message: "Invalid request data",
                details: {
                    GroupName: "Group name is required and must be unique.",
                },
                },
            });
        }

        // Validation: Check if the group name already exists
        const isDuplicate = mockGroups.some(
            (group) => group.GroupName.toLowerCase() === GroupName.toLowerCase()
        );
        if (isDuplicate) {
            return res.status(409).json({
                success: false,
                error: {
                code: "DUPLICATE_GROUP_NAME",
                message: "A group with this name already exists.",
                },
            });
        }

        // Create the new group
        const newGroup = {
            id: mockGroups.length + 1,
            GroupName: GroupName.trim(),
            owner_id: 1, // Mocked owner_id for the current user
        };
        mockGroups.push(newGroup);

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            group: newGroup,
        });
    }

    // For unsupported methods
    return res.status(405).json({
        success: false,
        message: "Method not allowed. Use POST.",
    });
}