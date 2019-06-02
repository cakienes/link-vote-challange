import React from 'react';
import Header from '../../components/Header/Header';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Header />
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xs-12 col-md-8 col-lg-6">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
