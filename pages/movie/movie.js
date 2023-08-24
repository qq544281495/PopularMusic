// pages/movie/movie.js
import { getMovieRank } from "../../services/movie";
Page({
    data: {
        movieList: [],
        offset: 0,
        limit: 20,
        hasMore: true, // 判断是否存在更多数据
    },
    onLoad(){
        this.fetchMovieRank();
    },
    async fetchMovieRank(){
        // 获取数据
        let { data, hasMore } = await getMovieRank(this.data.offset, this.data.limit);
        // 组装数据
        let newMovieList = [...this.data.movieList, ...data];
        // 赋值数据
        this.setData({
            hasMore,
            movieList: newMovieList
        });
        this.data.offset = this.data.movieList.length;
    },
    // 触底加载更多数据
    onReachBottom(){
        // 存在更多数据再请求
        if(this.data.hasMore){
            this.fetchMovieRank();
        }
    },
    // 下拉刷新
    async onPullDownRefresh(){
        // 初始化数据
        this.data.offset = 0;
        this.data.hasMore = true;
        this.setData({
            movieList: []
        });
        // 重新请求数据
        await this.fetchMovieRank();
        // 重新获取到数据后停止下拉刷新
        wx.stopPullDownRefresh();
    }
}) 