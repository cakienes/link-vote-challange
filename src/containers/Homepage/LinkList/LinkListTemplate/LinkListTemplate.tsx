import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { createOrUpdateLink, removeLink } from '../../../../actions/creators/linkActions';
import ILink from '../../../Interfaces/ILink';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';
import ILinkListTemplateProps from './interface/ILinkListTemplateProps';
import './LinkListTemplate.scss';

export class LinkListTemplate extends React.Component<ILinkListTemplateProps, any> {
    listItemRef = createRef<HTMLDivElement>();
    constructor(props: ILinkListTemplateProps) {
        super(props);

        this.state = {
            isMouseOver: false,
            confirmationModalVisibility: false,
        };
    }

    componentDidMount = () => {
        if (this.listItemRef !== null && this.listItemRef.current !== null) {
            this.listItemRef.current.addEventListener('mouseenter', this.onMouseOver);
            this.listItemRef.current.addEventListener('mouseleave', this.onMouseOut);
        }
    };
    componentWillUnmount = () => {
        if (this.listItemRef !== null && this.listItemRef.current !== null) {
            this.listItemRef.current.removeEventListener('mouseenter', this.onMouseOver);
            this.listItemRef.current.removeEventListener('mouseleave', this.onMouseOut);
        }
    };
    render() {
        const { data } = this.props;
        const { isMouseOver, confirmationModalVisibility } = this.state;
        return (
            <div className="linkListTemplateHolder" ref={this.listItemRef}>
                <div className="pointHolder">
                    <span className="point">{data.point}</span>
                    <span className="pointLabel">POINTS</span>
                </div>
                <div className="linkDetailHolder">
                    <div className="linkName">{data.name}</div>
                    <div className="linkUrl">({data.link})</div>
                    <div className="arrowGroupHolder">
                        <div className="arrowHolder" onClick={this.onClickUpVote}>
                            <span className="oi oi-arrow-top" />
                            <span className="arrowLabel">Up Vote</span>
                        </div>
                        <div className="arrowHolder" onClick={this.onClickDownVote}>
                            <span className="oi oi-arrow-bottom" />
                            <span className="arrowLabel">Down Vote</span>
                        </div>
                    </div>
                </div>
                {isMouseOver && (
                    <div className="actionGroup">
                        <div className="removeIcon" onClick={this.showConfirmationModal}>
                            <span className="oi oi-minus" />
                        </div>
                    </div>
                )}
                <ConfirmationModal
                    data={data}
                    onClickOk={this.removeLink}
                    visibility={confirmationModalVisibility}
                    onClickCancel={this.hideConfirmationModal}
                />
            </div>
        );
    }

    onMouseOver = (): void => {
        this.setState({
            isMouseOver: true,
        });
    };

    onMouseOut = (): void => {
        this.setState({
            isMouseOver: false,
        });
    };

    onClickUpVote = (): void => {
        const { data } = this.props;
        const updatedLink: ILink = { ...data };
        updatedLink.point++;
        updatedLink.updatedAt = new Date();

        this.props.createOrUpdateLink(updatedLink);
    };
    onClickDownVote = (): void => {
        const { data } = this.props;
        const updatedLink: ILink = { ...data };
        if (updatedLink.point !== 0) updatedLink.point--;

        updatedLink.updatedAt = new Date();

        this.props.createOrUpdateLink(updatedLink);
    };

    showConfirmationModal = (): void => {
        this.setState({
            confirmationModalVisibility: true,
        });
    };

    hideConfirmationModal = (): void => {
        this.setState({
            confirmationModalVisibility: false,
        });
    };

    removeLink = (): void => {
        const { data } = this.props;
        this.props.removeLink(data);

        toastr.success('', data.name + ' removed');
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        createOrUpdateLink: (link: ILink) => dispatch(createOrUpdateLink(link)),
        removeLink: (link: ILink) => dispatch(removeLink(link)),
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(LinkListTemplate);
