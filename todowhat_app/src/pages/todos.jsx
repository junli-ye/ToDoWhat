import TodoTable from "@/components/TodoTable";

export default function TodosPage() {
  return (
    <div>
      <h2>My Todo List</h2>
      <TodoTable mode="private" />
    </div>
  );
}

TodosPage.getLayout = function getLayout(page) {
  const DashboardLayout = require("@/components/DashboardLayout").default;
  return <DashboardLayout>{page}</DashboardLayout>;
};