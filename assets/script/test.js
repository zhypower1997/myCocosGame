// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        dragonBoneAnim: {
            default: null,
            type: cc.Node

        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //获取龙骨动画时间的文档 https://blog.csdn.net/u013321328/article/details/80244669
        this._armatureDisPlay = this.dragonBoneAnim.getComponent(dragonBones.ArmatureDisplay); //获取 ArmatureDisplay
        this._armature = this._armatureDisPlay.armature();
        this.totalTime = this._armature.animation.gotoAndStopByTime('newAnimation', 0).totalTime;

    },

    start() {

    },

    onScroll(e) {
        // 滚动距离e.getScrollOffset().y
        this._armature.animation.gotoAndStopByTime('newAnimation', this.totalTime*e.getScrollOffset().y/1000)
    }

    // update (dt) {},
});