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
                                    title="Your session has expired"
                                    open={modalVisible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="Login"
                                    cancelText="Cancel"
                                >
                                    <p>Please log in again to continue using the app.</p>
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
