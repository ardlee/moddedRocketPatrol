class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('smallSpaceship', './assets/fastShip.png');
        this.load.image('starfield2', './assets/tilesprite2.png' )

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create() {

        var sounds = ['sfx_explosion', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4', 'sfx_explosion5'];

        //plays music. loops through song and volume adjusted
        this.music = this.sound.add('sfx_music');

        var musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.music.play(musicConfig);
        

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0,0,game.config.width,game.config.height, 'starfield2').setOrigin(0,0);

        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add rocket (P1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);


        // add spaceships (x3)
        this.ship1 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*9, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ship2 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship3 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 15).setOrigin(0,0);
        this.ship4 = new fastShip(this, game.config.width + borderUISize*9, borderUISize*4, 'smallSpaceship', 0, 35).setOrigin(0,0);

        // define reserve keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        game.input.mouse.capture = true;

        // explosion animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // innit score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily :'Courier',
            fontSize: '28px',
            backgroundColor: '#666',
            color: '#990000',
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        // play clock
        // if (this.timeLeft <= 0) {
        //     scoreConfig.fixedWidth = 0;
        //     this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //     this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
        //     this.gameOver = true;
        // }


        let timeConfig = {
            fontFamily :'Courier',
            fontSize: '28px',
            backgroundColor: '#666',
            color: '#990000',
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = game.settings.gameTimer/1000;
        this.timerEvent = this.time.addEvent({ delay: 1000, callback: onTimerEvent, callbackScope: this, loop: true });
        this.timeDisplay = this.add.text(borderUISize + borderPadding*43, borderUISize + borderPadding*2, this.timeLeft, timeConfig);

        let displayConfig = {
            fontFamily :'Courier',
            fontSize: '37px',
            backgroundColor: '666000',
            color: '#990000',
            allign: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 115
        }
        
        this.fire = this.add.text(borderUISize + borderPadding*23, borderUISize + borderPadding*2, 'FIRE', displayConfig);
        
    }

    update() {

        if (this.timeLeft <= 0) {
            let scoreConfig = {
                fontFamily :'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                allign: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 100
            }
            scoreConfig.fixedWidth = 0;
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }

        //paralax scrolling
        this.starfield.tilePositionX -= 2;
        this.starfield2.tilePositionX += 1;



        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        if( this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //esc button goes back to menu
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
            this.music = "";
        }
        
        // hook up rocket update to the main loop
        // update spaceships
        if (!this.gameOver){
            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            
            this.ship4.update();
        }

        // check collisions update
        if(this.checkCollision (this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
        }
        if(this.checkCollision (this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if(this.checkCollision (this.p1Rocket, this.ship1)) {            
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }

        if(this.checkCollision (this.p1Rocket, this.ship4)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship4);
        }
    

        if(this.p1Rocket.isFiring){

            this.fire.text = "";
        }
        else{

            this.fire.text = "FIRE";
        }
     
        // this.timeLeft.text = this.clock.getRemainingSeconds;

        // if(this.clock.getRemainingSeconds()|0 <= 30){

        // }

        // if(this.clock.getRemainingSeconds()|0 <= game.settings.gameTimer/2){
        //     // p1Rocket.moveSpeed= p1Rocket.moveSpeed*2;
        // }


    }


    checkCollision(rocket, ship) {

        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
        
    }

    shipExplode(ship) {

        // temporarily hide ship
        ship.alpha = 0;      

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

     
        this.sound.play('sfx_explosion4');
        this.timeLeft += 2;
        this.timeDisplay.text = this.timeLeft;     
    }
}

function onTimerEvent() {
    if (!this.gameOver) {
        this.timeLeft -= 1;
        this.timeDisplay.text = this.timeLeft;
    }
}


