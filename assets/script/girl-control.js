// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Rocker: {
            type: require("rocker"),
            default: null,
        },
        Jump: {
            type: require("jump"),
            default: null,
        },
        speed: {
            default: 1,
            type: cc.Integer
        },
        mixTime: 0.2,
        jumpTime: {
            default: 2,
            type: cc.Integer
        },
        gameOverIcon: {
            default: null,
            type: cc.Node
        },
        maxSpeed: 500,
        acceleration: 150,
        jumpSpeed: 200,
        drag: 600
    },
    walkStatus: false,
    leftC: false,
    rightC: false,
    keyPress: false,
    isPlatform: false, // 是否在平台上
    jump: false,
    isGameOver: false,
    jumpPressed: false,


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        var spine = this.spine = this.getComponent('sp.Skeleton');
        this._setMix('idle', 'walk');
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.body = this.getComponent(cc.RigidBody);
    },

    onKeyDown(event) {
        this.keyPress = true;
        // D
        if (event.keyCode == cc.macro.KEY.d && !this.walkStatus) {
            this.walk();
            this.walkStatus = true;
            this.rightC = true;
            this.leftC = false;
        }
        // A
        if (event.keyCode == cc.macro.KEY.a && !this.walkStatus) {
            this.walk();
            this.walkStatus = true;
            this.rightC = false;
            this.leftC = true;
        }
        // W
        if (event.keyCode == cc.macro.KEY.w) {
            if (!this.jumpPressed) {
                this.jump = true;
            }

            this.jumpPressed = true;
        }
    },
    onKeyUp(event) {
        this.keyPress = false;
        // AD
        if (event.keyCode == cc.macro.KEY.d || event.keyCode == cc.macro.KEY.a) {
            this.idle();
            this.walkStatus = false;
        }
        // W
        if (event.keyCode == cc.macro.KEY.w) {
            this.jumpPressed = false;
        }
    },

    start() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    },
    walk() {
        this.spine.setAnimation(0, 'walk', true);
    },
    idle() {
        this.spine.setAnimation(0, 'idle', true);
    },
    _setMix(anim1, anim2) {
        this.spine.setMix(anim1, anim2, this.mixTime);
        this.spine.setMix(anim2, anim1, this.mixTime);
    },
    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onCollisionStay: function (other, self) {
        if (other.node.name == 'platform') {
            this.isPlatform = true;
        }
        if (other.node.name == 'gameOver') {
            this.isGameOver = true;
        }
    },
    onCollisionExit: function (other, self) {
        if (other.node.name == 'platform') {
            this.isPlatform = false;
        }
    },

    update(dt) {
        if (this.isGameOver) {
            this.gameOverIcon.active = true;
            return;
        }


        // 跳跃按钮事件
        if (this.Jump.jumpTime >= 0) {
            if(this.Jump.isJump){
                if (!this.jumpPressed) {
                    this.jump = true;
                }
                this.jumpPressed = true;
            }else{
                this.jumpPressed = false;

            }
        }


        // 滚轮事件
        if (this.Rocker.dir.mag() > 0.5) {
            // left
            if (this.Rocker.dir.x < 0 && this.Rocker.dir.x > -1) {
                if (!this.walkStatus) {
                    this.walk();
                }
                this.walkStatus = true;
                this.rightC = false;
                this.leftC = true;
            }
            // right
            if (this.Rocker.dir.x > 0 && this.Rocker.dir.x < 1) {
                if (!this.walkStatus) {
                    this.walk();
                }
                this.walkStatus = true;
                this.rightC = true;
                this.leftC = false;
            }
        }
        // 停止触摸滚轮
        if (!this.Rocker.touch && !this.keyPress) {
            if (this.walkStatus) {
                this.idle();
                this.walkStatus = false;
            }
        }

        var speed = this.body.linearVelocity;


        if (this.walkStatus && this.leftC) {
            if (this.node.scaleX > 0) {
                this.node.scaleX *= -1;
            }
            speed.x -= this.acceleration * dt;
            if (speed.x < -this.maxSpeed) {
                speed.x = -this.maxSpeed;
            }
        } else if (this.walkStatus && this.rightC) {
            // this.anim.play('walk');

            if (this.node.scaleX < 0) {
                this.node.scaleX *= -1;
            }
            speed.x += this.acceleration * dt;
            if (speed.x > this.maxSpeed) {
                speed.x = this.maxSpeed;
            }
        }
        if(!this.walkStatus){
            if (speed.x != 0) {
                var d = this.drag * dt;
                if (Math.abs(speed.x) <= d) {
                    speed.x = 0;
                    // this.anim.play('idle');
                } else {
                    speed.x -= speed.x > 0 ? d : -d;
                }
            }
        }

        if (Math.abs(speed.y) < 1) {
            this.jumpTime = 2;
        }

        if (this.jumpTime > 0 && this.jump) {
            speed.y = this.jumpSpeed;
            this.jumpTime--;
        }

        this.jump = false;
        this.body.linearVelocity = speed;
    },

});