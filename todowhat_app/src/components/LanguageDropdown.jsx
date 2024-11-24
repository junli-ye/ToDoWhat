import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    
    <div className="dropdown">
      {/* Dropdown toggle */}
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        🌍
      </button>

      {/* Dropdown menu */}
      <ul className="dropdown-menu" aria-labelledby="languageDropdown">
        <li>
          <button
            className="dropdown-item"
            onClick={() => changeLanguage("en")}
          >
            🇬🇧 English
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => changeLanguage("fr")}
          >
            🇫🇷 Français
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => changeLanguage("zh")}
          >
            🇨🇳 中文
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageDropdown;