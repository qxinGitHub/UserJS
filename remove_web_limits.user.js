// ==UserScript==
// @namespace         https://greasyfork.org/zh-CN/users/106222-qxin-i

// @name              网页限制解除(改)
// @name:en           Remove web limits
// @name:zh           网页限制解除
// @name:ja           ウェブの規制緩和

// @author            Cat73&iqxin(修改)
// @contributor       iqxin

// @description       通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73，因为和搜索跳转脚本冲突，遂进行了改动，改为黑名单制。
// @description:en    Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.
// @description:zh    通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73，因为和搜索跳转脚本冲突，遂进行了改动，改为黑名单制。
// @description:zh-CN 通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73，因为和搜索跳转脚本冲突，遂进行了改动，改为黑名单制。
// @description:zh-TW 通殺大部分網站，可以解除禁止復制、剪切、選擇文本、右鍵菜單的限制。
// @description:ja    サイトのほとんどを殺すために渡し、あなたは、コピー切り取り、テキスト、右クリックメニューを選択することは禁止の制限を解除することができます。

// @description       原作者https://www.github.com/Cat7373/，因为和搜索跳转脚本冲突，遂进行了改动
// @homepageURL       https://cat7373.github.io/remove-web-limits/
// @supportURL        https://greasyfork.org/zh-CN/scripts/28497

// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABpElEQVR4nO3Vv2uUQRDG8c/ebSMWqay0trATAxrUSi1S2AiWFoJYpNCgoBjURsHWJKeNRfAvsDgFixQqKdPZ2ViEiCJYBOQu8f1hEXO59713j7MUfLZ6d2a/O8vMO0OzDnin9Ku2Mjvuaw07xgSAYEVXe2indMhj92zpKJLnBhF8MDeye9hn6zbN70eRiqCw02Bra3up8BBLu1FEBxsBucXqW4csz0ULe4jorSCMuPU89boRELDMHiI6Y8V65bbCUTccc70RkaOwKLOg0IkyXa9qTjOu2LAs6NZuD86hrdTyxRNTkUqqdhXlHrngGRVEZsMpJwex9DxIZSHYclesIb65LCoHgIs66UJq6btDBZHZrPh8V6YBOX66LbOkTGckBYimBW2FVTNeuOZNyrFJ236Yl4NSy5SbVm1PDvhodqgyMledTdRlAtDzqfL9tfkwUtyaRkv9LwFj9B/w7wPycXOhqlJ0yZHKPChMi5MCiM47XhsopbVJAUHfrYbmN/EToN+02eLPfz9OYyZhFJzW1Jn3lTsxaKQjCkp52jy45r1ZvSbTb9M0d4PBozGZAAAAAElFTkSuQmCC

// @version           2.4.6
// @license           LGPLv3

// @compatible        chrome Chrome_46.0.2490.86 + TamperMonkey + 脚本_1.3 测试通过
// @compatible        firefox Firefox_42.0 + GreaseMonkey + 脚本_1.2.1 测试通过
// @compatible        opera Opera_33.0.1990.115 + TamperMonkey + 脚本_1.1.3 测试通过
// @compatible        safari 未测试

// @match             *://*/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_deleteValue
// @run-at      document-end
// ==/UserScript==
(function() {
    'use strict';



//-------------------------------------------------------------------添加 start
    function test(){
        var black_list_user = GM_getValue("list_user");
        console.log(black_list_user);
    }

  // 检查, 此處應將數組改為 Set 結構(2017-05-16，因為懶，所以不想動)
    function black_check(bool){
        var hostname = window.location.hostname;
        var check = check_black_list(list,hostname);

        // console.log("check: ",check);
        // console.log(list);

        if (bool && !check) {
            list = list.concat(hostname);
            // console.log("选中 不在黑名单, 增加",hostname,list);
        }else if(!bool && check){
            // console.log(check-1);
            list.splice(check-1,1);
            // console.log("未选中 在黑名单， 刪除",list);
        }else{
            // console.log("返回false");
            return false;
        }

        // console.log(list);
        saveData(list);
        // test();
        // 刷新页面
        // window.location.reload(true);
        setTimeout(function(){
            window.location.reload(true);
            console.log("loading");
        },400);
    }

    function saveData(list,version){
        // console.log(list);
        var userData = {
            "status":1,
            "version":black_list_version,
            "message":"0.1測試版，2017-05-16發佈",
            "data":list.sort()
        };
        GM_setValue("black_list",userData);
        // console.log(userData);
        console.log(GM_getValue("black_list"));
        return userData;
    }

    // 數據庫版本升級，鑒於之前2.1.x版本只是隨手寫的，有太多的問題，保存數據未考慮周全，遂再次改動
    function versionUp(){
        var black_list;
        var black_list_user = GM_getValue("list_user");
        // var version2 = GM_getValue("black_list");
        // console.log(black_list_user);
        if(black_list_user){
            // 存在版本一，意味著從舊版升到新版
            black_list_user = black_list_user.split("|");
            black_list = Array.from( new Set(black_list_default.concat(black_list_user)));

            // 刪除舊版本
            GM_deleteValue("list_user");
        } else {
            // 不存在版本一，也不存在版本二， 意味著新用戶
            black_list = black_list_default;
        }

        // black_list.concat

        // 保存數據
        return saveData(black_list);
    }

    // 获取黑名单
    function get_black_list(){

        var black_list = GM_getValue("black_list");

        if(!black_list){
            black_list = versionUp();
            // black_list = GM_getValue("black_list");
        }

        // 黑名單數據更新
        // console.log("本地黑名單版本： ",black_list.version, black_list_version)
        if(black_list.version < black_list_version){
            console.log("低版本，更新數據");
            var new_list = Array.from( new Set(black_list_default.concat(black_list.data)));
            black_list = saveData(new_list);
        }

        // console.log(black_list);
        return black_list.data;
    }
   // 检查是否存在于黑名单中
    function check_black_list(list,host){
        for(let i=0;i<list.length;i++){
            // if(hostname===list[i]){
            if(~hostname.indexOf(list[i])){
                return i+1;  //万一匹配到第一个，返回0
            }
        }
        return false;
    }
//---------------------------------------------------------------------添加 end
  // 域名规则列表
    var rules = {
        black_rule: {
            name: "black",
            hook_eventNames: "",
            unhook_eventNames: ""
        },
        default_rule: {
            name: "default",
            hook_eventNames: "contextmenu|select|selectstart|copy|cut|dragstart",
            unhook_eventNames: "keydown|keyup|mousedown|mouseup",
            dom0: true,
            hook_addEventListener: true,
            hook_preventDefault: true,
            hook_set_returnValue: true,
            add_css: true
        },
        rule_plus: {
            name: "default",
            hook_eventNames: "contextmenu|select|selectstart|copy|cut|dragstart|mousedown|mouseup",
            unhook_eventNames: "keydown|keyup",
            dom0: true,
            hook_addEventListener: true,
            hook_preventDefault: true,
            hook_set_returnValue: true,
            add_css: true
        }
    };


  // 要处理的 event 列表
    var hook_eventNames, unhook_eventNames, eventNames;
    // 储存名称
    var storageName = getRandStr('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', parseInt(Math.random() * 12 + 8));
    // 储存被 Hook 的函数
    var EventTarget_addEventListener = EventTarget.prototype.addEventListener;
    var document_addEventListener = document.addEventListener;
    var Event_preventDefault = Event.prototype.preventDefault;

    // Hook addEventListener proc
    function addEventListener(type, func, useCapture) {
        var _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
        if(hook_eventNames.indexOf(type) >= 0) {
            _addEventListener.apply(this, [type, returnTrue, useCapture]);
        } else if(unhook_eventNames.indexOf(type) >= 0) {
            var funcsName = storageName + type + (useCapture ? 't' : 'f');

            if(this[funcsName] === undefined) {
                this[funcsName] = [];
                _addEventListener.apply(this, [type, useCapture ? unhook_t : unhook_f, useCapture]);
            }

            this[funcsName].push(func);
        } else {
            _addEventListener.apply(this, arguments);
        }
    }

  // 清理循环
    function clearLoop() {
        var elements = getElements();

        for(var i in elements) {
          for(var j in eventNames) {
            var name = 'on' + eventNames[j];
            if(elements[i][name] !== null && elements[i][name] !== onxxx) {
                if(unhook_eventNames.indexOf(eventNames[j]) >= 0) {
                    elements[i][storageName + name] = elements[i][name];
                    elements[i][name] = onxxx;
              } else {
                    elements[i][name] = null;
              }
            }
          }
        }
    }

  // 返回true的函数
    function returnTrue(e) {
        return true;
    }
    function unhook_t(e) {
        return unhook(e, this, storageName + e.type + 't');
    }
    function unhook_f(e) {
        return unhook(e, this, storageName + e.type + 'f');
    }
    function unhook(e, self, funcsName) {
        var list = self[funcsName];
        for(var i in list) {
            list[i](e);
        }

        e.returnValue = true;
        return true;
    }
    function onxxx(e) {
        var name = storageName + 'on' + e.type;
        this[name](e);

        e.returnValue = true;
        return true;
    }

  // 获取随机字符串
    function getRandStr(chs, len) {
        var str = '';

        while(len--) {
            str += chs[parseInt(Math.random() * chs.length)];
        }

        return str;
    }

  // 获取所有元素 包括document
    function getElements() {
        var elements = Array.prototype.slice.call(document.getElementsByTagName('*'));
        // var elementsArr = Array.from(elements);
        var elementsSet = new Set(elements);

        // console.log("所有元素：",elements);
        var exempt = Array.prototype.slice.call(document.querySelectorAll("[class*='rwl-exempt'],[class*='rwl-exempt'] *"));
        console.log("排除1：",exempt);

        // var exemptArr = Array.from(exempt);
        var exemptSet = new Set(exempt);

        // console.log("排除元素；",exempt);

        elements = Array.from(new Set(elements.concat(exempt).filter(v => !elementsSet.has(v) || !exemptSet.has(v))))
        elements.push(document);
        // console.log("最后结果：",elements);

        return elements;
    }


  //添加按钮
    function addBtn(){
        var node = document.createElement("remove-web-limits-iqxin");
        node.id = "rwl-iqxin";
        node.className = "rwl-exempt";
        // node.innerHTML = '<label><input type="checkbox" name="" id="black_node">黑名单</label><button id="delete">delete</btton>';
        node.innerHTML = '' +
        '<img class="rwl-set" style="width: 15px;margin: 0 2px -3px -10px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACSklEQVR4nGNkIAPYy8tzhLS2f0cWy42JYiTHLLI0TV6y7D82cXIcwUSqhr658/bhkaaeAyYvWfZ/0qLFW9HVs7JzOOLR8w+bObhCjIEBh4vxaaAEYIsijBCgleW4zGYipIDawEpYVgqnA8jNSqSAY28fP8PpgIEALORoUlWQwyp++8Ejks0iKQQYGRlxWs7AgNth+ABKCLRPmhqHT7GKvCwDAwMDQ11gxMRTr58UIMtNmzbjuZKejoSqghyhkGBkYGD4j8xhYGAgnANgvmvyj5RGT0gwYC4mU9y4bkUPAwPh6IAleEZisx7MAR42Nnhzyo4jR/4T4wAYICoNIFlOUH1dULglAwMDg7S4GPUcgAQIhtapV09PMDAwMHBxchBlIMvHj++JUEZ86tbnlxdgYGBg+PL1KwMxZhMVAmcuXmRgYEDELz7QuXXpewYGBoYbd+4QYzQDU012NuOmxvZJRKkmDIguyjc2dfrWZGczomhomToVrw9N9PUZGBiw54T1O3emc3Jzz2BgQIQYLlCTnQ3Xj2EQPkcYaGszsLDgL71JsZyBgcRccOHqVbwWELIcGyCrMiLHIlxgwKtjFAeYSkkJD6gD/Kur39DaQjNxmWScDkBPodQGWxrbU0+9fDIXpwNwOWJTQ8eSzY3tC4m1aHNje8mmhvY+FLGG9qQTr57MQVeL08cW4jJmJ14+OYUuTqiwwuYBczFpvZOvnl7Cpp7kIPdQUWG3KSz8QazlhADJ2XDHnTs/SdVDVQcwMDAwLJs6lR1djNwEDAB1JMSK2b7KxQAAAABJRU5ErkJggg==">'+
        '<label>' +
        '限制解除 <input type="checkbox" name="" id="black_node"></label>';
        if(window.self === window.top){
            if (document.querySelector("body")){
                document.body.appendChild(node);
            } else {
                document.documentElement.appendChild(node);
            }
        }
        node.addEventListener("mouseover",function(){
            node.classList.add("rwl-active-iqxin");
            // list = get_black_list();
        });
        node.addEventListener("mouseleave",function(){
            setTimeout(function(){
                node.classList.remove("rwl-active-iqxin");
                black_check(black_node.checked);
            },100)
        });

        // 直接编辑代码的功能
        document.querySelector(".rwl-set").addEventListener("click",function(){
            var oldEditBox = document.querySelector("#rwl-code");
            if(oldEditBox){
                oldEditBox.parentNode.removeChild(oldEditBox);
                return;
            }
            var userSetting = GM_getValue("black_list");
            var odom = document.createElement("div");
            odom.id = "rwl-code";
            odom.style.cssText ="position: fixed;" +
                "top: 50px;" +
                "left: 20px;" +
                "padding: 10px;" +
                "background: #fff;" +
                "border-radius: 4px;";
            var innerH = "" +
                "<textarea wrap='off' cols='45' rows='20' style='overflow:auto;border-radius:4px;'>" + JSON.stringify(userSetting,false,4) + "</textarea>" + 
                "<br>" +
                // "<button id='rwl-reset'>清空设置</button> &nbsp;&nbsp;&nbsp;" +
                "<button id='rwl-codeboxclose' onclick='this.parentNode.parentNode.removeChild(this.parentNode);' >关闭</button> &nbsp;&nbsp;&nbsp;" +
                // "<button id='rwl-codeboxsave'>保存</button>" +
                "<span>--仅供查看--</span>"
            "";
            odom.innerHTML = innerH;
            document.body.appendChild(odom);
        })
        // 删除本地存的黑名单
        // document.getElementById("delete").addEventListener("click",function(){
        //  GM_deleteValue ("list_user");
        //  test();
        // }); 
        GM_addStyle(
            "#rwl-iqxin{" +
                "position:fixed;" +
                "top:0;" +
                "left:0px;" +
                "transform:translate(-62px,0);" +
                "width:58px;" +
                "height:25px;" +
                "font-size:12px;" +
                "font-weight: 500;" +
                "font-family:Verdana, Arial, '宋体';" +
                "color:#fff;" +
                "background:#333;" +
                "z-index:2147483647;" +
                "margin: 0;" +
                "opacity:0.05;" +
                "transition:0.3s;" +
                "overflow:hidden;" +
                "user-select:none;" +
                "text-align:center;" +
                "white-space:nowrap;" +
                "line-height:25px;" +
                "padding:0 16px;" +
                "border:1px solid #ccc;" +
                "border-width:1px 1px 1px 0;" +
                "border-bottom-right-radius:5px;" +
                "box-sizing: content-box;" +
            "}" +
            "#rwl-iqxin input{" +
                "margin: 0;" +
                "padding: 0;" +
                "vertical-align:middle;" +
                "-webkit-appearance:checkbox;" +
                "-moz-appearance:checkbox;" +
                "position: static;" +
                "clip: auto;" +
                "opacity: 1;" +
            "}" +
            "#rwl-iqxin.rwl-active-iqxin{" +
                // "top: 10px;" +
                "transform:translate(0,0);" +
                // "left: 0px;" +
                "opacity: 0.9;" +
                "height: 32px;" +
                "line-height: 32px" +
            "}" +
            "#rwl-iqxin label{" +
                "margin:0;" +
                "padding:0;" +
                "font-weight:500;" +
            "}"
        );
    };

    // 部分网站采用了其他的防复制手段
    function clear(){
        // console.log(hostname);
        switch (hostname){
            case "www.z3z4.com": clear_z3z4(); break;
            case "huayu.baidu.com": clear_huayu(); break;
            // case "news.ifeng.com":
            // case "www.15yan.com": rule = clear_15yan();break;
        }
        return rules.rule_plus;
    }
    // www.z3z4.com 再三再四, 文字上面覆盖一层透明的div
    function clear_z3z4(){
        var oDiv = document.querySelector(".moviedownaddiv");
        if (oDiv) {
            oDiv.parentNode.removeChild(oDiv);
        }
    }
    function clear_huayu(){
        var oDiv = document.querySelector("#jqContextMenu");
        if (oDiv) {
            oDiv.parentNode.removeChild(oDiv);
        }
    }
    // www.15yan.com 15言， 监控 mousedown
    function clear_15yan(){
        return rules.rule_plus;
    }


    // 初始化
    function init() {
        // console.log("使用规则-------------------------------------------------iqxin");
        // 针对个别网站采取不同的策略
        var rule = clear();
        // 设置 event 列表
        hook_eventNames = rule.hook_eventNames.split("|");
        // TODO Allowed to return value
        unhook_eventNames = rule.unhook_eventNames.split("|");
        eventNames = hook_eventNames.concat(unhook_eventNames);

        // 调用清理 DOM0 event 方法的循环
        if(rule.dom0) {
            setInterval(clearLoop, 30 * 1000);
            setTimeout(clearLoop, 2500);
            window.addEventListener('load', clearLoop, true);
            // clearLoop();
        }

        // hook addEventListener //导致搜索跳转失效的原因
        if(rule.hook_addEventListener) {
            EventTarget.prototype.addEventListener = addEventListener;
            document.addEventListener = addEventListener;
        }

        // hook preventDefault
        if(rule.hook_preventDefault) {
            Event.prototype.preventDefault = function() {
                if(hook_eventNames.indexOf(this.type) < 0) {
                    Event_preventDefault.apply(this, arguments);
                }
            };
        }

        // Hook set returnValue
        if(rule.hook_set_returnValue) {
            Event.prototype.__defineSetter__('returnValue', function() {
                if(this.returnValue !== true && hook_eventNames.indexOf(this.type) >= 0) {
                    this.returnValue = true;
                }
            });
        }

    // console.debug('url: ' + url, 'storageName：' + storageName, 'rule: ' + rule.name);

    // 添加CSS
        if(rule.add_css) {
            GM_addStyle('html, :not([class*="rwl-exempt"]) {-webkit-user-select:text!important; -moz-user-select:text!important;}');
        }

    }

//--开始执行---------------------------------------------------------------iqxin
    
    var black_list_version = 1.2;
    var black_list_default = [
            "b.faloo.com",
            "bbs.coocaa.com",
            "book.hjsm.tom.com",
            "book.zhulang.com",
            "book.zongheng.com",
            "chokstick.com",
            "chuangshi.qq.com",
            "cutelisa55.pixnet.net",
            "huayu.baidu.com",
            "imac.hk",
            "life.tw",
            "luxmuscles.com",
            "news.missevan.com",
            "read.qidian.com",
            "www.15yan.com",
            "www.17k.com",
            "www.18183.com",
            "www.360doc.com",
            "www.coco01.net",
            "www.eyu.com",
            "www.hongshu.com",
            "www.hongxiu.com",
            "www.imooc.com",
            "www.jjwxc.net",
            "www.readnovel.com",
            "www.tadu.com",
            "www.xxsy.net",
            "www.z3z4.com",
            "www.zhihu.com",
            "yuedu.163.com"
    ];

    addBtn();   //页面左上角按钮，不想要按钮可以把这行注释掉
    var black_node = document.getElementById("black_node");

    var list = get_black_list();

    var hostname = window.location.hostname; 
    if(check_black_list(list,hostname)){
        // 如果注释掉按钮，此处会获取不到
        if(black_node){
            black_node.checked = true;
        }
        //console.log("位于黑名单中----------------revove_web_limits------iqxin");
        init();
    }
})();