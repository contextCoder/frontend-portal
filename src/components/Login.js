import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_AUTHENTICATION;

const Login = () => {
  const [error, setError] = React.useState('')
  const [formdata, setFormdata] = React.useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault()
    const requestObject = {
      method: 'POST',
      url: `${backendUrl}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        email: formdata.email,
        password: formdata.password
      }),
      withCredentials: true
    }

    console.log("requestObject", requestObject);
    try {
      const response = await axios(requestObject);
      console.log('response', response);
      if (response.status === 200) {
        const data = response.data;
        if (data.status === 'success') {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  const handleSignIn = async () => {
    navigate('/signin');
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" required value={formdata.email} placeholder='Enter Your Email' onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required value={formdata.password} placeholder='Enter Your Password' onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} />
        </div>
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default Login
