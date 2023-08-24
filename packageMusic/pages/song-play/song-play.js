import { getSongDetail, getLyric } from "../../../services/play";
import queryElement from "../../../utils/queryElement";
import { throttle } from "underscore";
import { parseLyric } from "../../../utils/parseLyric";
import listStore from "../../../store/listStore";

const app = getApp();
// 创建播放器
const audioContext = wx.createInnerAudioContext();

Page({
    data: {
        id: 0,
        activeSwiper: 0,
        playHeight: 0,
        songLyric: "",
        lyricInfo: [],
        songDetail: {},
        durationTime: 0,
        currentTime: 0,
        sliderValue: 0,
        isMoveSlider: false,
        isPlaying: true,
        imageHeight: 0,
        currentLyricText: "",
        currentLyricIndex: 0,
        currentScroll: 0,
        currentSongIndex: 0,
        songList: [],
        modeIndex: 0,
        modeList: [
            { name: "sequence", title: "列表播放" },
            { name: "recycle", title: "循环播放" },
            { name: "random", title: "随机播放" },
        ],
        showToast: false,
        timer: null,
        show: false
    },
    onLoad(options){
        this.setData({ id: options.id });
        this.fetchLyric();
        this.fetchSongDetail();
        // 获取歌词初始显示高度
        const playHeight = app.globalData.playHeight;
        this.setData({ playHeight });
        this.playSong();
        this.monitorSong();
        this.getImage();
        listStore.onState("currentIndex", (response) => {
            this.setData({
                currentSongIndex: response
            })
            this.changeCureentSong();
        });
        listStore.onState("songList", (response) => {
            this.setData({
                songList: response
            })
        });
    },
    // 获取歌曲详情
    async fetchSongDetail(){
        let { songs } = await getSongDetail(this.data.id);
        this.setData({
            songDetail: songs[0],
            durationTime: songs[0].dt
        });
    },
    // 获取歌曲歌词
    async fetchLyric(){
        let { lrc } = await getLyric(this.data.id);
        this.setData({
            songLyric: lrc.lyric,
            lyricInfo: parseLyric(lrc.lyric)
        });
    },
    // 设置播放源
    playSong(){
        // 每次播放歌曲将前置歌曲结束
        audioContext.stop();
        // 设置音乐播放地址
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`;
        this.setData({
            isPlaying: true
        });
    },
    // 监听播放器
    monitorSong(){
        // 设置自动播放
        audioContext.autoplay = true;
        // 监听播放进度
        const throttleUpdateProgress = throttle(this.updateProgress, 500, { leading: false, trailing: false });
        audioContext.onTimeUpdate(() => {
            if(!this.data.isMoveSlider){
                throttleUpdateProgress();
            }
            // 实时显示歌词
            this.getCurrentLyric();
        });
        // 监听歌曲缓存等待时暂停
        audioContext.onWaiting(() => {
            audioContext.pause();
        });
        // 监听歌曲缓存完成进行播放
        audioContext.onCanplay(() => {
            audioContext.play();
        });
        // 监听歌曲结束自动播放
        audioContext.onEnded(() => {
            this.changeCurrentSong();
        });
    },
    // 获取当前播放歌词
    getCurrentLyric(){
        if(!this.data.lyricInfo.length) return;
        let index = this.data.lyricInfo.length - 1;
        for(let i = 0; i < this.data.lyricInfo.length; i++){
            const info = this.data.lyricInfo[i];
            if(info.time > audioContext.currentTime * 1000){
                index = i - 1;
                break;
            }
        }
        if(index === this.data.currentLyricIndex) return;
        const currentLyricText = this.data.lyricInfo[index].text;
        this.setData({
            currentLyricText,
            currentLyricIndex: index,
            currentScroll: index * 36
        });
    },
    // 更新播放滑块
    updateProgress(){
        // 修改sliderValue
        const sliderValue = (this.data.currentTime / this.data.durationTime) * 100;
        this.setData({
            // 记录当前播放时间
            currentTime: audioContext.currentTime * 1000,
            sliderValue
        });
    },
    // 点击滑块修改音乐播放进度
    clickSlider(event){
        const value = event.detail.value;
        const currentTime = (value / 100) * this.data.durationTime;
        const skipTime = currentTime / 1000; 
        audioContext.seek(skipTime);
        this.setData({
            currentTime,
            isMoveSlider: false,
            sliderValue: value,
            isPlaying: true
        });
    },
    // 移动滑块(拖动滑块结束会触发clickSlider)
    moveSlider: throttle(function(event){
        const value = event.detail.value;
        const currentTime = (value / 100) * this.data.durationTime;
        this.setData({
            currentTime,
            isMoveSlider: true
        })
    },100),
    // 暂停 | 播放音乐
    changePlayStatus(){
        if(this.data.isPlaying && !audioContext.paused){
            audioContext.pause();
            this.setData({
                isPlaying: false
            });
        }else{
            audioContext.play();
            this.setData({
                isPlaying: true
            });
        }
    },
    // 切换上一首 | 下一首索引
    changeCurrentSong(event){
        let index = -1;
        if(event) index = event.currentTarget.dataset.index;
        const length = this.data.songList.length - 1;
        let currentIndex = this.data.currentSongIndex;
        if(this.data.modeIndex == 1 && !event){
            // 循环播放
            currentIndex = currentIndex;
        }else if(this.data.modeIndex == 0 || this.data.modeIndex == 1 ){
            // 列表播放模式 & 循环播放时手动切换
            currentIndex += index;
            if(currentIndex < 0) currentIndex = length;
            if(currentIndex > length) currentIndex = 0;
        }else if(this.data.modeIndex == 2){
            // 随机播放模式
            currentIndex = Math.floor(Math.random()*length);
        }
        listStore.dispatch("changeIndex", currentIndex);
        this.setData({
            id: this.data.songList[currentIndex].id,
            songDetail: {},
            currentTime: 0,
            durationTime: 0,
            sliderValue: 0,
        });
        this.fetchSongDetail();
        this.fetchLyric();
        this.playSong();
    },
    // 切换播放模式
    changPlayMode(){
        if(this.data.timer) clearTimeout(this.data.timer);
        let index = this.data.modeIndex + 1;
        let length = this.data.modeList.length - 1;
        if(index > length){
            index = 0
        };
        this.setData({
            modeIndex: index,
            showToast: true
        });
        this.data.timer = setTimeout(()=>{
            this.setData({
                showToast: false
            });
        }, 1000);
    },
    changeCureentSong(){
        if(this.data.songList[this.data.currentSongIndex] === undefined) return;
        this.setData({
            id: this.data.songList[this.data.currentSongIndex].id,
            songDetail: {},
            currentTime: 0,
            durationTime: 0,
            sliderValue: 0,
            show: false
        });
        this.fetchSongDetail();
        this.fetchLyric();
        this.playSong();
    },
    async getImage(){
        const response = await queryElement(".image");
        const element  = response[0];
        this.setData({
            imageHeight: element.width
        });
    },
    changeSwiper(event){
        this.setData({
            activeSwiper: event.detail.current
        });
    },
    clickSwiper(event){
        const { index } = event.currentTarget.dataset;
        this.setData({
            activeSwiper: index
        });
    },
    skipBack(){
        wx.navigateBack();
    },
    changePlayList(){
        let flag = this.data.show;
        this.setData({
            show: !flag
        });
    }
})