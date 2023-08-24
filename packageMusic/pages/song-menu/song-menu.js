import { getSongCategory, getSongList } from "../../../services/musique";
Page({
    data: {
        songList: []
    },
    onLoad(){
        this.fetchAllSongList();
        wx.setNavigationBarTitle({
          title: '热门歌单',
        })
    },
    async fetchAllSongList(){
        let { tags } = await getSongCategory();
        let songPromise = [];
        for(let item of tags){
            let name = item.name;
            songPromise.push(getSongList(name));
        }
        Promise.all(songPromise).then(response => {
            this.setData({
                songList: response
            });
        })
    }
})