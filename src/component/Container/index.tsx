import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
    (props, ref) => {
        const { className, children, ...rest } = props;

        return (
            <div className="bg-slate-100 dark:bg-slate-800 dark:text-white">
                <div
                    className={clsx(
                        "md:max-w-2xl mx-auto md:border-x border-slate-200 bg-white min-h-screen",
                        "dark:bg-slate-800 dark:border-slate-900",
                        className
                    )}
                    ref={ref}
                    {...rest}
                >
                    {children}
                </div>
            </div>
        );
    }
);

Container.displayName = "Container";

export default Container;
