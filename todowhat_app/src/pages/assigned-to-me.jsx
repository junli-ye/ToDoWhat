import TodoTable from "@/components/TodoTable";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AssignedToMePage() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAssignedTodos = async () => {
          try {
            const res = await fetch("/api/assignedTodos", {
              method: "GET",
              headers: {
                Authorization: "Bearer YOUR_TEST_TOKEN", // 模拟传递 Authorization token
              },
            });
    
            const data = await res.json();
    
            if (data.success) {
              setTodos(data.todos);
            } else {
              throw new Error(data.error.message || "Failed to fetch assigned todos.");
            }
          } catch (err) {
            setError(err.message);
          }
        };
    
        fetchAssignedTodos();
    }, []);
    

    return (
        <div>
            <h2>Assigned to Me</h2>
            {error ? (
            <div className="alert alert-danger">{error}</div>
            ) : (
            <TodoTable mode="assigned" todos={todos} />
            )}
        </div>
    );
}

AssignedToMePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};