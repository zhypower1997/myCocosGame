// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let goblinDialogs = [{
        role: 1,
        content: '我好饿啊'
    },
    {
        role: 2,
        content: '你要吃啥'
    },
    {
        role: 1,
        content: '不知道'
    }
];
let roleInfo = {
    1: ['哥布林', 'picAvatar/goblin'], // 哥布林
    2: ['小男孩', 'picAvatar/littleBoy'] // 小男孩
}

cc.Class({
    extends: cc.Component,

    properties: {
        dialogIcon: {
            default: null,
            type: cc.Node
        },
        dialogBody: {
            default: null,
            type: cc.Node
        },
        nameDialog: {
            default: null,
            type: cc.Label
        },
        contentDialog: {
            default: null,
            type: cc.Label
        },
        avatar: {
            default: null,
            type: cc.Node
        },
        contentIndex: {
            default: -1,
            type: cc.Integer
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    },

    start() {

    },

    clickDialog() {
        this.dialogInit();
    },
    clickNext() {
        if (++this.contentIndex <= this.goblinDialogs.length - 1) {
            this.contentDialog.string = this.goblinDialogs[this.contentIndex].content;
            this.nameDialog.string = roleInfo[this.goblinDialogs[this.contentIndex].role][0];
            var avatar = this.avatar;
            var _this = this;
            cc.resources.load(roleInfo[this.goblinDialogs[this.contentIndex].role][1], cc.SpriteFrame, function (err, spriteFrame) {
                avatar.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

        } else {
            this.contentIndex = -1; // 可以反复触发
            this.dialogBody.active = false;
        }
    },
    dialogInit() {
        this.dialogBody.active = true;
        this.goblinDialogs = goblinDialogs;
        this.clickNext();
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.getComponent(cc.PhysicsCollider).tag == 1) {
            this.dialogIcon.active = true;
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.getComponent(cc.PhysicsCollider).tag == 1) {
            this.dialogIcon.active = false;
        }
    },

    // update (dt) {},
});