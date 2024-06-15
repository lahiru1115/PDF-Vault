import React from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';

const { Content } = Layout;

const PageWrapper = ({ children, username }) => {
    return (
        <Layout>
            <Navbar username={username} />
            <Content style={{ padding: '50px', backgroundColor: '#ffffff' }}>
                {children}
            </Content>
        </Layout>
    );
};

export default PageWrapper;
