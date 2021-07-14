Let's get really wild. This next step demonstrates a very simplified model of how game server updates can/will be propagated into Phaser.

We've added a `FakeServerUpdates` mechanism for demonstration purposes. **Do not worry about its implementation.** The FSU module mimics a game server where users join, maybe move around a little, and leave. Updates are sent periodically (every half second in this demo), and each user has a unique ID.

In our 'client' (the Phaser stuff), upon receiving a server update, our code checks a few things:
- Have any users left? If so, they should be removed from the game.
- Have any users joined? If so, they should be created and added to the game.
- Have any users moved? If so, we should update their position in game.

Through this, we are able to track each user's Phaser object, and update it accordingly. In this demo, you can see user positions update over time, and it'd be trivial to extend this to other properties: rotation, tint, etc. Going further, consider a player's `busy status`, `current avatar`, or even just `name` - all could be handled just as seamlessly.

This, in a _very_ tight nut shell, is what you can expect the new Gather->Phaser flow to look like!