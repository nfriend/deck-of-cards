module DeckOfCards.ViewModel {
    export class AddCardsViewModel {

        isVisible = ko.observable(false);

        constructor() {
            if (AddCardsViewModel.Instance) {
                throw 'AddCardsViewModel is a singleton and has already been instantiated.  Use AddCardsViewModel.Instance instead.';
            }
            AddCardsViewModel.Instance = this;
        }
        
        closeModal = () => {
            this.isVisible(false);
        }
        
        addCardsButtonClicked = () => {
            
        }

        static Instance: AddCardsViewModel;

        static ShowModal() {
            AddCardsViewModel.Instance.isVisible(true);
        }

        static HideModal() {
            AddCardsViewModel.Instance.closeModal();
        }
    }
}