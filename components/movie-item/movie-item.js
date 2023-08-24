// components/movie-item/movie-item.js
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
        skipDetail(){
            const item = this.properties.itemData;
            wx.navigateTo({
              url: `/packageVideo/pages/movie-detail/movie-detail?id=${item.id}`,
            })
        }
    },
})
