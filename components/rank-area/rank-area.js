// components/rank-area/rank-area.js
Component({
    properties: {
        itemData: {
            type: Object,
            value: {}
        },
        key: {
            type: String,
            value: "newSong"
        }
    },
    data: {

    },
    methods: {
        skipRankPage(){
            wx.navigateTo({
              url: `/packageMusic/pages/song-rank/song-rank?type=rank&key=${this.properties.key}`,
            })
        }
    }
})
