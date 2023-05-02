class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super( scene, x, y, texture, frame, pointValue);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;

    }

    update() {

        // make the spaceships move left
        
        // let r = Math.ceil(Math.random() * 2);
        // console.log(r);
        // if (r == 1){
        this.x -= this.moveSpeed;
        // }
        // else
        // this.x += this.moveSpeed;

        // wrap around from left edge to right edge, doesnt instantly dissapear after touching edge
        if(this.x <= 0 - this.width) {
            this.reset(); 
        }
    }
    reset() {
        this.x = game.config.width;
    }
}

class fastShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super( scene, x, y, texture, frame, pointValue);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.fastShipSpeed;

    }

    update() {

        // make the spaceships move left
        
        this.x -= this.moveSpeed;

        // wrap around from left edge to right edge, doesnt instantly dissapear after touching edge
        if(this.x <= 0 - this.width) {
            this.reset(); 
        }
    }
    reset() {
        this.x = game.config.width;
    }
}