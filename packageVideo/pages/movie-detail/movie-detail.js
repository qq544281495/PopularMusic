// pages/movie-detail/movie-detail.js
import { getMovieUrl, getMovieInfo, getMovieRelated } from "../../../services/movie";
Page({
    data:{
        id: 0,
        movieUrl: "",
        movieInfo: {},
        movieRelated: [
            {id: 14636451, coverUrl: "http://p1.music.126.net/jc959fySJnMcEEwRCn0Fgg==/109951168697558971.jpg",playCount: "2020886", title: "张碧晨《笼》（电影《消失的她》片尾主题曲）MV"},
            {id: 14650618, coverUrl: "http://p1.music.126.net/Ddwign4f7BQuqyx7hXpS3w==/109951168823361213.jpg",playCount: "41764", title: "野"},
            {id: 14646095, coverUrl: "http://p1.music.126.net/4taLim-QCFGlQveGjTSmtQ==/109951168753335960.jpg",playCount: "126573", title: "海边探戈"},
            {id: 14647873, coverUrl: "http://p1.music.126.net/T3PX5yjAQFt6aTvfb2x1yw==/109951168769015684.jpg",playCount: "67879", title: "热爱全开音乐节 全程回顾"},
        ]
    },
    onLoad(options){
        this.setData({
            id: options.id
        });
        // 获取音乐MV地址
        this.fetchMovieUrl();
        // 获取音乐相关信息
        this.fetchMovieInfo();
        // 获取相关视频
        this.fetchMovieRelated();
    },
    async fetchMovieUrl(){
        let { data } = await getMovieUrl(this.data.id);
        this.setData({
            movieUrl: data.url
        });
    },
    async fetchMovieInfo(){
        let { data } = await getMovieInfo(this.data.id);
        this.setData({
            movieInfo: data
        });
    },
    async fetchMovieRelated(){
        let { data } = await getMovieRelated(this.data.id);
        const newRelated = [...this.data.movieRelated, ...data];
        this.setData({
            movieRelated: newRelated
        });
    },
    skipDetail(event){
        const { id } = event.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/movie-detail/movie-detail?id=${id}`,
        })
    }
})