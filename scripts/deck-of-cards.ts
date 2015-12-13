/// <reference path="loaders" />
/// <reference path="log" />
/// <reference path="./viewModel/DeckOfCardsViewModel" />
/// <reference path="./components" />
/// <reference path="./customComponentLoader" />
/// <reference path="./bindings/log-binding" />
/// <reference path="./bindings/scrollDown-binding" />
/// <reference path="./Key" />
/// <reference path="./utility" />

module DeckOfCards {
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
	var raycaster = new THREE.Raycaster();
	
	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	$('#board-container').append(renderer.domElement)

	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 1, 1).normalize();
	scene.add(light);

	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		renderer.render(scene, camera);
	}
	
	ko.applyBindings(new ViewModel.DeckOfCardsViewModel());
}