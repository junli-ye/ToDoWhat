import SideBar from "@/components/SideBar";
import UserDropdown from "@/components/UserDropdown";
import styles from "@/styles/Dashboard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";

export default function DashboardLayout({ children }) {
  // Mock user data
  const user = { id: 1, username: "Yingxuan", email: "liyx@example.com" };
  const { t } = useTranslation(); // Hook for translations

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>😼{t("ToDoWhat")}</h1>
        <div className={styles.userControls}>
          <UserDropdown username={user.username} />
          <LanguageDropdown />
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