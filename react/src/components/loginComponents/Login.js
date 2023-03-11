import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.post('api/login', {
        username,
        password,
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
      });
      props.getToken(response.data["token"]);
      props.getUserId(response.data["user_id"]);
      console.log("id", response.data["user_id"])
      if (response.data){
        props.setAuthenticated(true)
      }
    } catch (error) {
      console.error(error);
      setError('Invalid credentials');
    }
  }

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
  }


  return (<div>
    <h2>Paul's Panels Limited</h2>
    
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  </div>)
}

export default Login;
