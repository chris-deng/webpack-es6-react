/**
 * 定义cookie组件
 */

export default class Cookie {
    static vars = {
        keypre: '',     // 自定义cookie前缀
        domain: '',     // 自定义cookie域
    };
    /*
     * 判断cookie中是否有指定数据
     */
    static hasKye(name) {
        const oName = Cookie.vars.keypre ? Cookie.vars.keypre + name : name;
        const result = document.cookie.match(new RegExp(`(^| )${oName}=`));
        if (result !== null) {
            return true;
        }
        return false;
    }
    /*
     * 获取cookie
     */
    static get(name) {
        const oName = Cookie.vars.keypre ? Cookie.vars.keypre + name : name;
        const result = document.cookie.match(new RegExp(`(^| )${oName}=([^;]*)(;|$)`));
        if (result !== null) {
            return decodeURIComponent(result[2]);
        }
        return null;
    }
    /*
     * 设置cookie
     * name: cookie名称
     * value: cookie值
     * seconds: cookie 有效期（秒）
     */
    static set(oName, oValue, oSeconds) {
        let date = null;
        let expires = '';
        let domain = '';
        let path = '';

        const seconds = oSeconds || 0;
        if (typeof seconds === 'number') {
            date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = `; expires=${date.toGMTString()}`;
        }

        if (Cookie.vars.domain) domain = `; domain=${Cookie.vars.domain}`;

        path = '; path=/';

        const name = Cookie.vars.keypre ? Cookie.vars.keypre + oName : oName;
        const value = escape(oValue);
        document.cookie = `${name}=${value + expires + domain + path}`;
    }
}