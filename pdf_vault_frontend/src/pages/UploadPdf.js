import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Upload, notification, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadPdf } from '../api/PdfAPI';
import PageWrapper from '../components/PageWrapper';
import AuthWrapper from '../components/AuthWrapper';

const { Dragger } = Upload;

const UploadPdf = () => {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = ({ fileList }) => {
        // Validate the number of files
        if (fileList.length > 1) {
            message.error('You can only upload one PDF file!');
        }

        const updatedFileList = fileList.slice(0, 1);

        if (updatedFileList.length > 0) {
            const file = updatedFileList[0];
            const isPdf = file.type === 'application/pdf';
            const isLt5M = file.size / 1024 / 1024 < 5;

            // Validate the file type
            if (!isPdf) {
                message.error('You can only upload PDF files!');
                setFileList([]);
                return;
            }

            // Validate the file size
            if (!isLt5M) {
                message.error('File must be smaller than 5MB!');
                setFileList([]);
                return;
            }
        }

        // Update the file list state
        setFileList(updatedFileList);
    };

    const handleSubmit = async values => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('file', fileList[0].originFileObj);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await uploadPdf(formData, config);

            if (res.status === 201) {
                notification.success({ message: 'PDF uploaded successfully.' });
                navigate('/listpdfs');
            } else {
                notification.error({ message: 'Failed to upload PDF. Please try again.' });
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setIsAuthenticated(false);
                setModalVisible(true);
            } else {
                message.error('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOk = () => {
        setModalVisible(false);
        navigate('/login');
    };

    const handleCancel = () => {
        setModalVisible(false);
        setIsAuthenticated(null);
    };

    if (isAuthenticated === false || isAuthenticated === null) {
        return (
            <AuthWrapper
                isAuthenticated={true}
                modalVisible={modalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        );
    };

    return (
            <PageWrapper>
                <div style={{ maxWidth: 600, margin: 'auto', paddingTop: 50 }}>
                    <h1>Upload PDF</h1>
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter a title' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="file"
                            label="Upload PDF"
                            getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
                            rules={[{ required: true, message: 'Please upload a PDF file' }]}
                        >
                            <Dragger
                                name="file"
                                fileList={fileList}
                                beforeUpload={() => false}
                                onChange={handleFileChange}
                            >
                                <p className="ant-upload-drag-icon">
                                    <UploadOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single PDF file. Limit size to 5MB.</p>
                            </Dragger>
                        </Form.Item>
                        <Form.Item>
                            {fileList.length === 1 && (
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Upload
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </PageWrapper>
    );
};

export default UploadPdf;
