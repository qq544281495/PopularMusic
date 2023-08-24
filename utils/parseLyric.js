const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
export function parseLyric(lyric){
    const lyricInfo = [];
    const lyricLine = lyric.split("\n");
    for(const item of lyricLine){
        if(item === "") continue;
        const result = timeReg.exec(item);
        const minute = result[1] * 60 * 1000;
        const second = result[2] * 1000;
        const msec = result[3].length === 2 ? result[3] * 10 : result[3] * 1;
        const time = minute + second + msec; // 计算时间毫秒数
        const text = item.replace(timeReg, "");
        lyricInfo.push({
            time,
            text
        });
    }
    return lyricInfo;
}