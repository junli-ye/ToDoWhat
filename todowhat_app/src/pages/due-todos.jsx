import { useEffect, useState } from "react";
import TodoTable from "@/components/TodoTable";
import DashboardLayout from "@/components/DashboardLayout";

export default function TodosPage() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const res = await fetch("/api/todos", {
            method: "GET",
            headers: {
              Authorization: "Bearer YOUR_TEST_TOKEN", // Mock Authorization token
            },
          });
  
          const data = await res.json();
  
          if (data.success) {
            // Filter tasks with a deadline in the past or next 24 hours
            const now = new Date();
            const filteredTodos = data.todos.filter((todo) => {
            const deadline = new Date(todo.deadline);
            return (
                deadline < new Date(now.getTime() + 24 * 60 * 60 * 1000) &&
                deadline > now
            );
          });
          setTodos(filteredTodos);
          } else {
            throw new Error(data.error.message || "Failed to fetch todos.");
          }
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchTodos();
    }, []);
  
    return (
      <div>
        <h2>Due Today</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <TodoTable mode="private" todos={todos} />
        )}
      </div>
    );
  }
  

TodosPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};