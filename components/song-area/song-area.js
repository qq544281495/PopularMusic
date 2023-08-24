// components/song-area/song-area.js
const app = getApp();
Component({
    properties: {
        title: {
            type: String,
            value: "热门歌单"
        },
        songList: {
            type: Array,
            value: []
        }
    },
    data: {
        screenWidth: 0
    },
    lifetimes: {
        attached(){
            this.setData({
                screenWidth: app.globalData.screenWidth
            });
        }
    },
    methods: {
        skipMoreSong(){
            wx.navigateTo({
              url: '/packageMusic/pages/song-menu/song-menu',
            })
        }
    }
})
