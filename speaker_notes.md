Cool. We have a rectangle blinking around the screen. This is.. great.

Let's smooth out the motion by using a *tween*.

The animation term "tween" is derived from "inbetween," meaning a frame _in between_ another frame. CSS keyframe animations are an example of tweens; you define a few keyframes, and the animation generates the _inbetween_ frames, resulting in a smooth animation.

Scenes come with the ability to add/track/cancel tweens, which makes animations very easy to work with. Phaser also comes packed with extra ease settings such as `Cubic`, `Elastic`, `Circular`, etc.

Run the example and you should see the rectangle sliding around and bouncing to new dimensions. Notice how our anchor point of `0,0` means that the top left corner of the object never changes. If we remove `setOrigin(0,0)`, you can see the object grows/shrinks from its center instead.