import Link from "next/link"
import styles from "@/styles/index.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate user authentication check
  useEffect(() => {
    const checkAuth = async () => {
      // Replace this with your real authentication logic
      const token = localStorage.getItem("authToken"); // Example: Check token in localStorage
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>ToDoWhat</h1>
        <div className={styles.authButtons}>
          {isLoggedIn ? (
            // User menu when logged in
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="userMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Account
              </button>
              <ul className="dropdown-menu" aria-labelledby="userMenu">
                <li>
                  <Link href="/profile" passHref>
                    <a className="dropdown-item">Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" passHref>
                    <a className="dropdown-item">Settings</a>
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.removeItem("authToken"); // Clear token
                      setIsLoggedIn(false); // Update state
                    }}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Log In and Sign Up buttons when not logged in
            <>
              <Link href="/login" passHref>
                <button type="button" className="btn btn-outline-primary me-2">
                  Log In
                </button>
              </Link>
              <Link href="/register" passHref>
                <button type="button" className="btn btn-primary">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className={`${styles.main} text-center`}>
        <h2>Welcome to ToDoWhat</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          luctus suscipit ex, in posuere magna scelerisque ac. Sed auctor orci
          ut odio ultricies, id dignissim lectus viverra. Nam interdum tempor
          libero. Curabitur pulvinar orci et sapien dignissim facilisis.
        </p>
        <p>
          Nulla quis libero at arcu vehicula pharetra non vel metus. Donec
          faucibus purus a sem fermentum varius. Praesent tincidunt eros
          vulputate augue bibendum, ut fermentum metus dignissim.
        </p>
        <Link href="/todos" passHref>
          <button type="button" className="btn btn-success mt-3">
            Go to my list
          </button>
        </Link>
      </main>
    </div>
  );
}
