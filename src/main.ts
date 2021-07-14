import Phaser from 'phaser';

// A scene for our game!
class MyScene extends Phaser.Scene {
  create() {

    // Add a red 100w x 500h rectangle, positioned at (10, 25)
    this.add.rectangle(
      10, // x
      25, // y
      100, // width
      500, // height
      0xff0000 // fill color
    );
  }
}

// Create the Game instance and start the game loop!
new Phaser.Game({
  width: 500,
  height: 500,
  scene: MyScene,
});