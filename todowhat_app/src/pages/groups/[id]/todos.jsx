import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TodoTable from "@/components/TodoTable";

export default function GroupTodosPage() {
  const router = useRouter();
  const { id } = router.query; // 从路由中获取 groupId
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return; // 如果没有 groupId，不发出请求

    const fetchGroupTodos = async () => {
      try {
        const res = await fetch(`/api/groups/${id}/todos`, {
          method: "GET",
          headers: {
            Authorization: "Bearer YOUR_TEST_TOKEN", // 模拟 Authorization token
          },
        });

        const data = await res.json();

        if (data.success) {
          setTodos(data.todos);
        } else {
          throw new Error(data.error.message || "Failed to fetch group todos.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGroupTodos();
  }, [id]);

  return (
    <div>
      <h2>{id ? `Group ${id} - Todos` : "Loading Group Todos..."}</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <TodoTable mode="group" todos={todos} />
      )}
    </div>
  );
}

GroupTodosPage.getLayout = function getLayout(page) {
  const DashboardLayout = require("@/components/DashboardLayout").default;
  return <DashboardLayout>{page}</DashboardLayout>;
};