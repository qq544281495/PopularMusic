import { musicRequest } from "./index";

// 获取轮播图
export function getBanner(type=0){
    return  musicRequest.get({
        url: "/banner",
        data: { type }
    });
}
// 获取歌曲排行榜
export function getMusiqueRank(id){
    return musicRequest.get({
        url: "/playlist/detail",
        data: { id }
    });
}
// 获取歌单
export function getSongList(cat = "全部", limit = 6, offset = 0){
    return musicRequest.get({
        url: "/top/playlist",
        data: {
            cat,
            limit,
            offset
        }
    });
}
// 获取歌单分类
export function getSongCategory(){
    return musicRequest.get({
        url: "/playlist/hot"
    });
}
// 获取歌单详情
export function getSongListDetail(id){
    return musicRequest.get({
        url: "/playlist/detail",
        data: { id }
    });
}