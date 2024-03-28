import { appWindow } from "@tauri-apps/api/window"
import { useState } from "react"
import { HiLogout,  } from "react-icons/hi"
import { HiMagnifyingGlass, HiOutlineBanknotes, HiOutlineCog6Tooth, HiOutlineSquares2X2, HiOutlineUserGroup } from "react-icons/hi2"
import { PiStudentLight } from "react-icons/pi"
const Sidebar = ({ onbarPageChange, onMaxChange }: {
    onbarPageChange: (state: string) => void;
    onMaxChange: (state: boolean) => void;
}) => {
    const [activePage, setActivePage] = useState("Dashboard")
    const iconsStyle = " w-9 h-9 sidebar-b  cursor-pointer transition-[padding_color] ease-in-out duration-150"
    const handleActivePage = async (page: string) => {
        if (page === "Exit") {
            await appWindow.close()
        }
        setActivePage(page)
        onbarPageChange(page)
    }
    const [isMaxed, setIsMaxed] = useState(false)
    const handleMaximize = (state: boolean) => {
        setIsMaxed(state)
        if (state === true) {
            appWindow.maximize()
        } else {
            appWindow.unmaximize()
        }
        onMaxChange(state)

    }
    //minimize -maximize
    const windowActions = ["démaximiser", "maximiser", "minimizer"]
    const pageNames = ["Accueil", "Étudiants", "Groupes", "Paiements", "Recherche", "Paramètres", "Sortie"]
    const iconDivStyle = " tooltipper cursor-pointer flex my-2 flex-col relative items-center justify-center w-full"

    return (
        <div className=" sidebar w-full h-full py-8  items-center flex flex-col justify-between ">
            <div className="relative flex justify-between items-center flex-col gap-4">
                <div className="tooltipper-hide tooltipper bg-green-300 rounded-3xl w-5 h-5 place-items-center">
                    <div className={iconsStyle + " p-1 h-full w-full color-black"} onClick={
                        () => appWindow.minimize()
                    } > </div>

                    <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-7 top-0"></div>
                    <div className="tooltip-hide tooltip">{windowActions[2]}</div>
                </div>
                <div className="tooltipper-max-min tooltipper bg-red-50 rounded-3xl w-5 h-5 place-items-center">

                    {isMaxed ? <>
                        <div className={iconsStyle + " p-1 w-full h-full color-black"}  onClick={
                            () => handleMaximize(false)
                        } ></div>
                        <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-7 top-0"></div>
                        <div className="tooltip-max-min tooltip">{windowActions[0]}</div>
                    </> : <>
                        <div className={iconsStyle + " p-1 h-full w-full color-black"} onClick={
                            () => handleMaximize(true)
                        }></div>
                        <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-7 top-0"></div>
                        <div className="tooltip-max-min tooltip">{windowActions[1]}</div>
                    </>}
                </div>
            </div>
            <div className="relative">
                <div className={iconDivStyle + " tooltipper-dash"}>
                    <HiOutlineSquares2X2 className={
                        iconsStyle + (activePage === "Dashboard" ? " color-accent-light p-1.5" : " color-accent p-2")} size={24} onClick={
                            () => handleActivePage("Dashboard")
                        } />
                    <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-10"></div>
                    <div className="tooltip-dash tooltip">{pageNames[0]}</div>
                </div>
                <div className={iconDivStyle + " tooltipper-stud"}>
                    <PiStudentLight className={"group/stud" +
                        iconsStyle + (activePage === "Students" ? " color-accent-light p-1.5" : " color-accent p-2")} size={24} onClick={
                            () => handleActivePage("Students")
                        } />
                    <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-10"></div>
                    <div className="tooltip-stud tooltip">{pageNames[1]}</div>
                </div>
                <div className={iconDivStyle + " tooltipper-divi"}>
                    <HiOutlineUserGroup className={"group/divi" +
                        iconsStyle + (activePage === "Divisions" ? " color-accent-light p-1.5" : " color-accent p-2")} size={24} onClick={
                            () => handleActivePage("Divisions")
                        } />
                    <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-10"></div>
                    <div className="tooltip-divi tooltip">{pageNames[2]}</div>
                </div>
                <div className={iconDivStyle + " tooltipper-paym"}>
                    <HiOutlineBanknotes className={"group/paym" +
                        iconsStyle + (activePage === "Payments" ? " color-accent-light p-1.5" : " color-accent p-2")} size={24} onClick={
                            () => handleActivePage("Payments")
                        } />
                    <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-10"></div>
                    <div className="tooltip-paym tooltip">{pageNames[3]}</div>
                </div>
                <div className={iconDivStyle + " tooltipper-sear"}>
                    <HiMagnifyingGlass className={"group/sear" +
                        iconsStyle + (activePage === "Search" ? " color-accent-light p-1.5" : " color-accent p-2")} size={24} onClick={
                            () => handleActivePage("Search")
                        } />
                    <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-10"></div>
                    <div className="tooltip-sear tooltip">{pageNames[4]}</div>
                </div>
                <div className={iconDivStyle + " tooltipper-sett"}>
                    <HiOutlineCog6Tooth className={"group/sett" +
                        iconsStyle + (activePage === "Settings" ? " color-accent-light p-1.5" : " color-accent p-2")} size={24} onClick={
                            () => handleActivePage("Settings")
                        } />
                    <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-10"></div>
                    <div className="tooltip-sett tooltip">{pageNames[5]}</div>
                </div>
                <div className={`h-9 w-1 -left-5 ${activePage === "Dashboard" ? "top-[0.5rem]" : activePage === "Students" ? "top-[3.25rem]" : activePage === "Divisions" ? "top-[6rem]" : activePage === "Payments" ? "top-[8.75rem]" : activePage === "Search" ? "top-[11.5rem]" : activePage === "Settings" ? "top-[14.25rem]" : " opacity-0 top-[22.5rem]"}
                    bg-red-50 rounded-full absolute transition-[top_opacity] duration-200 ease-in-out delay-100`}></div>
            </div>
            <div className={"tooltipper-exit tooltipper"}>
                <HiLogout className={iconsStyle + (activePage === "Exit" ? " p-2 color-accent-light" : " color-accent") + " rotate-180  p-2"} size={24} onClick={
                    () => handleActivePage("Exit")
                } />
                <div className="absolute h-full tooltip-cover w-5 bag-dark z-10 left-10"></div>
                <div className="tooltip-exit tooltip">{pageNames[6]}</div>
            </div>
        </div>
    )
}
export default Sidebar

