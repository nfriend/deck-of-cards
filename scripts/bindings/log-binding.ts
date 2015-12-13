/// <reference path="../log" />

(<any>ko).bindingHandlers.log = {
	update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var value = valueAccessor();
		DeckOfCards.log(value);
    }
}