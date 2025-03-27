import { Outlet, Link } from "react-router-dom";
import { FaUsers, FaCar, FaCog, FaTachometerAlt, FaHistory } from "react-icons/fa";

function Admin() {
    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#f3f4f6" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Header */}
                <header style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", padding: "1rem" }}>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Admin Dashboard</h1>
                </header>

                {/* Page Content */}
                <main style={{ flex: 1, overflowX: "hidden", overflowY: "auto", backgroundColor: "#e5e7eb", padding: "1rem" }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function Sidebar() {
    return (
        <div style={{ width: "16rem", backgroundColor: "#1f2937", color: "#ffffff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "1rem", fontSize: "1.5rem", fontWeight: "600" }}>
                Car Rental Admin
            </div>
            <nav style={{ flex: 1, marginTop: "1rem" }}>
                <Link
                    to="/admin/dashboard"
                    style={{ display: "flex", alignItems: "center", padding: "0.75rem", color: "#ffffff", textDecoration: "none", transition: "background-color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <FaTachometerAlt style={{ marginRight: "0.75rem" }} />
                    Dashboard
                </Link>
                <Link
                    to="/admin/customers"
                    style={{ display: "flex", alignItems: "center", padding: "0.75rem", color: "#ffffff", textDecoration: "none", transition: "background-color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <FaUsers style={{ marginRight: "0.75rem" }} />
                    Customers
                </Link>
                <Link
                    to="/admin/vehicles"
                    style={{ display: "flex", alignItems: "center", padding: "0.75rem", color: "#ffffff", textDecoration: "none", transition: "background-color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <FaCar style={{ marginRight: "0.75rem" }} />
                    Vehicles
                </Link>
                <Link
                    to="/admin/payment-history"
                    style={{ display: "flex", alignItems: "center", padding: "0.75rem", color: "#ffffff", textDecoration: "none", transition: "background-color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <FaHistory style={{ marginRight: "0.75rem" }} />
                    Payment History
                </Link>
                <Link
                    to="/admin/settings"
                    style={{ display: "flex", alignItems: "center", padding: "0.75rem", color: "#ffffff", textDecoration: "none", transition: "background-color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <FaCog style={{ marginRight: "0.75rem" }} />
                    Settings
                </Link>
            </nav>
        </div>
    );
}

export default Admin;