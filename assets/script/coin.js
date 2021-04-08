// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {},
    scoreNumNode: null,

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.getCollisionManager().enabled = true;
        this.scoreNumNode = this.node.parent.parent.getChildByName('score').getChildByName('scoreNum').getComponent('cc.Label');
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == 'girl') {
            this.node.destroy();
            this.scoreNumNode.string = String(Number(this.scoreNumNode.string) + 1);
        }
    },

    // update (dt) {},
});