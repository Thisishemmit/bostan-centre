function BoxA() {
    return (
        <div className="h-full p-3 w-[33%]">
            <div className="h-full w-full rounded-[30px] bg-sky-100">

            </div>
        </div>
    )
}

function BoxB() {
    return (
        <div className="h-full p-3 w-[23%]">
            <div className="h-full w-full rounded-[30px] bg-lavender-200">
            </div>
        </div>
    )
}

function BoxC() {
    return (
        <div className="h-full p-3 w-[23%]">
            <div className="h-full w-full  rounded-[30px] bg-honeydew-200">
            </div>
        </div>
    )
}

function BoxD() {
    return (
        <div className="h-full p-3 w-[23%]">
            <div className="h-full w-full  rounded-[30px] bg-beige-200">
            </div>
        </div>
    )
}
function Dashboard() {
    return (
        <div className='w-full h-full p-3 flex flex-col px-6 gap-9'>
            <div className="flex flex-col justify-start px-3 items-start">
                <h1 className='text-7xl metro-bold'>Accueil</h1>
            </div>
            <div className="flex h-56 justify-between items-center flex-row w-full">
                <BoxA />
                <BoxB />
                <BoxC />
                <BoxD />
            </div>

            <div className="flex flex-row justify-between px-3 items-center w-full h-full">
                <div className="flex justify-between w-3/5 h-full bg-red-100 rounded-[30px]">
                </div>
                <div className="flex justify-between w-2/6 h-full bg-cyan-100 rounded-[30px]">
                </div>

            </div>
        </div>
    )
}

export default Dashboard

