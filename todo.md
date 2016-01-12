TODO
====

- websocket.connect() is currently called in DeckOfCardsViewModel in a setTimeout, to help mitigate issues
  around the "chatHistory" message being sent before the ChatViewModel is instantiated (and therefore
  before it's listening for the message).  This should be changed so that the ChatViewModel sends a message
  requesting initialization so that it will always be ready for the response.

- make color popover close on click outside

- color button isn't clickable in Firefox - an element is covering it.

- What happens to chat messages once the player leaves disconnects?