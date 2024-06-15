import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/AuthAPI';
import AuthWrapper from './AuthWrapper';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getUser();

                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    throw new Error('Unauthorized');
                }
            } catch (err) {
                setIsAuthenticated(false);
                setModalVisible(true);
            }
        };

        checkAuth();
    }, []);

    const handleOk = () => {
        setModalVisible(false);
        navigate('/login');
    };

    const handleCancel = () => {
        setModalVisible(false);
        setIsAuthenticated(null);
    };

    return (
        <AuthWrapper
            isAuthenticated={isAuthenticated}
            modalVisible={modalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
        >
            {children}
        </AuthWrapper>
    );
};

export default PrivateRoute;
