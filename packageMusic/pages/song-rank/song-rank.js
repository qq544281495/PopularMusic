// pages/rank-detail/rank-detail.js
import recommendStore from "../../../store/recommendStore";
import rankStore from "../../../store/rankStore";
import listStore from "../../../store/listStore";
import { getSongListDetail } from "../../../services/musique";
Page({
    data: {
        type: "",
        key: "",
        id: "",
        rankSong: {}
    },
    onLoad(options){
        this.setData({
            type: options.type,
            key: options.key,
            id: options.id
        });
        // 推荐歌曲
        if(this.data.type ===  "recommend"){
            recommendStore.onState("recommend", this.handleRankSong);
        }
        // 巅峰榜
        if(this.data.type === "rank"){
            rankStore.onState(this.data.key, this.handleRankSong)
        }
        // 歌单详情
        if(this.data.type === "menu"){
            this.fetchListDetail();
        }
    },
    onUnload(){
        if(this.data.type === "recommend"){
            recommendStore.offState("recommend", this.handleRankSong);
        }else if(this.data.type === "rank"){
            rankStore.offState(this.data.key, this.handleRankSong);
        }
    },
    async fetchListDetail(){
        let { playlist } = await getSongListDetail(this.data.id);
        this.setData({
            rankSong: playlist
        });
    },
    handleRankSong(value){
        this.setData({
            rankSong: value
        });
        wx.setNavigationBarTitle({
          title: value.name
        })
    },
    // 将推荐歌曲保存到歌曲列表
    saveSongList(event){
        const { index } = event.currentTarget.dataset;
        listStore.dispatch("changeIndex", index);
        listStore.dispatch("changeSongList", this.data.rankSong.tracks);
    }
})