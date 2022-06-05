export type GIF = {
    title: string;
    giphyUrl: string;
    mp4Url: string;
};

export type Pagination = {
    totalCount: number | undefined;
    count: number | undefined;
    offset: number | undefined;
};

export type Meta = {
    status: number | undefined;
    message: string | undefined;
};

export type MultiGifResponse = {
    gifs: GIF[];
    pagination: Pagination | undefined;
    meta: Meta | undefined;
};