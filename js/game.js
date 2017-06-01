"use strict";
var preview = true;
var layerWidth = 0;
var layerHeight = 0;
var currentLevel = 1;
var maxLevel = 2;
var isGamePlaying = false;
var GameState = {
    init: function (params) {
        console.log(params);
        if (params) {
            currentLevel = (params.nextLevel) ? params.nextLevel : currentLevel;
            isGamePlaying = (params.isPlaying) ? true : false;
            if (currentLevel > maxLevel) {
                game.state.start('win');
            }
            var died = (params.died) ? params.died : false;
            if (died) {
                game.state.start('lose', true, false, { currentLevel: currentLevel });
            }
        }

    },

    preload: function () {
        this.game.load.tilemap('level' + currentLevel, 'Assets/maps/level' + currentLevel + '.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.level = this.game.add.tilemap('level' + currentLevel);
        this.level.addTilesetImage('tiles', 'mapTiles');

        layerWidth = this.level.widthInPixels;
        layerHeight = this.level.heightInPixels;

        this.bgLayer = this.level.createLayer('BG');
        this.lavaLayer = this.level.createLayer('Lava');
        this.wallsLayer = this.level.createLayer('Walls');
        this.wallsLayer.resizeWorld();

        // Colida com todos, menos esses aqui
        this.level.setCollisionByExclusion([8,13,14,15,16], true, this.wallsLayer);
        this.level.setCollision([0,1,2,3,4,5], true, this.lavaLayer);
        console.log(this.lavaLayer);

        //Ativando audio
        this.jumpSound = this.game.add.audio('jumpSound');
        this.pickUp = this.game.add.audio('pickUp');
        this.spPickUp = this.game.add.audio('spPickUp');
        this.enemyDeath = this.game.add.audio('enemyDeath');
        this.pauseIn = this.game.add.audio('pauseIn');
        this.pauseOut = this.game.add.audio('pauseOut');

        //BG Music
        this.music = this.game.add.audio('music');
        this.music.loop = true;

        if (!isGamePlaying) {
            //console.log('music plays');
            this.music.play();
        }

        // Player
        // Inicializando jogador  
        this.player = this.game.add.sprite(160, 64, 'player', 5);
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.player);
        this.player.body.gravity.y = 750;
        this.player.body.collideWorldBounds = true;


        //Animações do jogador
        this.player.animations.add('walk', [0, 1, 2, 1], 6);
        this.player.animations.add('idle', [4, 4, 4, 4, 4, 4, 5, 4, 5, 4], 6);
        this.player.animations.add('jump', [3], 6);

        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //Grupo - diamonds
        this.normalPoints = this.game.add.physicsGroup();
        this.normalPoints2 = this.game.add.physicsGroup();
        //Criando objetos do Tiled
        //Parametros
        //layer do Tiled, nome do objeto no Tiled, spritesheet, frame, true, false, grupo
        this.level.createFromObjects('Items', 'gold', 'items', 2, true, false, this.normalPoints);
        this.normalPoints.forEach(function (normalPoints) {
            normalPoints.anchor.setTo(0.5, 0.5);
            normalPoints.body.immovable = true;
            //diamond.animations.add('spin', [2, 3, 2, 3], 6, true);
            //diamond.animations.play('spin');
        });
        this.level.createFromObjects('Items', 'gold2', 'items', 1, true, false, this.normalPoints2);
        this.normalPoints2.forEach(function (normalPoints) {
            normalPoints.anchor.setTo(0.5, 0.5);
            normalPoints.body.immovable = true;
            //diamond.animations.add('spin', [2, 3, 2, 3], 6, true);
            //diamond.animations.play('spin');
        });

        this.specialPoints = this.game.add.physicsGroup();
        this.level.createFromObjects('Items', 'diamond', 'items', 3, true, false, this.specialPoints);
        this.specialPoints.forEach(function (specialPoints) {
            specialPoints.anchor.setTo(0.5, 0.5);
            specialPoints.body.immovable = true;
            //  specialPoints.animations.add('spin', [0, 1, 2, 1, 0], 6, true);
            // specialPoints.animations.play('spin');
        });

        //Grupo - bats
        this.skeleton = this.game.add.physicsGroup();
        this.level.createFromObjects('Enemies', 'skeleton', 'enemies', 6, true, false, this.skeleton);
        this.skeleton.forEach(function (enemy) {
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.immovable = true;
            enemy.animations.add('fly', [6, 7, 8], 3, true);
            enemy.animations.play('fly');
            enemy.body.velocity.x = 100;
            enemy.body.bounce.x = 1;
        });
        this.GreenEnemie = this.game.add.physicsGroup();
        this.level.createFromObjects('Enemies', 'GreenEnemie', 'enemies', 0, true, false, this.GreenEnemie);
        this.GreenEnemie.forEach(function (enemy) {
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.immovable = true;
            enemy.animations.add('fly', [0, 1, 2], 3, true);
            enemy.animations.play('fly');
            enemy.body.velocity.x = 100;
            enemy.body.bounce.x = 1;
        });
        this.PinkEnemie = this.game.add.physicsGroup();
        this.level.createFromObjects('Enemies', 'PinkEnemie', 'enemies', 3, true, false, this.PinkEnemie);
        this.PinkEnemie.forEach(function (enemy) {
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.immovable = true;
            enemy.animations.add('fly', [3, 4, 5], 3, true);
            enemy.animations.play('fly');
            enemy.body.velocity.x = 100;
            enemy.body.bounce.x = 1;
        });

        this.scoreText = this.game.add.text(100, 50, "Score: 0", fontConfig);
        this.scoreText.fixedToCamera = true;


        this.scoreSpecialText = this.game.add.text(570, 50, "0/0", fontConfig);
        this.scoreSpecialText.fixedToCamera = true;
        this.scoreSpecial = this.game.add.sprite(540, 50, "items");
        this.scoreSpecial.frame = 3;
        this.scoreSpecial.fixedToCamera = true;


        this.helpText = this.game.add.text(100, 430, "'R'-Restart\n'P'-Pause", fontHelp);
        this.helpText.fixedToCamera = true;

        //Game state
        this.totalDiamonds = this.normalPoints.length + this.normalPoints2.length;
        this.collectedDiamonds = 0;
        this.totalspecialPoints = this.specialPoints.length;
        this.collectedSpecialPoints = 0;
        this.score = 0;

    },

    update: function () {

        this.game.physics.arcade.collide(this.player, this.wallsLayer);
        this.game.physics.arcade.collide(this.skeleton, this.wallsLayer);
        this.game.physics.arcade.collide(this.skeleton, this.lavaLayer);
        this.game.physics.arcade.collide(this.GreenEnemie, this.wallsLayer);
        this.game.physics.arcade.collide(this.GreenEnemie, this.lavaLayer);
        this.game.physics.arcade.collide(this.PinkEnemie, this.wallsLayer);
        this.game.physics.arcade.collide(this.PinkEnemie, this.lavaLayer);
        this.game.physics.arcade.collide(this.player, this.lavaLayer, this.lavaDeath, null, this);
        this.game.physics.arcade.overlap(this.player, this.normalPoints, this.diamondCollect, null, this);
        this.game.physics.arcade.overlap(this.player, this.normalPoints2, this.diamondCollect, null, this);

        this.game.physics.arcade.overlap(this.player, this.specialPoints, this.specialPointsCollect, null, this);
        this.game.physics.arcade.overlap(this.player, this.skeleton, this.batCollision, null, this);
        this.game.physics.arcade.overlap(this.player, this.GreenEnemie, this.batCollision, null, this);
        this.game.physics.arcade.overlap(this.player, this.PinkEnemie, this.batCollision, null, this);


        this.scoreSpecialText.text = this.collectedSpecialPoints + "/" + this.totalspecialPoints;

        //    if (preview) {
        //     this.game.physics.arcade.isPaused = true;
        //       new cameraController(500, this);
        // } else {
        // this.game.physics.arcade.isPaused = false;
        this.game.camera.follow(this.player);
        new playerController(this);
        // }

        this.skeleton.forEach(function (enemy) {
            if (enemy.body.velocity.x != 0) {
                enemy.scale.x = 1 * Math.sign(enemy.body.velocity.x);
            }
        });
        new pauseController(this);

        var restart = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        if (restart.isDown) {
            game.state.start('game');
        }

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
        console.log(lava);
        new Collision.death(player, lava, this);
    }
};
/*
Trabalho Prático 2 26/maio

- Plataforma utilizando Tiled para Level Design;
- Menu inicial, créditos, tela de vitória e derrota;
- Pelo menos duas fases diferentes,idealmente 3;
- publicar no itch.io ou GameJolt
-

*/
