const useToken = () => {
    const getToken = () => {
        return localStorage.getItem("token");
    };

    const setToken = (token: string) => {
        localStorage.setItem("token", token);
    };

    return {
        token: getToken(),
        setToken,
    };
};

export default useToken;
