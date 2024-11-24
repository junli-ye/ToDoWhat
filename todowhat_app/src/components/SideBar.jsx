import Link from "next/link"
import { useEffect, useState } from "react"

const SideBar = () => {
    // State to store counts and groups
    const [data, setData] = useState({
    Private: {
        myList: 0,
        assignedToMe: 0,
        dueToday: 0,
    },
    Group: [],
    });
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false); // Track if "Create Group" is active
    const [newGroupName, setNewGroupName] = useState(""); // New group name input

    // Fetch data for sidebar
    useEffect(() => {
        const fetchSidebarData = async () => {
        try {
            const res = await fetch("/api/lists", {
            headers: { Authorization: "Bearer YOUR_TEST_TOKEN" },
            });

            if (!res.ok) {
            throw new Error("Failed to fetch sidebar data.");
            }

            const result = await res.json();

            if (result.success) {
                setData(result);
            } else {
                console.error("API Error:", result.message);
            }
        } catch (error) {
            console.error("Failed to fetch sidebar data:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchSidebarData();
    }, []);

    const { Private, Group } = data;

    // Handle group creation
    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) {
            alert("Group name cannot be empty.");
            return;
        }

        try {
            const res = await fetch("/api/groups/new", {
                method: "POST",
                headers: {
                Authorization: "Bearer YOUR_TEST_TOKEN",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ GroupName: newGroupName }),
        });

        const result = await res.json();

        if (res.ok && result.success) {
            // Add new group to the Group list
            setData((prevData) => ({
            ...prevData,
            Group: [...prevData.Group, result.group],
            }));

            setNewGroupName(""); // Clear input
            setIsCreating(false); // Reset to "Create Group" button
        } else {
            alert(result.error.message || "Failed to create group.");
        }
        } catch (error) {
        console.error("Failed to create group:", error);
        alert("An error occurred while creating the group.");
        }
    };

    return (
        <div className="p-3 bg-light border-end vh-100">
          {/* Permanent Items */}
          <h6 className="text-uppercase fw-bold mb-3">My Lists</h6>
          <div className="mb-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <Link href="/todos" passHref>
                  <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
                    <span className="fw-semibold">My List</span>
                    <span className="badge bg-primary rounded-pill">{Private.myList}</span>
                  </div>
                </Link>
    
                <Link href="/assigned-to-me" passHref>
                  <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
                    <span className="fw-semibold">Assigned to Me</span>
                    <span className="badge bg-secondary rounded-pill">{Private.assignedToMe}</span>
                  </div>
                </Link>
    
                <Link href="/due-todos" passHref>
                  <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
                    <span className="fw-semibold">Due Today</span>
                    <span className="badge bg-danger rounded-pill">{Private.dueToday}</span>
                  </div>
                </Link>
              </>
            )}
          </div>
    
          {/* Dynamic Groups */}
          <div>
            <h6 className="text-uppercase fw-bold mb-3">My Groups</h6>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {Group.map((group) => (
                  <Link key={group.id} href={`/groups/${group.id}/todos`} passHref>
                    <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
                      <span className="fw-semibold">{group.name}</span>
                      <span className="badge bg-secondary rounded-pill">{group.count}</span>
                    </div>
                  </Link>
                ))}
    
                {/* Create Group */}
                <div className="mt-3">
                  {isCreating ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter group name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreateGroup();
                      }}
                      onBlur={() => setIsCreating(false)} // Reset to button if input loses focus
                    />
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                      onClick={() => setIsCreating(true)}
                    >
                      Create Group
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      );
};

export default SideBar