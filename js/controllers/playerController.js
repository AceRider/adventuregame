function playerController(self) {
    self.keys = self.game.input.keyboard.createCursorKeys();
    
    this.wasd = {
      up: self.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: self.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: self.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: self.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    
    //console.log("move cam ", self.game.paused);
    
    if(self.game.physics.arcade.isPaused){
         if(this.wasd.left.isDown){
             self.game.camera.x++;
             console.log("move cam");
         }
    }

    if (self.keys.left.isDown || this.wasd.left.isDown) {
        self.player.body.velocity.x = -150;
        if (self.player.scale.x == 1) {
            self.player.scale.x = -1;
        }
        self.player.animations.play('walk');

    } else if (self.keys.right.isDown || this.wasd.right.isDown) {
        self.player.body.velocity.x = 150;
        if (self.player.scale.x == -1) {
            self.player.scale.x = 1;
        }
        self.player.animations.play('walk');
    } else {
        self.player.body.velocity.x = 0;
        self.player.animations.play('idle');
    }
    if ((self.jumpButton.isDown || self.keys.up.isDown || this.wasd.up.isDown) && (self.player.body.touching.down || self.player.body.onFloor())) {
        self.player.body.velocity.y = -400;
        self.jumpSound.play();
    }

    if (!self.player.body.touching.down && !self.player.body.onFloor()) {
        self.player.animations.play('jump');
    }
    
    
}