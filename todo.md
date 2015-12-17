TODO
====

- Interface has changed for chat messages. Need to update client to respect this interface
- Interface has also changed for joining.
- Client needs to know about other players so it can display the player names and colors in the chat (since the chat has been changed to only send IDs, not player names).
- Client needs an initialization message after it sends a "join" message
- ChatViewModel is currently not compiling due to the changes in the chatting process
- ChatViewModel needs to be refactored to properly use a global websocketservice.
- What happens to chat messages once the player leaves disconnects?