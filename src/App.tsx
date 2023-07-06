import { ArrowDownLeft, ArrowRight } from "react-feather";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Container from "./component/Container";
import PrivateRoute from "./component/PrivateRoute";
import Error404 from "./page/404";
import LoginPage from "./page/login";
import PostList from "./page/post/list";
import TagList from "./page/tag/list";

function App() {
    const client = new QueryClient({
        defaultOptions: {
            queries: {},
        },
    });

    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={
                            <PrivateRoute>
                                <PostList />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/tag/:tag"
                        element={
                            <PrivateRoute>
                                <TagList />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
            <bdi>
                <ReactQueryDevtools
                    panelProps={{
                        dir: "ltr",
                    }}
                />
            </bdi>
        </QueryClientProvider>
    );
}

export default App;
