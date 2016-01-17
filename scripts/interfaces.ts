module DeckOfCards {
    export interface Player {
        id: string;
        name: string;
        color: string;
        orientation: number;
    }
    
    export interface Object3DCard extends THREE.Object3D {
        card?: Card;
    }
    
    export interface Dimensions {
        x: number,
        y: number
    }
}