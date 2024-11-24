import TodoTable from "@/components/TodoTable";
import DashboardLayout from "@/components/DashboardLayout";


export default function TodosPage() {
  return (
    <div>
      <h2>My Todo List</h2>
      <TodoTable mode="private" />
    </div>
  );
}

TodosPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};