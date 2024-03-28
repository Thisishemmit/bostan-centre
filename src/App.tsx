import { useState } from "react"
import Login from "./Comps/Login/Login"
import Dashboard from "./Comps/Dashboard/Dashboard"
import Settings from "./Comps/Settings/Settings"
import Students from "./Comps/Students/Students"
import Divisions from "./Comps/Divisions/Divisions"
import Payments from "./Comps/Payments/Payments"
import Search from "./Comps/Search/Search"
import Sidebar from "./Comps/Sidebar/Sidebar"

function App() {
    const [isLogged, setIsLogged] = useState(false)

    const handleLoginStatus = (status: boolean) => {
        setIsLogged(status)
    }
    const [pageLoaded, setPageLoaded] = useState("Dashboard")
    const [isMaximized, setIsMaximized] = useState(false)
    const handlePageChoosen = (page: string) => {
        setPageLoaded(page)
    }

    const handleMaximize = (status: boolean) => {
        setIsMaximized(status)
    }

    const handleF11 = () => {
        document.addEventListener("keydown", (e) => {
            if (e.code === "F11"){

            }
        })
    }

    handleF11()

    return (
        <div className={`w-screen h-screen bag-dark p-4 pl-0 overflow-hidden ${!isMaximized ? "rounded-[46px]" : "rounded-[0px]"}`}>
            {!isLogged ? (
                <div className="w-full h-full bag-light overflow-hidden">
                    <Login onLoginStateChange={handleLoginStatus} />
                </div>
            ) : (
                <div className="w-full h-full overflow-hidden flex justify-center items-center">
                    <div className="w-24 h-full bag-dark flex justify-between items-center">
                        <Sidebar onbarPageChange={handlePageChoosen}
                        onMaxChange={handleMaximize}
                        />
                    </div>
                    <div className="w-full h-full p-2 rounded-[30px] bag-light">
                        {pageLoaded === "Dashboard" && <Dashboard />}
                        {pageLoaded === "Settings" && <Settings />}
                        {pageLoaded === "Students" && <Students />}
                        {pageLoaded === "Divisions" && <Divisions />}
                        {pageLoaded === "Payments" && <Payments />}
                        {pageLoaded === "Search" && <Search />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
