import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_AUTHENTICATION;

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(`${backendUrl}/logout`, {}, { withCredentials: true });
        setIsLoading(false);

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
        alert('Logout failed: ' + error.message);
      }
    }
    handleLogout();
  }, [navigate]);

  return (
    <div>
      {isLoading ? (
        <>
          <h2>Logging out...</h2>
          <p>Please wait...</p>
        </>
      ) : (<h2>Redirecting to login...</h2>)}
    </div>
  )
}

export default Logout
