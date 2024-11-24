import Image from "next/image";
import Link from "next/link";

const UserDropdown = ({ username, onLogout }) => {
  return (
    <div className="dropdown">
      {/* Dropdown toggle */}
      <a
        className="btn btn-primary dropdown-toggle d-flex align-items-center"
        role="button"
        href="#"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Image
          src="/assets/User.png"
          width={24}
          height={24}
          alt="User Avatar"
          className="me-2"
        />
        <span>{username}</span>
      </a>

      {/* Dropdown menu */}
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link href="/reset-password" className="dropdown-item">
            Change Password
          </Link>
        </li>
        <li>
          <button
            className="dropdown-item text-danger"
            onClick={onLogout}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;