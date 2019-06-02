import React from 'react';
import { connect } from 'react-redux';
import { VoteEnum } from '../../../helper/Enum';
import ILink from '../../Interfaces/ILink';
import ILinkListProps from './interface/ILinkListProps';
import './LinkList.scss';
import LinkListTemplate from './LinkListTemplate/LinkListTemplate';
import PageBlock from './PageBlock/PageBlock';

const pageSize = 5;

interface ILinkListState {
    page: number;
    vote: string;
}
export class LinkList extends React.Component<ILinkListProps, ILinkListState> {
    constructor(props: ILinkListProps) {
        super(props);

        this.state = {
            page: 0,
            vote: '',
        };
    }
    render() {
        const { links } = this.props;
        const { page } = this.state;

        const totalSize = Math.floor((links.length - 1) / pageSize);
        return (
            <div>
                <div className="listOption">
                    <select onChange={this.onChangeSelect}>
                        <option value="">Order by</option>
                        <option value={VoteEnum.MOST_VOTED}>Most Voted (Z->A)</option>
                        <option value={VoteEnum.LESS_VOTED}>Less Voted (A->Z)</option>
                    </select>
                </div>
                <div className="listItems">{this.renderTemplate()}</div>
                <div className="linkList">
                    {totalSize >= 1 && (
                        <PageBlock currentPage={page} totalSize={totalSize} onClickPage={this.setPage} />
                    )}
                </div>
            </div>
        );
    }

    renderTemplate = (): React.ReactNode => {
        const { links } = this.props;
        const { page, vote } = this.state;
        if (links && links.length > 0) {
            let pageData: ILink[] = [];
            switch (vote) {
                case VoteEnum.LESS_VOTED:
                    pageData = links.sort(this.sortByLessVoted);
                    break;
                case VoteEnum.MOST_VOTED:
                    pageData = links.sort(this.sortByMostVoted);
                    break;
                default:
                    pageData = links.sort(this.sortByCreatedAt);
                    break;
            }

            pageData = pageData.slice(pageSize * page, pageSize * (page + 1));

            if (pageData.length === 0) {
                pageData = links.slice(pageSize * (page - 1), pageSize * page);
                this.setPage(page - 1);
            }
            return pageData.map((link: ILink) => <LinkListTemplate data={link} key={link.id} />);
        } else {
            return '';
        }
    };

    setPage = (page: number): void => {
        this.setState({
            page,
        });
    };

    onChangeSelect = (e: any): void => {
        this.setState({
            vote: e.target.value,
        });
    };

    sortByMostVoted = (x: ILink, y: ILink): number => {
        const value = y.point - x.point;
        if (value === 0) {
            return this.sortByUpdatedAt(x, y);
        }
        return value;
    };

    sortByLessVoted = (x: ILink, y: ILink): number => {
        const value = x.point - y.point;
        if (value === 0) {
            return this.sortByUpdatedAt(x, y);
        }
        return value;
    };

    sortByUpdatedAt = (x: ILink, y: ILink): number => {
        return new Date(y.updatedAt).getTime() - new Date(x.updatedAt).getTime();
    };

    sortByCreatedAt = (x: ILink, y: ILink): number => {
        return new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime();
    };
}

const mapStateToProps = (state: any) => {
    return {
        links: state.link.links,
    };
};

export default connect(
    mapStateToProps,
    null,
)(LinkList);
