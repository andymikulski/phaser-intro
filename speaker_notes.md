Objects in Phaser have their anchor point set to (0.5, 0.5) - or the _center_ of the object.

In canvas-land, we're more used to working with anchor points set to the top left of the object. We can change the anchor/pivot point pretty simply, through `setOrigin`.