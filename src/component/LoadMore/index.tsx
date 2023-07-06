import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ChevronDown } from "react-feather";

const LoadMore = forwardRef<
    HTMLButtonElement,
    ComponentPropsWithoutRef<"button">
>((props, ref) => {
    const { className, children, ...rest } = props;

    return (
        <button
            className={clsx(
                "py-7 border-b border-slate-200 text-center w-full text-slate-400 bg-slate-50",
                "disabled:text-slate-200 disabled:cursor-not-allowed",
                "dark:bg-slate-800 dark:border-slate-900",
                className
            )}
            ref={ref}
            {...rest}
        >
            <ChevronDown className="inline" />
        </button>
    );
});

LoadMore.displayName = "LoadMore";

export default LoadMore;
