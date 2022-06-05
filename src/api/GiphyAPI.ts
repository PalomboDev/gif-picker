import { GIF, MultiGifResponse } from "../types";

export default class GiphyAPI {

    private readonly apiKey: string | undefined;
    private readonly url: string | undefined;
    private readonly method: string;
    private readonly headers: HeadersInit;

    constructor() {
        this.apiKey = process.env.REACT_APP_GIPHY_API_KEY;
        this.url = this.apiKey ? `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}` : undefined;
        this.method = "GET";
        this.headers = {
            "Content-Type": "application/json"
        };

        if (this.initializeCheck(false)) {
            console.log("GiphyAPI was been initialized correctly.")
        }
    }

    // Instead of using Gipfy's included random endpoint,
    // I'm using a static search query and picking (3)
    // random gifs from that result. The reason behind this
    // is Giphy doesn't allow you to return multiple random
    // GIFs so this would use (3) request per homepage load.
    public async getRandomGIFs(limit: number = 3): Promise<GIF[]> {
        const gifs: GIF[] = [];

        if (this.initializeCheck()) {
            const multiGifResponse: MultiGifResponse | null = await this.getGIFs("lol");

            if (multiGifResponse) {
                const foundGifs: GIF[] = multiGifResponse.gifs;

                for (let i = 0; i < limit; i++) {
                    const randomGif: GIF | undefined = foundGifs[
                        Math.floor((Math.random() * foundGifs.length))];

                    if (randomGif) {
                        gifs.push(randomGif);
                    }
                }
            }
        }

        return gifs;
    }

    public async getGIFs(query: string): Promise<MultiGifResponse | null> {
        if (this.initializeCheck()) {
            const queryUrl: string | null = this.urlWithQuery(query);

            if (queryUrl) {
                const response: Response = await fetch(
                    queryUrl,
                    { method: this.method, headers: this.headers }
                );
                const data: any = await response.json();

                // GIF Data
                const foundGifData: any = data["data"];
                const gifs: GIF[] = [];

                if (foundGifData) {
                    foundGifData.forEach((gifObject: any) => {
                        const gif: GIF | null = GiphyAPI.jsonObjectToGIF(gifObject);

                        if (gif) {
                            gifs.push(gif);
                        }
                    });
                }

                // Pagination Data
                const foundPaginationData: any = data["pagination"];
                let totalCount: number | undefined;
                let count: number | undefined;
                let offset: number | undefined;

                if (foundPaginationData) {
                    totalCount = foundPaginationData["total_count"];
                    count = foundPaginationData["count"];
                    offset = foundPaginationData["offset"];
                }

                // Meta Data
                const foundMetaData: any = data["meta"];
                let status: number | undefined;
                let message: string | undefined;

                if (foundMetaData) {
                    status = foundMetaData["status"];
                    message = foundMetaData["msg"];

                    if (status == 429) {
                        alert("The Giphy API limit has been reached. No GIFs will load!")
                    }
                }

                return {
                    gifs,
                    pagination: {
                        totalCount,
                        count,
                        offset
                    },
                    meta: {
                        status,
                        message
                    }
                }
            }
        }

        return null;
    }

    private urlWithQuery(query: string): string | null {
        if (this.initializeCheck()) {
            return `${this.url}&q=${query}`;
        }

        return null;
    }

    private initializeCheck(logError: boolean = true): boolean {
        const initialized: boolean = this.apiKey !== undefined && this.url !== undefined;

        if (!initialized) {
            if (logError) {
                console.error("GiphyAPI is trying to be used but is not initialized.");
            }
        }

        return initialized;
    }

    private static jsonObjectToGIF(jsonObject: any): GIF | null {
        const title: string | undefined = jsonObject["title"];
        const giphyUrl: string | undefined = jsonObject["url"];
        const mp4Url: string | undefined = jsonObject["images"]["original"]["mp4"];

        if (title && giphyUrl && mp4Url) {
            return {
                title: title,
                giphyUrl: giphyUrl,
                mp4Url: mp4Url
            }
        }

        return null;
    }
}