import SideBar from "@/components/SideBar";
import UserDropdown from "@/components/UserDropdown";
import styles from "@/styles/DashboardLayout.module.css";

export default function DashboardLayout({ children }) {
  // Mock user data
  const user = { id: 1, username: "Yingxuan", email: "liyx@example.com" };

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

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}