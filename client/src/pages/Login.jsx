import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';

import { useAuth } from '../contexts/AuthContext';

const LoginRegister = () => {
  console.log("entered login page");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const url = isLogin ? `${process.env.REACT_APP_API_URL}/login` : `${process.env.REACT_APP_API_URL}/register`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log("result>", result);
      if (response.ok) {
        message.success(isLogin ? 'Login successful!' : 'Registration successful!');
        setUser(result.user);
        navigate('/');
      } else {
        message.error(result.message || 'Something went wrong!');
      }
    } catch (error) {
      message.error('Network error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={isLogin ? 'Login' : 'Register'} style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        {!isLogin && (
          <>
            <Form.Item name="confirmPassword" dependencies={['password']} rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}>
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => setIsLogin(!isLogin)} block>
            {isLogin ? 'Register now!' : 'Back to login'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginRegister;