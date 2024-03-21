const Navbar = ({ onNavbarPageChange }: { onNavbarPageChange: (state: string) => void }) => {
    return (
        <div className="w-full h-full flex justify-between items-center">
            <div className="flex w-[20%] justify-between items-center">
                <button>Minimize</button>
                <button>Maximize</button>
                <button>Close</button>
            </div>
            <div className="flex w-{80%} bg-red-300 h-full justify-between items-center">
                <button onClick={() => onNavbarPageChange("Dashboard")}>Dashboard</button>
                <button onClick={() => onNavbarPageChange("Settings")}>Settings</button>
                <button onClick={() => onNavbarPageChange("Students")}>Students</button>
                <button onClick={() => onNavbarPageChange("Divisions")}>Divisions</button>
                <button onClick={() => onNavbarPageChange("Subjects")}>Subjects</button>
                <button onClick={() => onNavbarPageChange("Payments")}>Payments</button>
                <button onClick={() => onNavbarPageChange("Search")}>Search</button>
            </div>
        </div>
    )

}

export default Navbar
