import "./index.css";

import { GIF } from "../../../types";

type Props = {
    gif: GIF
};

export default function GifIcon({ gif }: Props): JSX.Element {
    function handleCopy(): void {
        navigator.clipboard.writeText(gif.giphyUrl).then(value => {
            alert(`You copied the url for ${gif.title}.`);
        }).catch(error => {
           console.error(error);
        });
    }

    function handleTwitterShare(): void {
        window.open(
            `https://twitter.com/share?text=Check out this cool GIF ${gif.giphyUrl}`,
            "_target"
        );
    }

    function handleFacebookShare(): void {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${gif.giphyUrl}`,
            "_target"
        );
    }

    return (
        <div className={"icon-container"}>
            <video
                className={"icon-video"}
                autoPlay={true}
                loop={true}
                muted={true}
            >
                <source src={gif.mp4Url} type="video/mp4" />
            </video>

            <div className={"icon-actions"}>
                <p onClick={handleCopy}>Copy</p>
                <p onClick={handleTwitterShare}>Twitter Share</p>
                <p onClick={handleFacebookShare}>Facebook Share</p>
            </div>
        </div>
    );
}