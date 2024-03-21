import { useEffect, useState } from "react"
import { AdminI, addAdmin, db, getAdmin } from "../../Database/Database";
await db.connect()
const ad: Omit<AdminI, 'id'> = {
  name: "admin",
  password: "admin"
}
await db.createTables()
await addAdmin(ad)
const Login = ({onLoginStateChange}: {onLoginStateChange: (state: boolean) => void}) => {
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUsername(storedUserName)
      setIsNewUser(false)
      onLoginStateChange(true)
    }
  }, [onLoginStateChange])

  const handleLogin = async () => {
    try {
      const admin: AdminI[] | null = await getAdmin(username);
      if (admin && admin[0].password === passwd) {
        localStorage.setItem('username', username);
        setErrorMsg('');
        onLoginStateChange(true);

      } else {
        if (admin && admin[0].password !== passwd) {
          setErrorMsg('Incorrect Password');
        } else {
          setErrorMsg('Invalid username')
        }
      }
    } catch (error) {
      console.error('Error logging in', error);
      setErrorMsg("An error occurred during login")
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#ebeff0]">
      <div className="h-[70%] w-1/2 px-11 bg-[#fefefe] drop-shadow-xl flex-col rounded-3xl flex items-end justify-center">
        <h1 className="h-11 text-3xl">الدخول</h1>
        <div className="w-full h-1/2 my-11 rounded-2xl bg-[#ebeff0] flex flex-col justify-center items-center">
          { isNewUser ? (
            <div>
              <input type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
              <input type="password"
              placeholder="Password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)} />
              <button onClick={handleLogin}>ادخل</button>
            </div>
          ) : (
            <div>
              <input type="password"
              placeholder="Password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)} />
              <button onClick={handleLogin}>ادخل</button>
            </div>
          )
        }
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login