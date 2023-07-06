import { useQuery } from "react-query";
import ApiResultModel from "../domain/api/ApiResult";
import client from "../fetch";

export interface ApiUserModel {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    created_at: string;
    updated_at: string;
}

const useUserQuery = () =>
    useQuery(["user"], async () => {
        const { data } = await client.get<
            ApiResultModel<{ user: ApiUserModel }>
        >("me");

        return data.data.user;
    });
export default useUserQuery;
