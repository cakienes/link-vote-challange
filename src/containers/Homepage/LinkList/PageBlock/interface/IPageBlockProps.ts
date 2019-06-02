export default interface IPageBlockProps {
    currentPage: number;
    totalSize: number;

    onClickPage: (page: number) => void;
}
