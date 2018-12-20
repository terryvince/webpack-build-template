/*
  http://hi.baidu.com/%BE%B2%D0%C4%C0%CF%C8%CB/creat/blog?a=1&b=2&url=https://www.baidu.com?c=1/#/login
  ([?][\w,=,.,&,$,+,-,:,/,?,%]*)(?=[#])*  ?a=1&b=2&url=https://www.baidu.com?c=1/ 查询参数不能含有#，否则匹配字符串不能达到预期
  str.substring(1).split('&')                     去掉，并按&切割分组["ctr=Plan.GetAdmInfo", "BnId=2", "inajax=1"]
  ^([\w,_,$]*)(?=[=])                             匹配=前的字符串
  =[\w,\W]*                                       含=后的任何字符串
*/
class ParserQuery {
    // get query object
    get (url) {
        let query = {};
        if (url.test(/[?]/)) {
            let search = url.match(/([?][\w,=,.,&,$,+,-,:,/,?,%]*)(?=[#])*/g)[0];
            search = search.endsWith('/') ? search.slice(0, -1) : search;
            let arr = search.substring(1).split('&');
            arr.forEach((v) => {
                let key = decodeURIComponent(v.match(/^([\w\W]*)(?=[=])/g)[0]);
                let val = decodeURIComponent(v.match(/=[\w\W]*/g)[0].slice(1));
                query[key] = val;
            });
        }
        return query;
    }
    // reset search string
    reset (url, ob) {
        if (url.test(/[?]/)) {
            let index = url.indexOf('?');
            url = url.slice(0, index);
        }
        url += '?';
        Object.keys(ob).forEach((k) => {
            url = url + k + '=' + ob[k] + '&';
        });
        return url.slice(0, -1);
    }
    // set one of search string
    set (url, ob) {
        let oldQuery = this.get(url);
        Object.assign(ob, oldQuery);
        return this.reset(url, ob);
    }
}

export default ParserQuery;
