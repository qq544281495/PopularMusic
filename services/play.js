import { musicRequest } from "./index";

// 歌曲详情
export function getSongDetail(ids){
    return musicRequest.get({
        url: "/song/detail",
        data: { ids }
    });
}

// 歌词信息
export function getLyric(id){
    return musicRequest.get({
        url: "/lyric",
        data: { id }
    });
}