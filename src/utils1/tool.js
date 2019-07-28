// 表格列数据为空处理
const formatCellValue = (row, column, cellValue) => {
    if(cellValue !== null && cellValue !== undefined && cellValue !== '') {
        return cellValue;
    } else {
        return '--';
    }
};
// 时间格式化
const formatTime = (format) => {
    const date = new Date();
    const args = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),  //quarter
        'S': date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let i in args) {
        const n = args[i];
        if (new RegExp('(' + i + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length));
        }
        }
        return format;
    }
};
  // 将微妙转成时分秒
  export  function formatTimechange (mss) {
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        hours = hours > 9 ? hours : '0'+hours
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        minutes = minutes > 9 ? minutes : '0' + minutes
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
        seconds = seconds > 9 ? seconds : '0' + seconds
    return  hours + ":" + minutes + ":" + seconds;
};

export {
    formatTime,
    formatCellValue,
}