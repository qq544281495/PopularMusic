// components/song-list/song-list.js
Component({
    properties: {
        itemData: {
            type: Object,
            vlaue: {}
        }
    },
    data: {

    },
    methods: {
        skipSongRank(){
            const id = this.properties.itemData.id;
            wx.navigateTo({
                url: `/packageMusic/pages/song-rank/song-rank?type=menu&id=${id}`,
            })
        }
    }
})
