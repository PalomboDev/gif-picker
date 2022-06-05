import "./index.css";

import { useState } from "react";
import { useQueryParam, StringParam } from "use-query-params";

type Props = {
    doSearch: (query: string | undefined) => void;
};

export default function Search({ doSearch }: Props): JSX.Element {
    const [search, setSearch] = useQueryParam("search", StringParam);
    const [input, setInput] = useState<string>(search ? search : "");

    function handleSearch(event: any): void {
        event.preventDefault();

        if (input.length > 0) {
            doSearch(input);
        } else {
            handleClear();
        }
    }

    function handleClear(): void {
        setInput("");
        doSearch(undefined);
    }

    return (
        <div className={"search-container"}>
            <form onSubmit={event => handleSearch(event)}>
                <input
                    className={"search-input"}
                    type="text"
                    placeholder="Search for a GIF"
                    name="gif-search"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                />
                <button
                    className={"search-button"}
                    type="submit"
                    onClick={event =>  handleSearch(event)}
                >
                    Search
                </button>
                <button
                    className={"clear-button"}
                    onClick={() => handleClear()}
                >
                    {input.length > 0 ? "Clear" : "Random"}
                </button>
            </form>
        </div>
    );
}