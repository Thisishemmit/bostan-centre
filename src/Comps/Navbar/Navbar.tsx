import { useState } from "react"

const Navbar = ({ onNavbarPageChange }: { onNavbarPageChange: (state: string) => void }) => {
    const btnStyle = "rounded-[16px] p-2 w-[12.5%] bag-accent color-black "
    const activeBtnStyle = " bag-light " + btnStyle + " w-[17%] text-xl color-black "
    const [activePage, setActivePage] = useState("Dashboard")

    const handlePageChange = (page: string) => {
        setActivePage(page)
        console.log(activePage, page);

        onNavbarPageChange(page)
    }

    return (
        <div className="w-full h-full flex justify-between items-end">
            <div className="flex bg-cyan-500 overflow-hidden w-[20%] h-full justify-between items-end">
                <button>Minimize</button>
                <button>Maximize</button>
                <button>Close</button>
            </div>
            <div className="flex w-[80%] h-full justify-around items-end">
                <button className={activePage === "Dashboard" ? activeBtnStyle + " mx-3" : btnStyle + " text-lg color-accent"}
                    onClick={() => handlePageChange("Dashboard")}>Analyse</button>
                <button className={activePage === "Students" ? activeBtnStyle : btnStyle}
                onClick={() => handlePageChange("Students")}>Étudiants</button>
                <button className={activePage === "Divisions" ? activeBtnStyle : btnStyle}
                onClick={() => handlePageChange("Divisions")}>Divisions</button>
                <button className={activePage === "Subjects" ? activeBtnStyle : btnStyle}
                onClick={() => handlePageChange("Subjects")}>Sujets</button>
                <button className={activePage === "Payments" ? activeBtnStyle : btnStyle}
                onClick={() => handlePageChange("Payments")}>Paiements</button>
                <button className={activePage === "Search" ? activeBtnStyle : btnStyle}
                onClick={() => handlePageChange("Search")}>Rechercher</button>
                <button className={activePage === "Settings" ? activeBtnStyle : btnStyle}
                onClick={() => handlePageChange("Settings")} >Paramètres</button>
            </div>
        </div>
    )

}

export default Navbar

// Path: Navbarr.module.css
