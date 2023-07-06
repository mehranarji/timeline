import PostModel from "../post";

interface ApiPostListResultModel {
    posts: PostModel[];
    total: number;
}

export default ApiPostListResultModel;
