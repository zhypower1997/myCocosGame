// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jump: {
            type: cc.Node,
            default: null,
        },
        jumpTime: {
            default: 2,
            type: cc.Integer
        },
    },
    isJump: false,
    isJumpPress: false,

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.jump.on(cc.Node.EventType.TOUCH_START, function (e) {
            if(!this.isJump){
                this.isJump = true;
            }
            if(this.jumpTime >= 0){
                this.jumpTime--;
            }
        }, this);
        this.jump.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.isJump = false;
            this.jumpTime = 2;
        }, this);
    },

    // update (dt) {},
});
