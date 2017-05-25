var Collision = {
    collect: function (player, object, self) {
        if (object.name == "diamond") {
            self.collectedDiamonds++;
            self.score += 100;
            self.scoreText.text = "Score: " + self.score;
            if (self.collectedDiamonds == self.totalDiamonds) {
                console.log('GANHOU');
                Globals.score = self.score;
                self.game.state.start('win');
            }
            self.player.body.velocity.y = -400;
            self.pickUp.play();
        }
        else if (object.name == "specialpoints") {
            self.collectedSpecialPoints++;
            self.score += 3000;
            self.scoreText.text = "Score: " + self.score;
            if (self.collectedSpecialPoints == self.totalspecialPoints) {
                console.log('GANHOU');
                Globals.score = self.score;
                self.game.state.start('win');
            }
            self.player.body.velocity.y = -400;
            self.pickUp.play();
        }
        else if (object.name == "bat") {
            if (player.body.touching.down && object.body.touching.up) {
                self.enemyDeath.play();
                self.player.body.velocity.y = -200;
                self.score += 1;
                self.scoreText.text = "Score: " + self.score;
            } else {
                Collision.death(player, object, self);
            }
        }
        object.kill();
    },
    death: function (player, diamond, self) {
        console.debug('MORREU');
        self.game.state.start('lose');
    }
}