module DeckOfCards.ViewModel {
    export class InfoViewModel {

        isVisible = ko.observable(false);

        constructor() {
            if (InfoViewModel.Instance) {
                throw 'InfoViewModel is a singleton and has already been instantiated.  Use InfoViewModel.Instance instead.';
            }
            InfoViewModel.Instance = this;
        }
        
        closeModal = () => {
            this.isVisible(false);
        }

        static Instance: InfoViewModel;

        static ShowModal() {
            InfoViewModel.Instance.isVisible(true);
        }

        static HideModal() {
            InfoViewModel.Instance.closeModal();
        }
    }
}