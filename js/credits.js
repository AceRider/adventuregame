"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var CreditsState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
CreditsState.prototype.preload = function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
}

// create: instanciar e inicializar todos os objetos dessa scene
CreditsState.prototype.create = function() {
    
    this.text = "Universidade Estadual do Amazonas\n\n\n"+
                "Pós-Graduação em Desenvolvimento de Jogos Eletrônicos\n\n\n"+
                "Equipe:\n"+
                "Aecio Jorge\n"+
                "Carol\n"+ 
                "Eduardo Breno\n"+
                "Yasmim Barreto\n\n\n"+
                "Orientador: Prof. Bruno Araujo"
    
    this.textHelp = "Press any key to back";
   // this.textHelp.anchor.x = Math.round(this.textHelp.width * 0.5) / this.textHelp.width;
    
    this.game.add.text(18, 50, this.text, fontCredits);
    this.game.add.text(380/2, 430, this.textHelp, fontCredits);
    this.returnKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
     window.onkeydown = function(event) {
        this.game.state.start('start');
     }
}

// update: o que fazer a cada quadro por segundo
CreditsState.prototype.update = function() {
 
}