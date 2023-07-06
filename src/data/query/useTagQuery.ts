import { useInfiniteQuery } from "react-query";
import ApiPostListResultModel from "../domain/api/ApiPostListResultModel";
import ApiResultModel from "../domain/api/ApiResult";
import client from "../fetch";

const useTagQuery = (tag: string) => {
    return useInfiniteQuery(
        ["tag", tag],
        async ({ pageParam = 1 }) => {
            const { data } = await client.get<
                ApiResultModel<ApiPostListResultModel>
            >(`tag/${tag}`, {
                params: {
                    page: pageParam,
                }
            });

            return {
                total: data.data.total,
                items: data.data.posts,
            };
        },
        {
            getNextPageParam: (lastPage, pages) => pages.length * 10 < lastPage.total && pages.length + 1 ,
        }
    );
};

export default useTagQuery;
