import React from 'react';
import Layout from '../Layout/Layout';
import LinkList from './LinkList/LinkList';
import SubmitNewLink from './SubmitNewLink/SubmitNewLink';

const Homepage: React.FC = () => {
    return (
        <Layout>
            <SubmitNewLink />
            <LinkList />
        </Layout>
    );
};

export default Homepage;
