import ILink from '../containers/Interfaces/ILink';

const LocalStorageService = {
    getLinks: (): ILink[] => {
        const linksString: string = localStorage.getItem('links') || '[]';
        return JSON.parse(linksString);
    },
    setLinks: (links: ILink[]): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            localStorage.setItem('links', JSON.stringify(links));
            resolve();
        });
    },
};

export default LocalStorageService;
