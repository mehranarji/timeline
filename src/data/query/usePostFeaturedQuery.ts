import { useQuery } from "react-query";
import ApiPostListResultModel from "../domain/api/ApiPostListResultModel";
import ApiResultModel from "../domain/api/ApiResult";
import client from "../fetch";

const usePostFeaturedQuery = () => {
    return useQuery(["post", "featured"], async ({ pageParam = 1 }) => {
        const { data } = await client.get<
            ApiResultModel<ApiPostListResultModel>
        >(`featured?page=${pageParam}`);

        return {
            total: data.data.total,
            items: data.data.posts,
        };
    });
};

export default usePostFeaturedQuery;
