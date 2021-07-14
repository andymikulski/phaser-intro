We have a scene, let's draw something, finally!

We'll add a red rectangle to the screen via the scene's GameObject Factory. This is a fancy way of saying: you can do `someScene.add.[someObject]()` and Phaser will take care of creating and adding the new object to the scene.

Run this, and you'll see a red rectangle appear.

But wait!

If the position is (10,25), why isn't there a space between the red rectangle and the canvas border?