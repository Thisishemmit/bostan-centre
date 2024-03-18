import { useState } from "react"
import { AdminI, getAdmin } from "../../Database/Database";

const Login = ({onLoginStateChange}) => {
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
      const admin: AdminI = await getAdmin(username);
    }
  }
  
}

export default Login