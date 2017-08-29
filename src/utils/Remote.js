/**
 * 定义远程访问组件。
 *
 */

import Axios from 'axios';
import Qs from 'qs';
import Cookie from './Cookie';
import Config from '../config/config.json';
import Iterator from './Iterator';
import Toolkit from './Toolkit';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
};

const axios = Axios.create();

/**
 * 获取当前所处环境。
 * @return string
 */
const getEnv = () => {
    const domain = window.location.host;
    // if (/^.*front_local.*?\..*$/g.test(domain)) {
    //     return 'dev';
    // }
    // return '';
    return 'dev';
};

/**
 * 定义生成http query string的方法
 * @param queryData Object query参数
 * @return string query字符串
 */
const genQuery = (queryData) => {
    if (Toolkit.isEmpty(queryData)) return '';
    let ret = '';
    // 防止IE接口缓存，加上时间戳
    // if (Device.isIE()) queryData.timestamp = new Date().getTime();
    Iterator.each(queryData, (val, key) => {
        ret += `&${key}=${encodeURIComponent(val)}`;
    });
    return ret.replace(/&/, '?');
};

/**
 *  依照环境生成域名
 *  @return string
 */
const genDomainForEnv = () => {
    const env = getEnv();
    let domain = `${Config.api.protocol}://${Config.api.domain}`;
    domain = env === 'dev' ? `${domain}` : '';      // http://realm.io
    return domain;
};

/**
 * HTTP 请求远端数据。
 * @return Promise
 */
const http = (method, url, data, type = 'json') => {
    if (!url) return null;
    let sendURL = url;
    const send = axios.request;
    const config = {
        url: sendURL,
        // withCredentials: true,
        headers: { 'X-CSRF-Token': Cookie.get('_csrf') || '' },
        method,
    };
    if (method === METHOD.GET) {
        sendURL += genQuery(data);
        config.url = sendURL;
    } else {
        let contentType = '';
        let cfgData = data;
        switch (type) {
            case 'json':
                contentType = 'application/json';
                cfgData = JSON.stringify(data || {});
                break;
            case 'file':
                contentType = 'multipart/form-data';
                cfgData = new FormData();
                Iterator.each(data, (v, k) => {
                    cfgData.append(k, v);
                });
                break;
            case 'formData':
                contentType = 'application/x-www-form-urlencoded';
                config.transformRequest = [(requestData) => {
                    const ret = Qs.stringify(requestData, { arrayFormat: 'brackets' });
                    return ret;
                }];
                break;
            default:
                break;
        }
        config.headers = {
            'Content-Type': contentType,
        };
        config.data = cfgData;
    }
    return new Promise((resolve, reject) => {
        // Log.debug(`请求接口[${config.method}-${type}-${sendURL}]！`);
        send(config).then((resp) => {
            const respData = resp.data;
            // Log.debug(`请求接口成功[${config.method}-${sendURL}], ${JSON.stringify(respData)}`);
            resolve(respData);
        }).catch((err) => {
            // Log.error(`请求接口[${sendURL}]异常！`);
            reject({
                error: -1,
                // reason: `网络异常或服务器错误: [${err.message}]`,
            });
        });
    });
};

export default class Remote {
    // static domain = genDomainForEnv();
    static domain = 'http://139.199.188.155';
    /**
     * HTTP GET 远端数据。
     */
    static get(url, data) {
        return http(METHOD.GET, `${url}`, data);
    }

    /**
     * HTTP POST 远端数据。
     */
    static post(url, data, type = 'json') {
        return http(METHOD.POST, `${this.domain}${url}`, data, type);
    }
}
