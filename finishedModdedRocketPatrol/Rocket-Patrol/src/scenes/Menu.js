class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }


    preload() {
        this.load.image('bg', './assets/bg (6).png')

        // loads audio
        this.load.audio('sfx_explosion5', './assets/explosion5.wav')
        this.load.audio('sfx_explosion4', './assets/explosion4.wav')
        this.load.audio('sfx_explosion3', './assets/explosion3.wav')
        this.load.audio('sfx_explosion2', './assets/explosion2.wav')
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/rocket_shot.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_music', './assets/Interplanetary Odyssey.ogg');
    }


    create() {

        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#000000',
            color: '#666',
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }
        let menuConfig2 = {
            fontFamily: 'Courier',
            fontSize: '16px',
            backgroundColor: '#3352F',
            color: '#843605',
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        //menu text and colors
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Aim with mouse and fire with left click', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#666';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for novice or -> for expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, "Press 'esc' to return to menu or 'R' anytime to restart ", menuConfig2).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, "Made by Arthur Lee ", menuConfig2).setOrigin(0.5)
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // novice mode
            game.settings = {
                spaceshipSpeed: 3,
                fastShipSpeed:6,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // expert mode
            game.settings = {
                spaceshipSpeed: 4,
                fastShipSpeed: 8,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}