import SideBar from "@/components/SideBar";
import TodoTable from "@/components/TodoTable";
import UserDropdown from "@/components/UserDropdown";
import Link from "next/link"
import { sidebar, buttons } from "@/styles/SideBar.module.css"
import { homepage, todolist, dropdown } from "@/styles/index.module.css"

export default function Home() {
  const todos = [
    { id: 1, name: 'Complete Project', category: 'Work', deadline: '2024-11-25', status: 'In Progress', user: 'Liyingxuan' },
    { id: 2, name: 'Buy Groceries', category: 'Personal', deadline: '2024-11-24', status: 'Pending', user: 'Liyingxuan' },
]
  return (
    <div className={homepage}>
      <SideBar></SideBar>
      <div className={todolist}>
        <div className={dropdown}>
          <UserDropdown username="LI Yingxuan"></UserDropdown>
        </div>
        <h1>My Todo List</h1>
        <Link href="/TodoPage">
            <button type="button" className={`btn btn-outline-primary ${buttons}`}>Add Todo</button>
        </Link>
        <TodoTable todos={todos}></TodoTable>
      </div>
    </div>
  );
}
