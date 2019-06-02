import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
    return (
        <div className="headerHolder">
            <div className="row">
                <div className="col-6 brandName">
                    <b className="brandNameFirst">hepsiburada</b>
                    <b className="brandNameSecond">.com</b>
                </div>
                <div className="col-6 float-right projectName">
                    <b>Link</b>VOTE Challenge
                </div>
            </div>
        </div>
    );
};

export default Header;
