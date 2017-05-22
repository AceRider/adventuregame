"use strict";

var GameState = {

    preload: function () {
 

    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.level1 = this.game.add.tilemap('level1');
        this.level1.addTilesetImage('tiles', 'mapTiles');

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
        this.game.camera.follow(this.player);

        //Animações do jogador
        this.player.animations.add('walk', [0, 1, 2, 1], 6);
        this.player.animations.add('idle', [5, 5, 5, 5, 5, 5, 6, 5, 6, 5], 6);
        this.player.animations.add('jump', [4], 6);

        this.keys = this.game.input.keyboard.createCursorKeys();
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

        this.specialpoints = this.game.add.physicsGroup();
        this.level1.createFromObjects('Items', 'specialpoints', 'items', 2, true, false, this.specialpoints);
        this.specialpoints.forEach(function (specialpoints) {
            specialpoints.anchor.setTo(0.5, 0.5);
            specialpoints.body.immovable = true;
            specialpoints.animations.add('spin', [0, 1, 2, 1, 0], 6, true);
            specialpoints.animations.play('spin');
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
        this.scoreSpecial = this.game.add.sprite(540, 50,"items");
        this.scoreSpecial.frame=2;
        this.scoreSpecial.fixedToCamera = true;

        //Game state
        this.totalDiamonds = this.diamonds.length;
        this.collectedDiamonds = 0;
        this.totalspecialpoints = this.specialpoints.length;
        this.collectedSpecialPoints = 0;
        this.score = 0;

    },

    update: function () {
        this.game.physics.arcade.collide(this.player, this.wallsLayer);
        this.game.physics.arcade.collide(this.bats, this.wallsLayer);
        this.game.physics.arcade.collide(this.player, this.lavaLayer, this.lavaDeath, null, this);
        this.game.physics.arcade.overlap(this.player, this.diamonds, this.diamondCollect, null, this);
        this.game.physics.arcade.overlap(this.player, this.specialpoints, this.specialPointsCollect, null, this);
        this.game.physics.arcade.overlap(this.player, this.bats, this.batCollision, null, this);

        this.scoreSpecialText.text = this.collectedSpecialPoints+"/"+this.totalspecialpoints;

        if (this.keys.left.isDown) {
            this.player.body.velocity.x = -150; // Ajustar velocidade
            // Se o jogador estiver virado para a direita, inverter a escala para que ele vire para o outro lado
            if (this.player.scale.x == 1) this.player.scale.x = -1;
            this.player.animations.play('walk');

        }
        // Se a tecla direita estiver pressionada (this.keys.right.isDown == true),
        // mover o sprite para a direita
        else if (this.keys.right.isDown) {
            // se a tecla direita estiver pressionada
            this.player.body.velocity.x = 150;  // Ajustar velocidade
            // Se o jogador estiver virado para a direita, inverter a escala para que ele vire para o outro lado
            if (this.player.scale.x == -1) this.player.scale.x = 1;
            this.player.animations.play('walk');
        }
        else {
            // Se nenhuma tecla estiver sendo pressionada:
            // Ajustar velocidade para zero
            this.player.body.velocity.x = 0;
            // Executar animação 'idle'
            this.player.animations.play('idle');
        }

        // Se o a barra de espaço ou a tecla cima estiverem pressionadas, e o jogador estiver com a parte de baixo tocando em alguma coisa
        if ((this.jumpButton.isDown || this.keys.up.isDown) && (this.player.body.touching.down || this.player.body.onFloor())) {
            // Adicione uma velocidade no eixo Y, fazendo o jogador pular
            this.player.body.velocity.y = -400;
            this.jumpSound.play();
        }

        if (!this.player.body.touching.down && !this.player.body.onFloor()) {
            this.player.animations.play('jump');
        }

        this.bats.forEach(function (bat) {
            if (bat.body.velocity.x != 0) {
                bat.scale.x = 1 * Math.sign(bat.body.velocity.x);
            }
        });

    },
    diamondCollect: function (player, diamond) {
        this.collectedDiamonds++;
        this.score += 100;
        this.scoreText.text = "Score: " + this.score;
        if (this.collectedDiamonds == this.totalDiamonds) {
            console.log('GANHOU');
            Globals.score = this.score;
            this.game.state.start('win');
        }
        this.player.body.velocity.y = -400;
        this.pickUp.play();
        diamond.kill();
    },
    specialPointsCollect: function (player, specialpoints) {
        this.collectedSpecialPoints++;
        this.score += 3000;
        this.scoreText.text = "Score: " + this.score;
        if (this.collectedSpecialPoints == this.totalspecialpoints) {
            console.log('GANHOU');
            Globals.score = this.score;
            this.game.state.start('win');
        }
        this.player.body.velocity.y = -400;
        this.pickUp.play();
        specialpoints.kill();
    },
    batCollision: function (player, bat) {
        if (player.body.touching.down && bat.body.touching.up) {
            this.enemyDeath.play();
            this.player.body.velocity.y = -200;
            this.score += 100;
            this.scoreText.text = "Score: " + this.score;
            bat.kill();
        } else {
            this.game.state.start('lose');
        }
    },
    lavaDeath: function (player, lava) {
        console.debug('MORREU');
        this.game.state.start('lose');
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
