function cameraController(time, self) {
    var timer = self.game.time.create(false);
    console.log(self.camera.view);
    var oldX = -1;
    var oldY = -1;

    timer.loop(time, () => {
        if (preview) {
            var x = self.game.camera.x++;
            if (oldX == x) {
                oldY = self.game.camera.y;
                self.game.camera.x = 0;
                self.game.camera.y += 100;
            }
            oldX = x;

        }
        if (oldY == self.game.camera.y) {
            preview = false;
        }

    }, self);
    timer.start();
}