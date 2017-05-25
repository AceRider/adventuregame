function playerController(self) {
    self.keys = self.game.input.keyboard.createCursorKeys();

    if (self.keys.left.isDown) {
        self.player.body.velocity.x = -150;
        if (self.player.scale.x == 1) {
            self.player.scale.x = -1;
        }
        self.player.animations.play('walk');

    } else if (self.keys.right.isDown) {
        self.player.body.velocity.x = 150;
        if (self.player.scale.x == -1) {
            self.player.scale.x = 1;
        }
        self.player.animations.play('walk');
    } else {
        self.player.body.velocity.x = 0;
        self.player.animations.play('idle');
    }
    if ((self.jumpButton.isDown || self.keys.up.isDown) && (self.player.body.touching.down || self.player.body.onFloor())) {
        self.player.body.velocity.y = -400;
        self.jumpSound.play();
    }

    if (!self.player.body.touching.down && !self.player.body.onFloor()) {
        self.player.animations.play('jump');
    }
}