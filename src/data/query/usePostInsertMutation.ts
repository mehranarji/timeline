import { useMutation, useQueryClient } from "react-query";
import ApiPostModel from "../domain/api/ApiPost";
import ApiResultModel from "../domain/api/ApiResult";
import client from "../fetch";

export interface InsertPostArgs {
    text: string;
    parent?: number;
}

const usePostInsertMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation<unknown, unknown, InsertPostArgs>(
        async ({ text, parent }) =>
            await client.post<
                unknown,
                ApiResultModel<ApiPostModel>,
                InsertPostArgs
            >("post", {
                text,
                parent,
            })
    , {
        onSuccess: () => {
            queryClient.invalidateQueries(["post", "list"])
        }
    });
};

export default usePostInsertMutation;
