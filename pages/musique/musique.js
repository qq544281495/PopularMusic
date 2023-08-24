// pages/musique/musique.js
import { getBanner, getSongList } from "../../services/musique";
import queryElement from "../../utils/queryElement";
import { throttle } from "underscore";
import recommendStore from "../../store/recommendStore";
import rankStore from "../../store/rankStore";
import listStore from "../../store/listStore";
const queryElementThrottle = throttle(queryElement, 100);
Page({
    data: {
        search: "",
        banners: [],
        bannerHeight: 130,
        recommendList: [],
        hotSongList: [],
        rankSongInfo: {},
        isRankData: false
    },
    onLoad(){
        this.fetchBanner();
        // 监听推荐歌曲数据
        recommendStore.onState("recommend", this.handleRecommend);
        // 获取推荐歌曲
        recommendStore.dispatch("fetchRecommend");
        // 获取热门歌单
        this.fetchHotSong();
        // 获取榜单
        rankStore.dispatch("fetchRank");
        // 监听榜单数据
        rankStore.onState("newSong", this.handleRankSong("newSong"));
        rankStore.onState("originalSong", this.handleRankSong("originalSong"));
        rankStore.onState("surgeSong", this.handleRankSong("surgeSong"));
    },
    onUnload(){
        recommendStore.offState("recommend", this.handleRecommend);
        recommendStore.offState("newSong", this.handleRankSong("newSong"));
        recommendStore.offState("originalSong", this.handleRankSong("originalSong"));
        recommendStore.offState("surgeSong", this.handleRankSong("surgeSong"));
    },
    // 获取轮播图
    async fetchBanner(){
        let { banners } = await getBanner();
        this.setData({
            banners
        });
    },
    // 动态设置轮播图高度
    async getElementInfo(){
        let response = await queryElementThrottle(".banner-image");
        this.setData({
            bannerHeight: response[0].height
        });
    },
    // 获取热门歌单
    async fetchHotSong(){
        let { playlists } = await getSongList();
        this.setData({
            hotSongList: playlists
        });
    },
    // 跳转更多推荐歌曲
    skipRecommendMore(){
        wx.navigateTo({
          url: '/pages/song-rank/song-rank?type=recommend',
        })
    },
    handleRecommend(value){
        if(value.tracks){
            this.setData({
                recommendList: value.tracks.slice(0 ,6)
            });
        }
    },
    handleRankSong(rank){
        return value => {
            if(!Object.keys(value).length) return;
            this.setData({
                isRankData: true
            });
            const newRankSong = { ...this.data.rankSongInfo, [rank]: value };
            this.setData({
                rankSongInfo: newRankSong
            });
        }
    },
    // 将推荐歌曲保存到歌曲列表
    saveSongList(event){
        const { index } = event.currentTarget.dataset;
        listStore.dispatch("changeIndex", index);
        listStore.dispatch("changeSongList", this.data.recommendList);
    }
})