import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import { createOrUpdateLink } from '../../actions/creators/linkActions';
import ILink from '../Interfaces/ILink';
import Layout from '../Layout/Layout';
import INewLinkProps from './interface/INewLinkProps';
import './NewLink.scss';
import NewLinkForm from './NewLinkForm/NewLinkForm';

export class NewLink extends React.Component<INewLinkProps, any> {
    render() {
        return (
            <Layout>
                <Link to="/" className="backLinkHolder">
                    <span className="oi oi-arrow-left" />
                    Return to List
                </Link>
                <NewLinkForm onSubmit={this.onFormSubmit} />
            </Layout>
        );
    }

    onFormSubmit = (link: any) => {
        const newLink: ILink = { ...link, createdAt: new Date(), point: 0, id: uuid() };
        this.props.createOrUpdateLink(newLink);

        toastr.success('', link.name + ' Added');
    };
}

const mapStateToProps = (state: any, ownProps: any) => ({
    initialValues: ownProps.data,
});

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        createOrUpdateLink: (link: ILink) => dispatch(createOrUpdateLink(link)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewLink);
