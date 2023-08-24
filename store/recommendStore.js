import { EventStore } from "event-store-save";
import { getMusiqueRank } from "../services/musique";

// 创建store实例
const recommendStore = new EventStore({
    state: {
        recommend: {}
    },
    actions: {
        async fetchRecommend(ctx){
            let { playlist } = await getMusiqueRank(3778678);
            ctx.recommend = playlist;
        }
    }
});

export default recommendStore;