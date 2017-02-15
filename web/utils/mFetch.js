/**
 * Created by dandan.wu on 16/9/21.
 */
import 'es6-promise'
import fetch from 'isomorphic-fetch'

const ADAPTER_URL = 'http://10.10.61.193:10001';

export function fetch_get_with_params(url,params){
    let url2 = url;
    if(params.length > 0){
        url2 = url2 + '?'+params[0]['key']+'='+params[0]['value'];
        for(let i=1;i<params.length;i++){
            url2  = url2 + '&' + params[i]['key']+'='+params[i]['value'];
        }
    }
    return this.fetch_get(url2);
}

export function fetch_post_png(url,data){
    return this.fetch_post(url,data,true);
}

export function fetch_post(url,data,isPng=false){
    console.log(data);
    let url2 = `${ADAPTER_URL}/${url}`;
    let ContentType = isPng ? 'image/png' : 'application/x-www-form-urlencoded';
    return fetch(url2,{
            headers: {
                "Content-Type":ContentType,
            },
            method: 'post',
            body:data
        }
    )
    .then(response => response,
        err => {
            throw Error(url + ' post error :'+err);
        }
    )
    .then(response => {
        return response.json().then(json => {
            response.content = json;
            return response;
        })
    })
    .then(response => {
        return response
    })
    .then(response => filterHttpStatusResponse(response, url))
    .then(response => filterResponseJson(response.content, url))
    .then(result=>{
        return result;
    })
}

export function fetch_get(url){
    console.log(url);
    let url2 = `${ADAPTER_URL}/${url}`;
    return fetch(url2,{
        headers: {
            Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        },
        method: 'get'
    })
    .then(response => response,
        err => {
            throw new Error('fetch error:' + err);
        }
    )
    .then(response => filterHttpStatusResponse(response,url))
    .then(response =>response.json())
    .then(response=>filterResponseJson(response,url))
    .then(result => {
        return result;
    })
}

function filterHttpStatusResponse(response,url) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    var error = null;
    if (response.status == 410) {
        error = new Error('error 410', response.statusText, response.content);
    } else if (response.status == 401) {
        error = new Error('error 401', response.statusText, response.content);
    }
    else {
        error = new Error('http error', response.statusText, response.content);
    }
    error.response = response;
    console.warn(`${url} Error: http status error ${response.statusText}`);
    throw error;
}

function filterResponseJson(resJson,url){
    if(resJson.hasOwnProperty('Data')){
        if(resJson.hasOwnProperty('pageSize')) {
            return {data: resJson.Data, pageSize: resJson.pageSize};
        } else {
            return {data:resJson.Data};
        }
    }
    else if (resJson.success) {
        return resJson.data || resJson.message;
    } else {
        console.error(`${url} Error: resJson.message ${resJson.message}`);
        throw new Error('获取数据失败', resJson.message);
    }
}