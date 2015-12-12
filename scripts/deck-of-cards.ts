/// <reference path="loaders" />

module DeckOfCards {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
	var raycaster = new THREE.Raycaster();
	var objects: THREE.Object3D[] = [];
	var selected: THREE.Object3D = null;

	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 1, 1).normalize();
	scene.add(light);

	var imagePaths = ['./images/cards/back.svg', './images/cards/blackjoker.svg', './images/cards/redjoker.svg'];

	['hearts', 'diamonds', 'clubs', 'spades'].forEach(suit => {
		['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'].forEach(card => {
			imagePaths.push('./images/cards/' + suit + '/' + card + '.svg');
		});
	})

	DeckOfCards.loadTextures(imagePaths).then(textures => {

		let backTexture = textures.splice(0, 1)[0];

		textures.forEach(texture => {

			let card = new THREE.Object3D();

			let frontGeometry = new THREE.PlaneGeometry(170, 237),
				frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true }),
				frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);

			let backGeometry = new THREE.PlaneGeometry(170, 237),
				backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: backTexture, transparent: true }),
				backMesh = new THREE.Mesh(backGeometry, backMaterial);
				
			backGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));

			card.add(frontMesh);
			card.add(backMesh);

			let factor = 600;
			card.position.set((Math.random() - .5) * factor * 2, (Math.random() - .5) * factor, (Math.random() - .5) * factor / 3);

			objects.push(frontMesh);
			objects.push(backMesh);
			scene.add(card);

			camera.position.z = 2000;
		});

		renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
		renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
		renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

		animate();
	});

	function onDocumentMouseDown(event: MouseEvent) {
		event.preventDefault();

		let mouse = {
			x: (event.clientX / window.innerWidth) * 2 - 1,
			y: - (event.clientY / window.innerHeight) * 2 + 1
		};

		raycaster.setFromCamera(mouse, camera);

		let intersects = raycaster.intersectObjects(objects);

		if (intersects.length > 0) {
			selected = intersects[0].object.parent;
			console.log('object to remove: ', selected);
			// scene.remove(selected);
			// objects.splice(objects.indexOf(selected), 1); 
		}
	}

	function onDocumentMouseMove(event) {

	}

	function onDocumentMouseUp(event) {

	}

	function animate() {
		requestAnimationFrame(animate);

		if (selected) {
			selected.rotateY(.05);
		}
		
		camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), .01);

		render();
	}

	function render() {
		renderer.render(scene, camera);
	}
}