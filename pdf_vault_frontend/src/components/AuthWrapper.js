import React from 'react';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PageWrapper from './PageWrapper';

const AuthWrapper = ({ isAuthenticated, modalVisible, handleOk, handleCancel, children }) => {
    return (
        <>
            {isAuthenticated === null ? (
                <>
                    <PageWrapper>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spin indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />} />
                        </div>
                    </PageWrapper>
                </>
            ) : (
                <>
                    {isAuthenticated ? (
                        children
                    ) : (
                        <>
                            <PageWrapper>
                                <Modal
                                    title="Authentication Required"
                                    open={modalVisible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="Login"
                                    cancelText="Cancel"
                                >
                                    <p>You need to be logged in to access this page. Please log in or cancel to go back.</p>
                                </Modal>
                            </PageWrapper>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default AuthWrapper;
