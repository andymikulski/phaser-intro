import Phaser from 'phaser';

// Normalized random distribution
const rand = () => (Math.random() + Math.random() + Math.random()) / 3

// Our enemy! A goomba that chases Mario.
class ChasingGoomba extends Phaser.GameObjects.Image {
  private speed:number;

  constructor(scene: Phaser.Scene, x: number, y: number, private target: Phaser.GameObjects.Image){
    super(scene, x, y, 'goomba');

    this.displayWidth = 64;
    this.displayHeight = 64;

    this.speed = 10 + (rand()*25);
  }

  // Automatically invoked by Phaser when necessary.
  preUpdate = (timeElapsed: number, deltaTime: number) => {
    // Slow down the deltaTime a bit
    const adjustedTime = (deltaTime / 100);

    if (this.x < this.target.x) {
      this.x += this.speed * adjustedTime;
    } else if (this.x > this.target.x) {
      this.x -= this.speed * adjustedTime;
    }

    if (this.y < this.target.y) {
      this.y += this.speed * adjustedTime;
    } else if (this.y > this.target.y) {
      this.y -= this.speed * adjustedTime;
    }
  }
}

// A scene for our game!
class MyScene extends Phaser.Scene {
  marioImage: Phaser.GameObjects.Image;

  preload() {
    this.load.image('mario', 'https://i.imgur.com/nKgMvuj.png');
    this.load.image('goomba', 'https://i.imgur.com/qqdvBdS.png');
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

    // Depth acts similar to CSS z-index. This sets the mario image above everything else.
    this.marioImage.setDepth(10);

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

    // Create the enemy instance
    const goomba = new ChasingGoomba(this, 50, 50, this.marioImage);
    // Attach it to the scene. From here, the `preUpdate` will function automatically.
    this.add.existing(goomba);
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
        displayWidth: rand() * 250,
        displayHeight: rand() * 250,
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