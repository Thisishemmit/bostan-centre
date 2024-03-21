import { useState } from "react"
import Login from "./Comps/Login/Login"
import Navbar from "./Comps/Navbar/Navbar"
import Dashboard from "./Comps/Dashboard/Dashboard"
import Settings from "./Comps/Settings/Settings"
import Students from "./Comps/Students/Students"
import Divisions from "./Comps/Divisions/Divisions"
import Subjects from "./Comps/Subjects/Subjects"
import Payments from "./Comps/Payments/Payments"
import Search from "./Comps/Search/Search"

function App() {
    const [isLogged, setIsLogged] = useState(false)

    const handleLoginStatus = (status: boolean) => {
        setIsLogged(status)
    }

    const handleLogout = () => {
        localStorage.removeItem("username")
        setIsLogged(false)
    }

    const [pageLoaded, setPageLoaded] = useState("Dashboard")

    const handlePageChoosen = (page: string) => {
        setPageLoaded(page)
    }

    return (
        <div className="w-screen h-screen rounded-[64px] bag-accent p-2 overflow-hidden">
            {!isLogged ? (
                <div className="w-full h-full bag-light rounded-[56px] overflow-hidden">
                    <Login onLoginStateChange={handleLoginStatus} />
                </div>
            ) : (
                <div className="w-full h-full bag-light rounded-[56px] overflow-hidden">
                    <div className="w-full h-16 bag-accent flex justify-between items-center p-2">
                        <Navbar onNavbarPageChange={handlePageChoosen} />
                    </div>
                    <div className="w-full h-full p-2">
                        {pageLoaded === "Dashboard" && <Dashboard />}
                        {pageLoaded === "Settings" && <Settings onLogout={handleLogout} />}
                        {pageLoaded === "Students" && <Students />}
                        {pageLoaded === "Divisions" && <Divisions />}
                        {pageLoaded === "Subjects" && <Subjects />}
                        {pageLoaded === "Payments" && <Payments />}
                        {pageLoaded === "Search" && <Search />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
