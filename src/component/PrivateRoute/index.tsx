import React, { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../data/fetch";
import useToken from "../../data/query/useToken";
import useUserQuery from "../../data/query/useUserQuery";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = (props) => {
    const { children } = props;
    const { token } = useToken();
    const navigate = useNavigate();
    const { isError } = useUserQuery();

    client.interceptors.request.use((config) => {
        if (config.headers && token) {
            config.headers["Authorization"] = token;
        } else {
            navigate("/login");
        }

        return config;
    });


    if (isError) {
        navigate("/login");
    }

    return <>{children}</>;
};

export default PrivateRoute;
