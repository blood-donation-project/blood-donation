const calculatePostTime = (postTime) => {
    const currentTime = new Date();
    const timeDiff = currentTime - new Date(postTime);

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    if (timeDiff < minute) {
        return 'Vừa xong';
    } else if (timeDiff < hour) {
        const minutesAgo = Math.floor(timeDiff / minute);
        return `${minutesAgo} phút`;
    } else if (timeDiff < day) {
        const hoursAgo = Math.floor(timeDiff / hour);
        return `${hoursAgo} giờ`;
    } else if (timeDiff < week) {
        const daysAgo = Math.floor(timeDiff / day);
        return `${daysAgo} ngày`;
    } else {
        const postDate = new Date(postTime);
        const monthNames = [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ];
        const month = monthNames[postDate.getMonth()];
        const day = postDate.getDate();
        const year = postDate.getFullYear();
        const formattedDate = `${day} ${month}`;
        if (year !== currentTime.getFullYear()) {
            return `${formattedDate}, ${year}`;
        } else {
            return formattedDate;
        }
    }
};

export default calculatePostTime;
