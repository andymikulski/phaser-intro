Alright! We've got a server, we've got a client, and our client automatically moves stuff when the server sends updates.

We've got a lot of code manipulating Phaser objects inside our network update functions. Let's abstract out a `PlayerEntity` class for Phaser, which will act as a container for our Mario image, text for the player's name, and any other visual elements that we may need attached (like a busy indicator).

Using our custom class, we're able to expose functions which simplify working with complex objects. In this example we can see `setPlayerColor`, `setPlayerName`, and `moveToPosition`.

By abstracting these functions to the PlayerEntity class itself, we now simply need a reference to the object to update its properties, nested visual elements, etc.