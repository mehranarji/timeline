import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Mousetrap from "mousetrap";
import { FC, useEffect, useRef, useState } from "react";
import { Save } from "react-feather";

interface PostFormProps {
    isDisabled?: boolean;
    text?: string;
    onTextChange?: (text: string) => void;
    onSubmit?: () => boolean;
}

const PostForm: FC<PostFormProps> = (props) => {
    const { isDisabled, onSubmit, text, onTextChange } = props;
    const [isShowing, setShowing] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            Mousetrap(inputRef.current)
            .unbind("mod+enter")
            .bind("mod+enter", (ev) => {
                ev.preventDefault();
                if (!isDisabled) {
                    onSubmit?.();
                }
                return false;
            });
        }
    });

    return (
        <fieldset disabled={isDisabled} className="border-b border-slate-200 relative z-10 dark:border-slate-900 dark:bg-slate-800">
            {/* Backdrop */}
            <Transition
                show={isShowing}
                enter="transition-opacity duration-75"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveTo="opacity-0"
            >
                <div
                    className="fixed inset-0 bg-slate-100/90 dark:bg-slate-900/90"
                    aria-hidden="true"
                />
            </Transition>

            {/* overlay */}
            <form
                onFocus={() => setShowing(!0)}
                onBlur={() => setShowing(!1)}
                onSubmit={(ev) => {
                    ev.preventDefault();
                    onSubmit?.();
                }}
            >
                <textarea
                    className={clsx(
                        "relative",
                        "w-full py-5 px-3",
                        "transition-colors",
                        "bg-slate-50 dark:bg-slate-800",
                        "focus:bg-white focus:dark:bg-slate-800",
                        "text-right"
                    )}
                    rows={10}
                    value={text}
                    onChange={(ev) => onTextChange?.(ev.target.value)}
                    placeholder={"چیزی بنویس..."}
                    ref={inputRef}
                />

                <Transition
                    show={isShowing}
                    className="absolute inset-x-0 top-full p-10 flex justify-start"
                    enter="transition-opacity duration-75"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveTo="opacity-0"
                >
                    <button
                        className="bg-blue-500 p-8 md:p-4 text-white rounded-full"
                        type="submit"
                    >
                        <Save size={22} />
                    </button>
                </Transition>
            </form>
        </fieldset>
    );
};

export default PostForm;
