import { musicRequest } from "./index";

// 获取音乐MV排行榜
export function getMovieRank(offset=0, limit=20){
    return musicRequest.get({
        url: "/top/mv",
            data: { 
                offset,
                limit
            }
    });
}
// 获取音乐MV地址
export function getMovieUrl(id){
    return musicRequest.get({
        url: "/mv/url",
        data: { id }
    });
}
// 获取音乐MV相关信息
export function getMovieInfo(mvid){
    return musicRequest.get({
        url: "/mv/detail",
        data: { mvid }
    });
}
// 获取音乐MV相关视频
export function getMovieRelated(id){
    return musicRequest.get({
        url: "/related/allvideo",
        data: { id }
    });
}