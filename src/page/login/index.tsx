import { AxiosResponse } from "axios";
import React, { FC, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Container from "../../component/Container";
import ApiResultModel from "../../data/domain/api/ApiResult";
import client from "../../data/fetch";
import useToken from "../../data/query/useToken";
import { ApiUserModel } from "../../data/query/useUserQuery";

const LoginPage: FC = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken } = useToken();
    const queryClient = useQueryClient();

    const onSubmit = async () => {
        try {
            const { data } = await client.post<
                ApiResultModel<{ user: ApiUserModel & { token: string } }>
            >("login", {
                username,
                password,
            });

            queryClient.invalidateQueries(["user"]);
            setToken(data.data.user.token);
            navigate("/");
        } catch (error: any) {
            console.dir(error);

            if (typeof error === "string") {
                alert(error);
            }

            if (error?.response.data.data.errors) {
                alert(error.response.data.data.errors);
            }
        }
    };

    return (
        <Container>
            <div className="min-h-screen flex flex-col justify-center items-stretch">
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        onSubmit();
                    }}
                >
                    <p className="mb-4 px-5">لطفا وارد شوید</p>
                    <input
                        type="text"
                        className="bg-slate-50 border-y border-slate-200 block w-full p-4 dark:bg-slate-700 dark:border-slate-900"
                        placeholder="نام کاربری"
                        value={username}
                        onChange={(ev) => setUsername(ev.target.value)}
                    />

                    <input
                        type="password"
                        className="bg-slate-50 border-y border-slate-200 block w-full p-4 dark:bg-slate-700 dark:border-slate-900"
                        placeholder="رمز عبور"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />

                    <button
                        className="w-full p-5 bg-sky-400 text-white dark:bg-sky-900"
                        type="submit"
                    >
                        ورود
                    </button>
                </form>
            </div>
        </Container>
    );
};

export default LoginPage;
