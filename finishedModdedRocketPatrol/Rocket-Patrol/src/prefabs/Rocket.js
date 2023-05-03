class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status, only one rocket at a time
        this.moveSpeed = 4;         // pixels per frame

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

    } 

    update() {
        if (!this.isFiring) {
            if (game.input.mousePointer.x < this.x && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            }
            else if (game.input.mousePointer.x > this.x && this.x <= game.config.width -
                borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        if (game.input.activePointer.isDown) {
            this.isFiring = true;
            this.sfxRocket.play();
        }


        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

}

//     update() {
//         // if(this.clock.getRemainingSeconds()|0 <=30){
//         //     // this.moveSpeed= this.moveSpeed*2;
//         // }

//         // left/right movement, is down = holding key
//         if(!this.isFiring) {
//             if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
//                 this.x -= this.moveSpeed;
//             } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
//                 this.x += this.moveSpeed;
//             }

//         }

//         // fire button, just down = tap key
//         if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
//             this.isFiring = true;
//             this.sfxRocket.play(); // playf sfx
//         }

//         // if fired, move up
//         if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
//             this.y -= this.moveSpeed;
//         }

//         // reset on miss
//         if(this.y <= borderUISize * 3 + borderPadding) {
//             this.isFiring = false;
//             this.y = game.config.height - borderUISize - borderPadding;
//         }
//     }

//     reset() {
//         this.isFiring = false;
//         this.y = game.config.height - borderUISize - borderPadding;
//     }
// }