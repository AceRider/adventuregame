// Global variables - accessible on all states
var Globals = {
    score: 0
};

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-canvas');

game.state.add('boot', BootState);
game.state.add('start', StartState);
game.state.add('game', GameState);
game.state.add('win', WinState);
game.state.add('lose', LoseState);
game.state.add('credits', CreditsState);
game.state.start('boot');