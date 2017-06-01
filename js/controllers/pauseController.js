function pauseController(self) {
    
    var w = 640, h = 480;
    var choiseLabel;
    
    // Create a label to use as a button
        pause_label = self.game.add.text(w - 100, 20, 'Pause', fontConfig);
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;
    
    
        window.onkeydown = function(event) {
            if (event.keyCode == 80){
                self.pauseIn.play();
               // setTimeout("funcao",1000);
                self.game.paused = !self.game.paused;
               // setTimeout(function(){
                 //  self.game.paused=!self.game.paused;
                //},1000);
                
                if(self.game.paused){
                    pauseLabel();
                }else{
                    unpause(event);        
                }
            }
        };
    
        function pauseLabel() {
            // When the paus button is pressed, we pause the game
                
           // self.game.physics.arcade.isPaused = true;

            // Then add the menu
            //menu = self.game.add.sprite(w/2, h/2, 'menu');
            //menu.anchor.setTo(0.5, 0.5);

            // And a label to illustrate which menu item was chosen. (This is not necessary)
            choiseLabel = self.game.add.text(w/2, h-150, 'Game Paused', fontConfig);
            choiseLabel.anchor.setTo(0.5, 0.5);
            choiseLabel.fixedToCamera = true;
            
        };

        // Add a input listener that can help us return from being paused
        self.game.input.onDown.add(unpause, self);

        // And finally the method that handels the pause menu
        function unpause(event){
                // Calculate the corners of the menu
                var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                    y1 = h/2 - 180/2, y2 = h/2 + 180/2;
                
                 choiseLabel.text = 'Pause';

                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                //    var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                    // Get menu local coordinates for the click
                  //  var x = event.x - x1,
                  //      y = event.y - y1;

                    // Calculate the choice 
                  //  var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                    // Display the choice
                  //  choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
                }
                    // Remove \the menu and the label
                   // menu.destroy();
                self.pauseOut.play();
                choiseLabel.destroy();
                    
            };
}