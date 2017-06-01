"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var StartState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
StartState.prototype.preload = function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
}

// create: instanciar e inicializar todos os objetos dessa scene
StartState.prototype.create = function() {
    this.game.add.text(100, 200, "Dungeons & Gold", fontTitle);
    this.start = this.game.add.text(250, 300, "Start Game", fontCredits);
    this.credits = this.game.add.text(250, 340, 'Credits', fontCredits);
   
    this.start.inputEnabled = true;
    this.start.events.onInputUp.add(function () {
        game.state.start('game');
    });
    
    this.credits.inputEnabled = true;
    this.credits.events.onInputUp.add(function () {
        game.state.start('credits');
    });
    
    //this.game.input.mouse.capture = true;
    //this.returnKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
  
}

// update: o que fazer a cada quadro por segundo
StartState.prototype.update = function() {
   // if(game.input.activePointer.leftButton.isDown || this.returnKey.isDown){
   //     this.game.state.start('game');
   // }
}