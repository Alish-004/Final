function Dashboard() {
    return (
        <div style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
                Dashboard
            </h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                {/* Total Customers Card */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        padding: "1.5rem",
                    }}
                >
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#374151" }}>
                        Total Customers
                    </h3>
                    <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginTop: "0.5rem" }}>
                        1,234
                    </p>
                </div>

                {/* Total Vehicles Card */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        padding: "1.5rem",
                    }}
                >
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#374151" }}>
                        Total Vehicles
                    </h3>
                    <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginTop: "0.5rem" }}>
                        567
                    </p>
                </div>

                {/* Total Revenue Card */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        padding: "1.5rem",
                    }}
                >
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#374151" }}>
                        Total Revenue
                    </h3>
                    <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginTop: "0.5rem" }}>
                        $123,456
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;