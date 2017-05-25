function cameraController(time,self) {
    var timer = self.game.time.create(false);

    timer.loop(time, () => {
        if (preview) {
            self.game.camera.x++;
        }
        if (self.game.camera.atLimit.x) {
            preview = false;
        }

    }, self);
    timer.start();
}