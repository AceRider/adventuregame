var Collision = {
    collect: function (player, object, self) {
        if (object.name == "gold" || object.name == "gold2") {
            self.collectedDiamonds++;
            self.score += 100;
            self.scoreText.text = "Score: " + self.score;
            if (self.collectedDiamonds == self.totalDiamonds) {
            //    if (1 == 1) {
                console.log('GANHOU');
                Globals.score = self.score;
                this.isPlaying = self.music.isPlaying;
                self.game.state.start('game',true,false, {nextLevel:currentLevel+1,isPlaying:this.isPlaying});
            }
            self.player.body.velocity.y = -400;
            self.pickUp.play();
        }
        else if (object.name == "diamond") {
            self.collectedSpecialPoints++;
            self.score += 3000;
            self.scoreText.text = "Score: " + self.score;
            if (self.collectedSpecialPoints == self.totalspecialPoints) {
                console.log('GANHOU');
                Globals.score = self.score;
                self.game.state.start('game',true,false, {nextLevel:currentLevel+1}); 
            }
            self.player.body.velocity.y = -400;
            self.spPickUp.play();
        }
        else if (object.name == "skeleton" || object.name == "PinkEnemie" || object.name == "GreenEnemie") {
            if (player.body.touching.down && object.body.touching.up) {
                self.enemyDeath.play();
                self.player.body.velocity.y = -200;
                self.score += 1;
                self.scoreText.text = "Score: " + self.score;
            } else {
                Collision.death(player, object, self);
            }
        }else{
            console.log("Não mapeado ",object);
        }
        object.kill();
    },
    death: function (player, diamond, self) {
        console.debug('MORREU');
        self.game.state.start('game',true,false, {died:true});
    }
}