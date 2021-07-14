Great. We have our Mario, we have a goomba, we're in business.

BUT! Right now, our canvas is only 500px by 500px. This means that anytime we position our player outside (500,500), the object will be cut off. Luckily, Phaser comes equipped with cameras!

Cameras are exactly as they sound; we're able to adjust camera position, zoom, rotation, etc. You're also even able to render cameras to textures, meaning you could do something like position a camera somewhere, and render that camera view to a piece of UI.

This allows us to do some really cool stuff! In this example, we're using the camera's `startFollow` function to lock onto our Mario image as it moves around. We also use `setBounds` to ensure that users can't see any black void around our background image.