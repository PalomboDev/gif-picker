import "./index.css";

import { ReactNode } from "react";
import Search from "../Search";

type Props = {
    children: ReactNode;
    doSearch: (query: string | undefined) => void;
};

export default function Layout({ children, doSearch }: Props): JSX.Element {

    return (
        <div className={"layout"}>
            <h1 className={"layout-title"}>GIF Picker</h1>

            <Search doSearch={doSearch} />

            <div>
                {children}
            </div>
        </div>
    );
}