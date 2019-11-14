/**
 * Created by xiaohua.Mao on 2017/7/24.
 */
let _ = require('lodash');

let util = {
    checkPhone: phone => {
        const reg = /^1(3|4|5|7|8)\d{9}$/;
        if (reg.test(phone)) return true;
        return false;
    },
    addDocTitle: title => {
        document.title = title;
    },
    session: {
        set (key, value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            sessionStorage.setItem(key, value);
        },
        get (key) {
            let value = sessionStorage.getItem(key);
            if (value !== null && (value.indexOf('{') === 0 || value.indexOf('[') === 0)) {
                value = JSON.parse(value);
            }
            return value;
        },
        remove (key) {
            sessionStorage.removeItem(key);
        }
    },
    formatDate: (date, fmt) => {
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    getUrlArgs: () => {
        let args = {};
        let index = location.href.indexOf('?');
        let query = location.href.substring(index + 1);
        let pairs = query.split('&');
        for (let i = 0; i < pairs.length; i++) {
            let pos = pairs[i].indexOf('=');
            if (pos === -1) continue;
            let argname = pairs[i].substring(0, pos);
            let value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args;
    },
    getPermissions (userRoles) {
        let permissions = {};
        let len = userRoles.length;
        for (let i = 0; i < len; i++) {
            let currentPermissions = userRoles[i].rolePermissions;
            if (currentPermissions) {
                let length = currentPermissions.length;
                for (let j = 0; j < length; j++) {
                    permissions[currentPermissions[j].name] = true;
                }
            }
        }
        return permissions;
    },
    getHierarchyLevel: function (hierarchy) {
        let max = _.keys(hierarchy).length - 1;
        return 'level_' + max;
    },
    roundNum: (number, bit) => {
        number = parseFloat(number);
        bit = parseInt(bit);
        if (isNaN(number) || isNaN(bit)) return;
        let pow = Math.pow(10, bit);
        number = Math.round(number * pow) / pow;
        return number;
    },
    vidScreenShot: postUrl => {
        return postUrl || '/img/default_video_shot.png';
    },
    saveRectInfo: (myStyle, areaInfo) => {
        let rect = {
            left: util.roundNum(Number(myStyle.left) / areaInfo.width * 100, 3),
            top: util.roundNum(Number(myStyle.top) / areaInfo.height * 100, 3),
            width: util.roundNum(Number(myStyle.width) / areaInfo.width * 100, 3),
            height: util.roundNum(Number(myStyle.height) / areaInfo.height * 100, 3),
            zIndex: Number(myStyle.zIndex) || 1
        };
        return rect.left + "," + rect.top + "," + rect.width + "," + rect.height + "," + (rect.zIndex || 1);
    },
    getRectInfo: (rect, areaInfo) => {
        let rectArr = rect.split(',');
        return {
            left: Math.round(Number(rectArr[0]) * areaInfo.width / 100),
            top: Math.round(Number(rectArr[1]) * areaInfo.height / 100),
            width: Math.round(Number(rectArr[2]) * areaInfo.width / 100),
            height: Math.round(Number(rectArr[3]) * areaInfo.height / 100),
            zIndex: rectArr[4] || 1
        };
    },
    getDuration: mats => {
        let duration = 0;
        mats.forEach(mat => {
            duration += Number(mat.duration);
        });
        return {
            min: Math.floor(parseInt(duration) / 60),
            sec: parseInt(duration) % 60
        };
    },
    getDayStart: (date, days) => {
        let dayStart = date ? new Date(date) : new Date();
        days && dayStart.setDate(dayStart.getDate() - days);
        dayStart.setHours(0);
        dayStart.setMinutes(0);
        dayStart.setSeconds(0);
        dayStart.setMilliseconds(0);
        return dayStart;
    },
    getDayEnd: (date, days) => {
        let dayEnd = date ? new Date(date) : new Date();
        dayEnd.setDate(dayEnd.getDate() + (days || 0));
        dayEnd.setHours(23);
        dayEnd.setMinutes(59);
        dayEnd.setSeconds(59);
        dayEnd.setMilliseconds(999);
        return dayEnd;
    },
    filterMatUrl: url => {
        if (!url) return;
        let index = url.indexOf('?');
        if (index === -1) return url + '?';
        return url.slice(0, index + 1);
    }
};

export default util;
