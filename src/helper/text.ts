import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export const extractHashTags = (text?: string) => {
    if (!text) {
        return;
    }
    const regex = /(?:#([ا-ی_\w]+))/gm;

    let parts = text.split(regex);
    let result: ReactNode[] = [];

    for (let i = 0; i < parts.length; i++) {
        if (i % 2 !== 0) {
            result.push(
                React.createElement(Link, {
                    children: `#${parts[i]}`,
                    to: `/tag/${parts[i]}`,
                    className: "text-blue-500"
                })
            );
        } else {
            result.push(parts[i]);
        }
    }

    return result;
};
