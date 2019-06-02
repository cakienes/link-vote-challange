import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { getLinksFromLocalStorage } from '../../actions/creators/linkActions';
import Homepage from '../Homepage/Homepage';
import NewLink from '../NewLink/NewLink';
import './App.scss';
import IAppProps from './interface/IAppProps';

export class App extends React.Component<IAppProps, any> {
    constructor(props: IAppProps) {
        super(props);

        this.props.getLinksFromLocalStorage();
    }
    render() {
        return (
            <BrowserRouter>
                <Route path="/" exact component={Homepage} />
                <Route path="/new-link" exact component={NewLink} />
            </BrowserRouter>
        );
    }
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        getLinksFromLocalStorage: () => {
            dispatch(getLinksFromLocalStorage());
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(App);
