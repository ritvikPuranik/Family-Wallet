import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {Container, Card, Form, Button} from 'react-bootstrap';

function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
      try {
        let requestOptions = {
            method: "POST", 
            body: JSON.stringify({ username, password }),
            redirec: true
        }
        let response = await fetch('http://localhost:3000/login', requestOptions);
        console.log("response>", response);
        response = await response.json();
        console.log("response json>", response);
        if(response){
            setError('');
            localStorage.setItem('isLoggedIn', true);
            navigate('/');
        }

      } catch (error) {
        console.error('Login error:', error);
        setError(error.response.data.message);
      }
    };
  
    return (
      <Container className="mt-5">
      <Card style={{ maxWidth: '400px', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className="text-center m-4 fs-2">Login</Card.Title>
          <Form>
            <Form.Group className="m-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="m-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" className="m-3" type="button" onClick={handleLogin} block>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    );

}

export default Login;

