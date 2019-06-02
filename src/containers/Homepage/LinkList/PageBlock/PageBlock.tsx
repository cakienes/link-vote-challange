import React from 'react';
import IPageBlockProps from './interface/IPageBlockProps';
import './PageBlock.scss';

export class PageBlock extends React.Component<IPageBlockProps, any> {
    render() {
        return (
            <div className="pageBlockHolder">
                <div className="leftArrow" onClick={this.onClickPrev}>{`<`}</div>
                <div className="numberBlock">{this.renderNumber()}</div>
                <div className="rightArrow" onClick={this.onClickNext}>{`>`}</div>
            </div>
        );
    }

    renderNumber = (): React.ReactNode => {
        const { totalSize, currentPage } = this.props;
        const numberArray: number[] = [];
        for (let i: number = 0; i <= totalSize; i++) {
            numberArray.push(i);
        }

        return numberArray.map((i: number) => {
            return (
                <div
                    className={`pageNumber ${i === currentPage ? 'selected' : undefined}`}
                    key={i}
                    onClick={() => this.props.onClickPage(i)}
                >
                    {i + 1}
                </div>
            );
        });
    };

    onClickPrev = (): void => {
        const { currentPage } = this.props;
        const prevPage = currentPage - 1;
        if (prevPage >= 0) this.props.onClickPage(prevPage);
    };

    onClickNext = (): void => {
        const { currentPage, totalSize } = this.props;
        if (totalSize !== currentPage) {
            this.props.onClickPage(currentPage + 1);
        }
    };
}

export default PageBlock;
