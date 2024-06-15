import React from 'react';
import { Layout, Typography, Avatar, Dropdown, Menu, Button } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const name = sessionStorage.getItem('name') || 'User';

    const handleMenuClick = ({ key }) => {
        if (key === 'profile') {
            navigate('/profile');
        } else if (key === 'logout') {
            localStorage.removeItem('token');
            sessionStorage.removeItem('name');
            navigate('/login');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
    );

    const showBackButton = location.pathname !== '/listpdfs';

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, #e6f7ff, #ffffff)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {showBackButton && <Button type="text" shape='circle' icon={<LeftOutlined />} onClick={() => navigate('/listpdfs')} />}
                <div style={{ marginLeft: 10 }} />
                <Title level={3} style={{ margin: 0 }}>Hello {name}</Title>
            </div>
            <Dropdown overlay={menu} placement='bottomRight' trigger={['click']} >
                <Button type="text" shape='circle' size='large' icon={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />} />
            </Dropdown>
        </Header>
    );
};

export default Navbar;
