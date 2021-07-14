import Phaser from 'phaser';

// Normalized random distribution
const rand = () => (Math.random() + Math.random() + Math.random()) / 3

// A scene for our game!
class MyScene extends Phaser.Scene {
  marioImage: Phaser.GameObjects.Image;

  preload() {
    // Load an image from imgur, and save it in Phaser as "mario"
    this.load.image('mario', 'https://i.imgur.com/nKgMvuj.png');
  }

  create() {
    // Add an instance of Mario positioned at (10, 25)
    this.marioImage = this.add.image(
      10, // x
      25, // y
      'mario',
    );

    // Update every second
    setInterval(this.updateMario, 1000);
  }

  updateMario = () => {
    // Tween to random position
    this.tweens.add({
      targets: this.marioImage,
      duration: 500,
      ease: 'Cubic',
      props: {
        x: rand() * 500,
        y: rand() * 500,
      }
    });

    // Tween to random width/height
    this.tweens.add({
      targets: this.marioImage,
      duration: 1000,
      ease: 'Bounce',
      props: {
        // Note that `image`s use displayWidth/Height instead of just `width/height`
        displayWidth: rand() * 500,
        displayHeight: rand() * 500,
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