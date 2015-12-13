(<any>ko).bindingHandlers.scrollDown = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var value: KnockoutObservable<any> = valueAccessor();
		var $element = $(element);
		ko.unwrap(value);
		
		value.subscribe(() => {
			$element.scrollTop(Number.MAX_VALUE);
		});
    }
}