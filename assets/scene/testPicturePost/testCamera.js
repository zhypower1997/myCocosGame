// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import qs from 'qs';

cc.Class({
    extends: cc.Component,

    properties: {
        labelText: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start() {


    },
    myWindow() {

        this.httpPost('https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=24.8c5cd43a2ec3ebe301285820c8cf2138.2592000.1620714650.282335-23969493', qs.stringify({
            url: 'https://news.ecnu.edu.cn/_upload/article/images/a9/bf/5868006c46aea2d85a30a19c0a2b/1bbb286b-d8e6-4a35-a8d4-4160e0fcf891.jpg'
        }), this.funBack.bind(this));
    },

    funBack(t) {

        console.log(this.labelText.string = JSON.parse(t).result[0].name)
    },
    //https://www.guodongkeji.com/newsshow-35-4052-1.html
    httpPost(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                callback(xhr.response);
            }
        };
        xhr.open("POST", url, true);
        xhr.timeout = 5000; // 5 seconds for timeout
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }

    // update (dt) {},
});