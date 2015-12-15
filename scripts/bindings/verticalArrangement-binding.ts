/// <reference path="../log" />

enum HeightType {
	Pixel, Percentage
}

(<any>ko).bindingHandlers.verticalArrangement = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

		let $element = $(element);

		function arrange() {

			let $children = $element.children(),
				totalHeight = $element.innerHeight(),
				totalPxRequested: number = 0,
				totalStarRequested: number = 0;

			let sizes: Array<{ type: HeightType, value: number }> = $.map($children, child => {
				let $child = $(child),
					attrValue = $child.attr('vertical-arrangement-height');

				if (!DeckOfCards.Utility.isNullOrUndefined(attrValue)) {
					if (/px/gi.test(attrValue)) {
						let px = parseFloat(attrValue.replace(/px/gi, ''));
						totalPxRequested += px;
						return { type: HeightType.Pixel, value: px };
					} else if (attrValue.indexOf('*') !== -1) {
						let star = parseFloat(attrValue.replace('*', ''));
						totalStarRequested += star;
						return { type: HeightType.Percentage, value: star };
					} else {
						DeckOfCards.log('unrecognized value for "vertical-arrangement-height" attribute: "' + attrValue + '"');
						totalStarRequested += 1;
						return { type: HeightType.Percentage, value: 1 };
					}
				} else {
					totalStarRequested += 1;
					return { type: HeightType.Percentage, value: 1 };
				}
			});

			let top = 0;
			$children.each((i, child) => {
				if (sizes[i].type === HeightType.Pixel) {
					let pxValue = sizes[i].value;

					$(child).css({
						position: 'absolute',
						height: pxValue + 'px',
						width: '100%',
						top: top + 'px'
					});

					top += pxValue;
				} else {
					let pxValue = ((totalHeight - totalPxRequested) / totalStarRequested) * sizes[i].value;

					$(child).css({
						position: 'absolute',
						height: pxValue + 'px',
						width: '100%',
						top: top + 'px'
					});

					top += pxValue;
				}
			});
		}

		let elementHeight = ko.observable($element.innerHeight());
		elementHeight.extend({ rateLimit: { timeout: 50, method: 'notifyWhenChangesStop' } });
		$(window).on('resize', () => {
			if ($element.innerHeight() !== elementHeight()) {
				elementHeight($element.innerHeight());
			}
		});
		elementHeight.subscribe(arrange);

		arrange();

		ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
			$(window).off('resize', arrange);
		});
    }
}