import { useState } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="header">
      <div className="logo-container">
        <img src="/assets/logo.png" alt="asdf" />
      </div>
      <nav className="header-link">
        <Link
          id={activeTab === "trade" ? "active" : ""}
          to="/trade"
          onClick={() => setActiveTab("trade")}
        >
          Trade
        </Link>
        <Link
          id={activeTab === "earn" ? "active" : ""}
          onClick={() => setActiveTab("earn")}
          to="/"
        >
          Earn
        </Link>

        <Link
          id={activeTab === "support" ? "active" : ""}
          onClick={() => setActiveTab("support")}
          to="/"
        >
          Support
        </Link>

        <Link
          id={activeTab === "About" ? "active" : ""}
          onClick={() => setActiveTab("About")}
          to="/"
        >
          About
        </Link>
      </nav>

      <button className="header-btn">Connect wallet</button>
    </div>
  );
}
