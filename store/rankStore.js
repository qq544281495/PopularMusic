import { EventStore } from "event-store-save";
import { getMusiqueRank } from "../services/musique";

const rankMap = {
    newSong: 3779629,
    originalSong: 2884035,
    surgeSong: 19723756
};
// 创建store实例
const rankStore = new EventStore({
    state: {
        newSong: {},
        originalSong: {},
        surgeSong: {}
    },
    actions: {
        fetchRank(ctx){
            for(let key in rankMap){
                const id = rankMap[key];
                getMusiqueRank(id).then(response => {
                    ctx[key] = response.playlist;
                })
            }
        }
    }
});

export default rankStore;