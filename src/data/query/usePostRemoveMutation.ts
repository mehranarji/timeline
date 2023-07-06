import { useMutation, useQueryClient } from "react-query";
import client from "../fetch";

const usePostDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<unknown, unknown, number>(
        async (id) => await client.delete(`post/${id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["post", "list"]);
            },
        }
    );
};

export default usePostDeleteMutation;
