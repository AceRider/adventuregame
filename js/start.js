"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var StartState = function (game) { };

// preload: carregar todos os assets necessários para esta scene ou para as próximas
StartState.prototype.preload = function () {
    game.load.image('menu', 'Assets/telas/Dungeons-and-Gold-INICIAL.png');
    game.load.image('btnplay', 'Assets/telas/Dungeons-and-Gold---BUTTON-PLAY.png');

}

// create: instanciar e inicializar todos os objetos dessa scene
StartState.prototype.create = function () {
    var s = game.add.sprite(0, 0, 'menu');
    this.start = game.add.sprite(310, 320, 'btnplay');
    this.start .anchor.setTo(0.5,0.5);
    this.credits = this.game.add.text(50, 470, 'Credits', fontCredits);
    this.credits .anchor.setTo(0.5,0.5);

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
StartState.prototype.update = function () {
    // if(game.input.activePointer.leftButton.isDown || this.returnKey.isDown){
    //     this.game.state.start('game');
    // }
}