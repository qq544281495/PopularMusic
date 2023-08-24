const app = getApp();
Component({
    options: {
        multipleSlots: true
    },
    properties: {

    },
    data: {
        statusHeight: 0,
    },
    methods: {
        skipBack(){
            this.triggerEvent("skipBack");
        }
    },
    lifetimes: {
        attached(){
            const statusHeight = app.globalData.statusHeight;
            this.setData({
                statusHeight
            });
        }
    }
})
