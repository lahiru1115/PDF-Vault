import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../api/AuthAPI';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await login(values);
            localStorage.setItem('token', res.data.token);
            sessionStorage.setItem('name', res.data.user.name);
            notification.success({
                message: res.data.message,
            });
            navigate('/listpdfs');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                message.error(err.response.data.message);
            } else {
                message.error('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 100 }}>
            <Title level={2}>Login</Title>
            <Form
                name="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <Text>Don't have an account? <Link to="/signup">Sign up</Link></Text>
        </div>
    );
};

export default Login;
