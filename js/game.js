"use strict";
var preview = true;
var layerWidth = 0;
var layerHeight = 0;

var GameState = {

    preload: function () {
        console.log(this.camera);

    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.level1 = this.game.add.tilemap('level1');
        this.level1.addTilesetImage('tiles', 'mapTiles');

        layerWidth = this.level1.widthInPixels;
        layerHeight = this.level1.heightInPixels;

        this.bgLayer = this.level1.createLayer('BG');
        this.lavaLayer = this.level1.createLayer('Lava');
        this.wallsLayer = this.level1.createLayer('Walls');
        this.wallsLayer.resizeWorld();

        // Colida com todos, menos esses aqui
        this.level1.setCollisionByExclusion([9, 10, 11, 12, 17, 18, 19, 20], true, this.wallsLayer);
        this.level1.setCollision([5, 6, 13], true, this.lavaLayer);

        //Ativando audio
        this.jumpSound = this.game.add.audio('jumpSound');
        this.pickUp = this.game.add.audio('pickUp');
        this.enemyDeath = this.game.add.audio('enemyDeath');

        //BG Music
        this.music = this.game.add.audio('music');
        this.music.loop = true;
        this.music.play();

        // Player
        // Inicializando jogador  
        this.player = this.game.add.sprite(160, 64, 'player', 5);
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.player);
        this.player.body.gravity.y = 750;
        this.player.body.collideWorldBounds = true;


        //Animações do jogador
        this.player.animations.add('walk', [0, 1, 2, 1], 6);
        this.player.animations.add('idle', [5, 5, 5, 5, 5, 5, 6, 5, 6, 5], 6);
        this.player.animations.add('jump', [4], 6);

        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //Grupo - diamonds
        this.diamonds = this.game.add.physicsGroup();
        //Criando objetos do Tiled
        //Parametros
        //layer do Tiled, nome do objeto no Tiled, spritesheet, frame, true, false, grupo
        this.level1.createFromObjects('Items', 'diamond', 'items', 5, true, false, this.diamonds);
        this.diamonds.forEach(function (diamond) {
            diamond.anchor.setTo(0.5, 0.5);
            diamond.body.immovable = true;
            diamond.animations.add('spin', [4, 5, 6, 7, 6, 5], 6, true);
            diamond.animations.play('spin');
        });

        this.specialPoints = this.game.add.physicsGroup();
        this.level1.createFromObjects('Items', 'specialpoints', 'items', 2, true, false, this.specialPoints);
        this.specialPoints.forEach(function (specialPoints) {
            specialPoints.anchor.setTo(0.5, 0.5);
            specialPoints.body.immovable = true;
            specialPoints.animations.add('spin', [0, 1, 2, 1, 0], 6, true);
            specialPoints.animations.play('spin');
        });

        //Grupo - bats
        this.bats = this.game.add.physicsGroup();
        //Criando objetos do Tiled
        //Parametros
        //layer do Tiled, nome do objeto no Tiled, spritesheet, frame, true, false, grupo
        this.level1.createFromObjects('Enemies', 'bat', 'enemies', 8, true, false, this.bats);
        this.bats.forEach(function (bat) {
            bat.anchor.setTo(0.5, 0.5);
            bat.body.immovable = true;
            bat.animations.add('fly', [8, 9, 10], 6, true);
            bat.animations.play('fly');
            bat.body.velocity.x = 100;
            bat.body.bounce.x = 1;
        });

        this.scoreText = this.game.add.text(100, 50, "Score: 0", { font: "30px Arial", fill: "#ffffff" });
        this.scoreText.fixedToCamera = true;

        this.scoreSpecialText = this.game.add.text(570, 50, "0/0", { font: "30px Arial", fill: "#ffffff" });
        this.scoreSpecialText.fixedToCamera = true;
        this.scoreSpecial = this.game.add.sprite(540, 50, "items");
        this.scoreSpecial.frame = 2;
        this.scoreSpecial.fixedToCamera = true;

        //Game state
        this.totalDiamonds = this.diamonds.length;
        this.collectedDiamonds = 0;
        this.totalspecialPoints = this.specialPoints.length;
        this.collectedSpecialPoints = 0;
        this.score = 0;

    },

    update: function () {

        this.game.physics.arcade.collide(this.player, this.wallsLayer);
        this.game.physics.arcade.collide(this.bats, this.wallsLayer);
        this.game.physics.arcade.collide(this.bats, this.lavaLayer);
        this.game.physics.arcade.collide(this.player, this.lavaLayer, this.lavaDeath, null, this);
        this.game.physics.arcade.overlap(this.player, this.diamonds, this.diamondCollect, null, this);
        this.game.physics.arcade.overlap(this.player, this.specialPoints, this.specialPointsCollect, null, this);
        this.game.physics.arcade.overlap(this.player, this.bats, this.batCollision, null, this);

        this.scoreSpecialText.text = this.collectedSpecialPoints + "/" + this.totalspecialPoints;

        if (preview) {
            this.game.physics.arcade.isPaused = true;
            new cameraController(200, this);
        } else {
            this.game.physics.arcade.isPaused = false;
            this.game.camera.follow(this.player);
            new playerController(this);
        }

        this.bats.forEach(function (bat) {
            if (bat.body.velocity.x != 0) {
                bat.scale.x = 1 * Math.sign(bat.body.velocity.x);
            }
        });

    },
    diamondCollect: function (player, diamond) {
        new Collision.collect(player, diamond, this);
    },
    specialPointsCollect: function (player, specialPoints) {
        new Collision.collect(player, specialPoints, this);
    },
    batCollision: function (player, bat) {
        new Collision.collect(player, bat, this);
    },
    lavaDeath: function (player, lava) {
        new Collision.death(player, lava, this);
    }//,
   // restart: function(){
        //restart = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    //    this.game.input.keyboard.addKey(Phaser.Keyboard.R),
    //    self.keys = self.game.input.keyboard.createCursorKeys();
    //    if (self.keys..isDown) {
    //       game.state.start('game'); 
    //    }
   // }
};
/*
Trabalho Prático 2 26/maio

- Plataforma utilizando Tiled para Level Design;
- Menu inicial, créditos, tela de vitória e derrota;
- Pelo menos duas fases diferentes,idealmente 3;
- publicar no itch.io ou GameJolt
-

*/
