import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Input, Button, List, message } from 'antd';
import { SearchOutlined, UploadOutlined, FilePdfOutlined } from '@ant-design/icons';
import moment from 'moment';
import { listPdfs } from '../api/PdfAPI';
import PageWrapper from '../components/PageWrapper';
import AuthWrapper from '../components/AuthWrapper';

const { Title } = Typography;

const ListPdfs = () => {
    const [pdfs, setPdfs] = useState([]);
    const [filteredPdfs, setFilteredPdfs] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await listPdfs();
                if (res.status === 200) {
                    setPdfs(res.data);
                    setFilteredPdfs(res.data);
                } else {
                    message.error('Failed to fetch PDFs. Please try again.');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setIsAuthenticated(false);
                    setModalVisible(true);
                } else {
                    message.error('Something went wrong. Please try again.');
                }
            }
        };

        fetchData();
    }, [navigate]);

    const handleSearch = value => {
        const filtered = pdfs.filter(pdf => pdf.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredPdfs(filtered);
    };

    const handleInputChange = e => {
        const value = e.target.value;
        handleSearch(value);
    };

    const handleOk = () => {
        setIsAuthenticated(true);
        setModalVisible(false);
    };

    const handleCancel = () => {
        setIsAuthenticated(null);
        setModalVisible(false);
    };

    if (isAuthenticated === false || isAuthenticated === null) {
        return (
            <AuthWrapper
                isAuthenticated={isAuthenticated}
                modalVisible={modalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        );
    };

    return (
        <PageWrapper>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Input
                    placeholder="Search PDFs"
                    onSearch={handleSearch}
                    onChange={handleInputChange}
                    prefix={<SearchOutlined />}
                    allowClear
                />
                <div style={{ width: '10px' }} />
                <Link to="/uploadpdf">
                    <Button type="primary" icon={<UploadOutlined />}>
                        Upload PDF
                    </Button>
                </Link>
            </div>
            <Title level={2}>Your PDFs</Title>
            <List

                pagination={{
                    pageSize: 8,
                    align: 'center',
                    hideOnSinglePage: true,
                }}
                dataSource={filteredPdfs}
                renderItem={pdf => (
                    <List.Item
                        actions={[<Link to={`/editpdf/${pdf._id}`}>Edit</Link>, <Link to={`/deletepdf/${pdf._id}`}>Delete</Link>]}
                    >
                        <List.Item.Meta
                            avatar={<FilePdfOutlined style={{ fontSize: '24px', marginRight: '10px' }} />}
                            title={<Link to={`/pdfviewer/${pdf._id}`}>{pdf.title}</Link>}
                            description={`Uploaded on ${moment(pdf.createdAt).format('MMMM Do YYYY, h:mm:ss A')}`}
                        />
                    </List.Item>
                )}
            />
        </PageWrapper>
    );
};

export default ListPdfs;
