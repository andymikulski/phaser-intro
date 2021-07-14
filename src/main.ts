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
      50, // x
      50, // y
      'mario',
    );
    this.marioImage.displayWidth = 32;
    this.marioImage.displayHeight = 32;

    // Mark this object as interactive.
    // `useHandCursor` ensures that the mouse cursor changes when a user hovers.
    this.marioImage.setInteractive({ useHandCursor: true });

    // Bind over/out event handlers.
    // Phaser uses "pointer" to cover both mouse and touch inputs.
    this.marioImage.on('pointerover', () => {
      // Tint the image red
      this.marioImage.setTint(0xff0000);
    });
    this.marioImage.on('pointerout', () => {
      // Tint the image white (which basically just removes the tint)
      this.marioImage.setTint(0xffffff);
    });

    this.marioImage.on('pointerdown', this.updateMario);
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
      duration: 500,
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