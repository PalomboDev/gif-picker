import "./App.css";

import { useEffect, useState } from "react";
import { useQueryParam, StringParam } from "use-query-params";
import GiphyAPI from "./api/GiphyAPI";
import { MultiGifResponse, GIF, Pagination, Meta } from "./types";
import Layout from "./components/Layout";
import GifGrid from "./components/Gif/Grid";

export default function App() {
    const giphyAPI: GiphyAPI = new GiphyAPI();

    const [search, setSearch] = useQueryParam("search", StringParam);

    // MultiGifResponse States
    const [gifs, setGifs] = useState<GIF[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [meta, setMeta] = useState<Meta | null>(null);

    function doSearch(query: string | undefined): void {
        setGifs([]);
        setSearch(query ? query : undefined);

        if (query) {
            giphyAPI.getGIFs(query).then((multiGifResponse: MultiGifResponse | null) => {
                if (multiGifResponse) {
                    setGifs(multiGifResponse.gifs);

                    if (multiGifResponse.pagination) {
                        setPagination(multiGifResponse.pagination);
                    }

                    if (multiGifResponse.meta) {
                        setMeta(multiGifResponse.meta);
                    }
                }
            }).catch(error => {
                console.error(error);
            });
        } else {
            giphyAPI.getRandomGIFs().then((randomGifs: GIF[] | null) => {
                if (randomGifs) {
                    setGifs(randomGifs);
                }
            }).catch(error => {
                console.error(error);
            });
        }
    }

    useEffect(() => {
        doSearch(search ? search : undefined);
    }, []);

    return (
        <Layout doSearch={doSearch}>
            <p className={"subTitle"}>Search for your dream GIF</p>

            <GifGrid gifs={gifs}/>
        </Layout>
    );
}
