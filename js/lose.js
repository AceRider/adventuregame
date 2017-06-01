"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var currentLevel=1;
var LoseState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
LoseState.prototype.preload = function() {
    game.load.image('gameover', 'Assets/telas/Dungeons-and-Gold---GAME-OVER.png');
}

LoseState.prototype.init= function (params) {
    console.log(params);
    if (params) {
        currentLevel = (params.nextLevel) ? params.nextLevel : currentLevel;
    }
}

// create: instanciar e inicializar todos os objetos dessa scene
LoseState.prototype.create = function() {
     var s = game.add.sprite(0, 0, 'gameover');
    this.returnKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

// update: o que fazer a cada quadro por segundo
LoseState.prototype.update = function() {
    if(this.returnKey.isDown){
        this.game.state.start('game',true,false,{nextLevel:currentLevel});
    }
}