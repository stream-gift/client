import { type RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<HTMLElement | null>, callback: () => void) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};
