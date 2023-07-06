interface PostModel {
    id: number;
    text: string;
    updated_at?: string;
    created_at: string;
    parent_id?: number;
    children?: PostModel[];
}

export default PostModel;
