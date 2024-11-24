import TodoTable from "@/components/TodoTable";

export default function DueTodosPage() {
  return (
    <div>
      <h2>Urgent tasks</h2>
      <TodoTable mode="urgent" />
    </div>
  );
}

// 添加布局
DueTodosPage.getLayout = function getLayout(page) {
  const DashboardLayout = require("@/components/DashboardLayout").default;
  return <DashboardLayout>{page}</DashboardLayout>;
};