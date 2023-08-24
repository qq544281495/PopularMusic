class Request{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    request(options){
        const { url } = options;
        return new Promise((resolve, reject) => {
            wx.request({
                ...options,
                url: this.baseUrl + url,
                success: (response) => {
                    resolve(response.data);
                },
                fail: (error) => {
                    reject(error);
                }
            });
        });
    }
    get(options){
        return this.request({...options, method: "get"});
    }
    post(options){
        return this.request({...options, method: "post"});
    }
}
export const musicRequest = new Request("http://codercba.com:9002");