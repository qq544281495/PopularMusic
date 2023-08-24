// components/song-item/song-item.js
Component({
    properties: {
        itemData: {
            type: Object,
            value: {}
        }
    },
    data: {

    },
    methods: {
        skipPlay(){
            const id = this.properties.itemData.id;
            wx.navigateTo({
              url: `/packageMusic/pages/song-play/song-play?id=${id}`,
            })
        }
    }
})
