/**
 * 
 * Arthur Lee
 * 
 * Mods:
 *  *Kill switch restart with UI change, signed off by Nathan -10
 *  *Background music -5
 *  *Countdown timer -10
 *  *Fire button -5
 *  *new title screen -10
 *  *new spaceship -15
 *  *add time when ship explodes/endless -15
 *  *Mouse control -15
 *  *new background scrolling tile sprite -5
 *  *parallax scrolling -10
 * 
 * music source: https://patrickdearteaga.com/arcade-music/
 */

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyESC, mouseClick;
