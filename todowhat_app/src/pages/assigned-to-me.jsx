import TodoTable from "@/components/TodoTable";

export default function AssignedToMePage() {
  return (
    <div>
      <h2>Assigned to Me</h2>
      <TodoTable mode="assigned" />
    </div>
  );
}

AssignedToMePage.getLayout = function getLayout(page) {
  const DashboardLayout = require("@/components/DashboardLayout").default;
  return <DashboardLayout>{page}</DashboardLayout>;
};