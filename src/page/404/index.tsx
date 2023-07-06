import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "../../component/Container";

const Error404: FC = () => {
    return (
        <Container className="flex flex-col items-center justify-center">
            <p className="text-8xl font-black animate-pulse">404</p>
            <p className="text-lg text-slate-400 mt-2">صفحه یافت نشد</p>
            <Link to={"/"} className="text-lg text-blue-400 mt-12">
                بازگشت به خانه
            </Link>
        </Container>
    );
};

export default Error404;
