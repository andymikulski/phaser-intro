import Phaser from 'phaser';

// Normalized random distribution
const rand = () => (Math.random() + Math.random() + Math.random()) / 3

// A scene for our game!
class MyScene extends Phaser.Scene {
  rect: Phaser.GameObjects.Rectangle;

  create() {
    // Add a red 100w x 500h rectangle, positioned at (10, 25)
    this.rect = this.add.rectangle(
      10, // x
      25, // y
      100, // width
      500, // height
      0xff0000 // fill color
    );

    // Move the rect's anchor point to the top left corner
    this.rect.setOrigin(0, 0);

    // Update the rectangle every second
    setInterval(this.updateRectangle, 1000);
  }

  updateRectangle = () => {
    // Tween to random position
    this.tweens.add({
      targets: this.rect,
      duration: 500,
      ease: 'Cubic',
      props: {
        x: rand() * 500,
        y: rand() * 500,
      }
    });

    // Tween to random width/height
    this.tweens.add({
      targets: this.rect,
      duration: 1000,
      ease: 'Bounce',
      props: {
        width: rand() * 500,
        height: rand() * 500,
      }
    });
  }
}

// Create the Game instance and start the game loop!
new Phaser.Game({
  width: 500,
  height: 500,
  scene: MyScene,
});