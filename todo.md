TODO
====

- upgrade to Bootstrap 3.3.7 if popover issue is resolved (currently on 3.3.4, and the popover animation isn't as nice)

- smarter image loading?  Currently, everything all card images are loaded on AddCardsViewModel instantiation

- What happens to chat messages once the player leaves disconnects?

- Change SVGs to PNGs - this will fix the strange resizing in Firefox

- Figure out how events from the server should be handled - right now the handlers are scattered throughout the app

- Better organize the "ViewModel" vs "Model" classes

- Make currently dragged card always appear on top

- change default scroll to be closer so that we don't start all the way zoomed out

- detect non-WebGL browser, show message