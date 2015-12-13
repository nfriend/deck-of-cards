module DeckOfCards {
	export interface Player {
		id: number;
		name: string;
		orientation: number;
	}
	
	export enum Suit {
		Hearts, Diamons, Spades, Clubs
	} 
	
	export enum CardNumber {
		Ace, Two, Three, Four, Five, Six, Seven,
		Eight, Nine, Ten, Jack, Queen, King, Joker
	}
	
	export interface Card extends GameItem {
		suit: Suit;
		number: CardNumber;
	}
	
	export enum ItemType {
		Card, PokerChip, Penny
	}
	
	export interface GameItem {
		type: ItemType;
		object: THREE.Object3D;
	}
	
	export interface GameInfo {
		id: string;
		players: Player[];
		scene: THREE.Scene;
		camera: THREE.Camera;
		lights: THREE.Light[];
		items: GameItem[];
	}
}