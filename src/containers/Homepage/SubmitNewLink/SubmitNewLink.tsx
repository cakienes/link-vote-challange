import React from 'react';
import { Route } from 'react-router';
import './SubmitNewLink.scss';

class SubmitNewLink extends React.Component<any, any> {
    render() {
        return (
            <Route
                render={({ history }) => (
                    <div className="submitNewLinkHolder" onClick={() => this.onClick(history)}>
                        <div className="iconHolder">+</div>
                        <div className="textHolder">SUBMIT A LINK</div>
                    </div>
                )}
            />
        );
    }

    onClick = (history: any) => {
        history.push('/new-link');
    };
}

export default SubmitNewLink;
