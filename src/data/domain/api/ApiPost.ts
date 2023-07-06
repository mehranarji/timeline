interface ApiPostModel {
    id: number;
    user_id: number;
    parent_id?: number;
    text: string;
    created_at: string;
    updated_at: string;
    children?: ApiPostModel[];
}
export default ApiPostModel;
