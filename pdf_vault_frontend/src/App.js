import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ListPdfs from './pages/ListPdfs';
import UploadPdf from './pages/UploadPdf';
import PdfViewer from './pages/PdfViewer';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/listpdfs" element={<PrivateRoute> <ListPdfs /> </PrivateRoute>} />
                <Route path="/uploadpdf" element={<PrivateRoute> <UploadPdf /> </PrivateRoute>} />
                <Route path="/pdfviewer/:id" element={<PrivateRoute> <PdfViewer /> </PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
