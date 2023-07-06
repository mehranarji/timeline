import clsx from "clsx";
import { FC, useState } from "react";
import { ChevronDown } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../../../component/Container";
import LoadMore from "../../../component/LoadMore";
import Post from "../../../component/Post";
import PostForm from "../../../component/PostForm";
import PostModel from "../../../data/domain/post";
import usePostFeaturedQuery from "../../../data/query/usePostFeaturedQuery";
import usePostInsertMutation from "../../../data/query/usePostInsertMutation";
import usePostListQuery from "../../../data/query/usePostListQuery";
import usePostRemoveMutation from "../../../data/query/usePostRemoveMutation";

const PostList: FC = () => {
    const [text, setText] = useState("");
    const {
        data: posts,
        isFetching,
        isFetched,
        fetchNextPage,
        hasNextPage,
    } = usePostListQuery();
    const { data: featuredPosts } = usePostFeaturedQuery();
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
            <div className="mb-5">
                <PostForm
                    text={text}
                    onTextChange={setText}
                    isDisabled={!isFetched || isInserting}
                    onSubmit={() => formSubmit()}
                />
            </div>

            <Swiper
                slidesPerView={1}
                autoHeight
                spaceBetween={10}
                className="bg-slate-50"
            >
                {featuredPosts?.items.map((post) => (
                    <SwiperSlide key={post.id}>
                        <Post
                            post={post}
                            // onRequestRemove={removePost}
                            className="border-slate-200 border-b bg-white dark:border-slate-900 dark:bg-slate-800"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

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

export default PostList;
