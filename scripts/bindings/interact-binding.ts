ko.bindingHandlers['interact'] = {
    init: (element: HTMLElement, valueAccessor: any, allBindings: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) => {
        interact(element).draggable({
            inertia: true,
            // restrict: {
            //     restriction: 'parent',
            //     endOnly: true,
            //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            // },
            onmove: dragMoveListener
        });

        function dragMoveListener(event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
            target.style.transform =
            'translate3d(' + x + 'px, ' + y + 'px,0)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    },
};