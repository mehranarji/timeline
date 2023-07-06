interface ApiResultModel<T = undefined> {
    statusCode: number;
    data: T;
}

export default ApiResultModel;
