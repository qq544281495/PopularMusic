// components/play-list/play-list.js
import listStore from "../../store/listStore";
Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
    },
    data: {
        currentSongIndex: 0,
        songList: [],
    },
    methods: {
        changeShow(){
            this.triggerEvent("changeShow");
        },
        changeCurrentSong(event){
            const { index } = event.currentTarget.dataset;
            listStore.dispatch("changeIndex", index);
        },
    },
    ready(){
        listStore.onState("currentIndex", (response) => {
            this.setData({
                currentSongIndex: response
            })
        });
        listStore.onState("songList", (response) => {
            this.setData({
                songList: response
            })
        });
    }
})
