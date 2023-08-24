import { EventStore } from "event-store-save";

export const audioContext = wx.createInnerAudioContext();

const listStore = new EventStore({
    state: {
        currentIndex: 0,
        songList: []
    },
    actions: {
        changeSongList(ctx, value){
            ctx.songList = value;
        },
        changeIndex(ctx, value){
            ctx.currentIndex = value;
        }
    }
});

export default listStore;