module DeckOfCards.ViewModel {
    export class UnsupportedBrowserViewModel {

        isVisible = ko.observable(false);

        constructor() {
            if (UnsupportedBrowserViewModel.Instance) {
                throw 'UnsupportedBrowserViewModel is a singleton and has already been instantiated.  Use UnsupportedBrowserViewModel.Instance instead.';
            }
            UnsupportedBrowserViewModel.Instance = this;
        }
        
        closeModal = () => {
            this.isVisible(false);
        }

        static Instance: UnsupportedBrowserViewModel;

        static ShowModal() {
            UnsupportedBrowserViewModel.Instance.isVisible(true);
        }

        static HideModal() {
            UnsupportedBrowserViewModel.Instance.closeModal();
        }
    }
}