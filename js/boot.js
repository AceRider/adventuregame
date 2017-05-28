"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var BootState = function(game) {};

var fontConfig =  { 
    font : 'Press Start 2P',
    fontSize : 20,
    fill: "#ffffff" };

// preload: carregar todos os assets necessários para esta scene ou para as próximas
BootState.prototype.preload = function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
    this.game.load.spritesheet('player', 'Assets/spritesheets/player.png', 32, 32, 8);
    this.game.load.spritesheet('items', 'Assets/spritesheets/items.png', 32, 32, 16);
    this.game.load.spritesheet('enemies', 'Assets/spritesheets/enemies.png', 32, 32, 112);
    this.game.load.image('mapTiles', 'Assets/spritesheets/tiles.png');
    this.game.load.audio('jumpSound', 'Assets/sounds/jump.wav');
    this.game.load.audio('pickUp', 'Assets/sounds/pickup.wav');
    this.game.load.audio('enemyDeath', 'Assets/sounds/hit2.ogg');
    this.game.load.audio('music', 'Assets/sounds/mystery.wav');
    this.game.load.tilemap('level1', 'Assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('level2', 'Assets/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('level3', 'Assets/maps/level3.json', null, Phaser.Tilemap.TILED_JSON);
    
}

// create: instanciar e inicializar todos os objetos dessa scene
BootState.prototype.create = function() {
   // this.game.add.text(200, 200, "You Win!", {font: "35px Arial", fill: "#ffffff"});
   // this.game.add.text(200, 300, "Score: "+Globals.score, {font: "35px Arial", fill: "#ffffff"});
   // this.returnKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.game.state.start('start');
}

// update: o que fazer a cada quadro por segundo
BootState.prototype.update = function() {
   
        
   
}