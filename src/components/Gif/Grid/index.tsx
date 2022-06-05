import "./index.css";

import { GIF } from "../../../types";
import GifIcon from "../Icon";

type Props = {
    gifs: GIF[];
};

export default function GifGrid({ gifs }: Props): JSX.Element {

    if (gifs.length <= 0) {
        return (
            <div className={"grid-container"}>
                <p>No GIFs found.</p>
            </div>
        );
    }

    return (
        <div className={"grid-container"}>
            {gifs && gifs.map((gif, index) => {
                return <div key={index} className={"grid-item"}>
                    <GifIcon gif={gif}/>
                </div>
            })}
        </div>
    );
}