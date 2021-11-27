interface ICategory{
    id: string;
    label: string;
};

interface IAlternate{
    type: string;
    href: string;
};

interface IOrigin{
    streamId: string;
    title: string;
    originId?: string;
    htmlUrl?: string;
};

interface IVisual{
    contentType: string;
    url: string;
    width: number;
    height: number;
};

interface ISummary{
    content: string;
    direction: string;
};

interface IContent{
    content: string;
    direction: string;
}


/* Article Types */
interface IArticle{
    fingerprint: string;
    id: string;
    originId?: string;
    title: string;
    updated: number;
    crawled: number;
    published: number;
    keywords: [string];
    canonicalUrl?: string;
    categories: [ICategory];
    alternate: [IAlternate];
    origin: IOrigin;
    visual?: IVisual;
    summary?: ISummary;
    content?: IContent;
    ampUrl?: string;
    cdnAmpUrl?: string;
    unread: boolean;
};

interface IArticleIds{
    ids: [string];
};


export type { IArticle, IArticleIds };