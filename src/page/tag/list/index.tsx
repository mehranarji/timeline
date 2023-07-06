import { FC, useState } from "react";
import { ChevronDown } from "react-feather";
import { useParams } from "react-router-dom";
import Container from "../../../component/Container";
import LoadMore from "../../../component/LoadMore";
import Post from "../../../component/Post";
import PostForm from "../../../component/PostForm";
import PostModel from "../../../data/domain/post";
import usePostInsertMutation from "../../../data/query/usePostInsertMutation";
import usePostRemoveMutation from "../../../data/query/usePostRemoveMutation";
import useTagQuery from "../../../data/query/useTagQuery";

const TagList: FC = () => {
    const [text, setText] = useState("");
    const { tag = "" } = useParams<"tag">();
    const {
        data: posts,
        isFetching,
        isFetched,
        fetchNextPage,
        hasNextPage,
    } = useTagQuery(tag);
    const { mutate: insert, isLoading: isInserting } = usePostInsertMutation();
    const { mutate: remove, isLoading: isRemoving } = usePostRemoveMutation();

    const formSubmit = () => {
        insert(
            { text: text },
            {
                onSuccess: () => {
                    setText("");
                },
            }
        );
        return true;
    };

    const removePost = (post: PostModel) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("مطمئنی میخوای پاکش کنی؟")) {
            remove(post.id);
        }
    };

    return (
        <Container>
            <PostForm
                text={text}
                onTextChange={setText}
                isDisabled={!isFetched || isInserting}
                onSubmit={() => formSubmit()}
            />

            {posts?.pages.map((page) =>
                page.items.map((post) => (
                    <Post
                        post={post}
                        key={post.id}
                        onRequestRemove={removePost}
                        className="border-slate-200 border-b bg-white dark:border-slate-900 dark:bg-slate-800"
                    />
                ))
            )}
            <LoadMore
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetching}
            />
        </Container>
    );
};

export default TagList;
