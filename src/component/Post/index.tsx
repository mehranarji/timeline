import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { FC } from "react";
import { PenTool, Trash2 } from "react-feather";
import PostModel from "../../data/domain/post";
import { extractHashTags } from "../../helper/text";

dayjs.extend(jalaliday);

interface PostProps {
    post: PostModel;
    isEditable?: boolean;
    className?: string;
    onRequestEdit?: (post: PostModel) => void;
    onRequestRemove?: (post: PostModel) => void;
}

const Post: FC<PostProps> = (props) => {
    const { post, isEditable, className, onRequestEdit, onRequestRemove } =
        props;

    return (
        <div className={className}>
            <div className="p-5">
                <p className="text-end mb-2">
                    <time
                        dateTime={post.created_at}
                        title={dayjs(post.created_at)
                            .calendar("jalali")
                            .toDate()
                            .toString()}
                        className="text-xs text-slate-400/70"
                    >
                        {dayjs(post.created_at)
                            .calendar("jalali")
                            .locale("fa")
                            .format("DD MMMM YY")}
                    </time>
                </p>
                <p className="whitespace-pre-line leading-relaxed">
                    {extractHashTags(post.text)}
                </p>
                <div className="flex items-baseline justify-end gap-8 md:gap-5">
                    <div>
                        {onRequestEdit && (
                            <button
                                type="button"
                                className="p-3 rounded-full hover:bg-slate-100 text-slate-400/40 hover:text-blue-400 focus:text-blue-400 dark:hover:bg-slate-900"
                                onClick={() => onRequestEdit?.(post)}
                            >
                                <PenTool size={18} className="inline" />
                            </button>
                        )}
                        {onRequestRemove && (
                            <button
                                type="button"
                                className="p-3 rounded-full hover:bg-slate-100 text-slate-400/40 hover:text-rose-400 focus:text-rose-400 dark:hover:bg-slate-900"
                                onClick={() => onRequestRemove?.(post)}
                            >
                                <Trash2 size={18} className="inline" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {post.children && post.children.length > 0 && (
                <div className="bg-slate-100/50 flex flex-col border-slate-200">
                    {post.children.map((post) => (
                        <Post
                            post={post}
                            key={post.id}
                            onRequestRemove={() => onRequestRemove?.(post)}
                            className="border-slate-200 border-b last:border-b-0 first:border-t pr-8"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Post;
