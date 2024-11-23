import SideBar from "@/components/SideBar";
import TodoTable from "@/components/TodoTable";
import UserDropdown from "@/components/UserDropdown";

import Link from "next/link"
import styles from "@/styles/index.module.css"
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  // Mock data for demonstration purposes
  const todos = [
    { id: 1, name: 'Complete Project', category: 'Work', deadline: '2024-11-25', status: 'In Progress', user: 'Liyingxuan' },
    { id: 2, name: 'Buy Groceries', category: 'Personal', deadline: '2024-11-24', status: 'Pending', user: 'Liyingxuan' },
  ]

  // Mock data for user dropdown
  const user = {id: 1, username: "Yingxuan", email: "liyx@example.com",
  }

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>ToDoWhat</h1>
        <div className={styles.userDropdown}>
          <UserDropdown username={user.username} />
        </div>
      </header>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <SideBar />
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.todoHeader}>
          <h2>My Todo List</h2>
        </div>
        <TodoTable mode="private" />
      </main>
    </div>
  );
}
