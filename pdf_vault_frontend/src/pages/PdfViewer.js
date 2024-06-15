import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Document, Page, pdfjs } from "react-pdf";
import { getPdf } from '../api/PdfAPI';
import PageWrapper from '../components/PageWrapper';
import AuthWrapper from '../components/AuthWrapper';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const PdfViewer = () => {
    const { id } = useParams();
    const [pdfData, setPdfData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const res = await getPdf(id);
                console.log(res);
                if (res.status === 200) {
                    const blob = new Blob([res.data], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    console.log(url);
                    setPdfData(url);
                } else {
                    message.error('Failed to fetch PDF. Please try again.');
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

        fetchPdf();
    }, [id, navigate]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleOk = () => {
        setIsAuthenticated(true);
        setModalVisible(false);
    };

    const handleCancel = () => {
        setIsAuthenticated(null);
        setModalVisible(false);
    };

    if (loading || !pdfData) {
        return (
            <AuthWrapper isAuthenticated={null} />
        );
    }

    if (isAuthenticated === false || isAuthenticated === null) {
        return (
            <AuthWrapper
                isAuthenticated={isAuthenticated}
                modalVisible={modalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        );
    }

    return (
        <PageWrapper>
            <Document
                file={pdfData}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<Spin indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />} />}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </PageWrapper>
    );
};

export default PdfViewer;
