export default function queryElement(element){
    return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery();
        query.select(element).boundingClientRect();
        query.exec((response) => {
            resolve(response);
        });
    });
}