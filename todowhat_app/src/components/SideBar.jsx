import Link from "next/link"
import { useEffect, useState } from "react"

const SideBar = () => {
// State to store counts for permanent items
const [counts, setCounts] = useState({
    myList: 0,
    assignedToMe: 0,
    dueToday: 0,
});

// Mock data for dynamic groups
const mockDynamicGroups = [
    { id: 1, name: "Team Alpha", count: 4, link: "/group/1" },
    { id: 2, name: "Project Beta", count: 7, link: "/group/2" },
];

// Fetch data for permanent items from APIs
useEffect(() => {
const fetchCounts = async () => {
    try {
    const [myListRes, assignedRes, dueRes] = await Promise.all([
        fetch("/todos"),
        fetch("/assignedtodos"),
        fetch("/duetodos"),
    ]);

    const [myListData, assignedData, dueData] = await Promise.all([
        myListRes.json(),
        assignedRes.json(),
        dueRes.json(),
    ]);

    setCounts({
        myList: myListData.length || 0,
        assignedToMe: assignedData.length || 0,
        dueToday: dueData.length || 0,
    });
    } catch (error) {
    console.error("Failed to fetch counts:", error);
    }
};

    fetchCounts();
}, []);

return (
    <div className="p-3 bg-light border-end vh-100">
      {/* Permanent Items */}
      <h6 className="text-uppercase fw-bold mb-3">My lists</h6>

      <div className="mb-4">
        <Link href="/my-list" passHref>
          <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
            <span className="fw-semibold">My List</span>
            <span className="badge bg-primary rounded-pill">{counts.myList}</span>
          </div>
        </Link>

        <Link href="/assigned-to-me" passHref>
          <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
            <span className="fw-semibold">Assigned to Me</span>
            <span className="badge bg-secondary rounded-pill">{counts.assignedToMe}</span>
          </div>
        </Link>

        <Link href="/due-today" passHref>
          <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
            <span className="fw-semibold">Due Today</span>
            <span className="badge bg-danger rounded-pill">{counts.dueToday}</span>
          </div>
        </Link>
      </div>

      {/* Dynamic Groups */}
      <div>
        <h6 className="text-uppercase fw-bold mb-3">My Groups</h6>
        {mockDynamicGroups.map((group) => (
          <Link key={group.id} href={`/groups/:${group.id}/todos`} passHref>
            <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white shadow-sm">
              <span className="fw-semibold">{group.name}</span>
              <span className="badge bg-secondary rounded-pill">{group.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar