"use client";

import Link from "next/link";
import type { MouseEventHandler } from "react";

import "./button.scss";

export default function Button({
    type = "main",
    href,
    click,
    custom,
    className,
    children,
    disabled = false,
}: {
    type?: string;
    href?: string;
    click?: MouseEventHandler;
    custom?: Object;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}) {
    // Link
    if (href) {
        return (
            <Link
                className={`button ${type} ${className ? className : ""}`}
                style={custom ? custom : undefined}
                href={href}
            >
                {children}
            </Link>
        );
    }

    // Button
    return (
        <button
            className={`button ${type} ${className ? className : ""}`}
            style={custom ? custom : undefined}
            onClick={click}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
