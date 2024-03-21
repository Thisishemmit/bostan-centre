
const Settings = ({onLogout}: {onLogout: (status: boolean) => void}) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-1/2 bg-accent rounded-3xl flex flex-col justify-center items-center">
                <h1 className="text-3xl">الاعدادات</h1>
                <button onClick={() => onLogout(false)}>تسجيل الخروج</button>
            </div>
        </div>
    )
}

export default Settings
