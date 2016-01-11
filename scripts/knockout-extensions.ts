interface KnockoutObservableArray<T> {
    pushRange?: (newItems: Array<T>) => void;
}

ko.observableArray.fn['pushRange'] = function(newItems) {
    ko.unwrap(newItems).forEach(newItem => {
        this.push(newItem);
    });
};