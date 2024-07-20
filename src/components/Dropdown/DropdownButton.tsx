"use client";

import { type ReactElement, useState } from "react";
import Button from "../Button";
import Dropdown from "./index";

import "./dropdown.scss";

export default function DropdownButton({
    click = () => {},
    type = "blank",
    custom,
    wrapperClass,
    items,
    children,
}: {
    click?: () => void;
    type: string;
    custom?: object;
    wrapperClass?: string;
    items: Array<ReactElement>;
    children: React.ReactNode;
}) {
    const [state, setState] = useState<Boolean>(false);

    return (
        <div className={"dropdown-wrapper " + (wrapperClass || "")}>
            <Button
                type={type}
                custom={custom}
                click={() => {
                    click();
                    setState(!state);
                }}
            >
                {children}
            </Button>

            {state && <Dropdown items={items} set={setState} />}
        </div>
    );
}
