$(document).ready(function(e) {
	// set the scene size

	var WIDTH = window.innerWidth,
	    HEIGHT = window.innerHeight;

	// set some camera attributes
	var VIEW_ANGLE = 45,
	    ASPECT = WIDTH / HEIGHT,
	    NEAR = 0.1,
	    FAR = 10000;

	// create a WebGL renderer, camera
	// and a scene
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	var scene = new THREE.Scene();

	// the camera starts at 0,0,0 so pull it back
	camera.position.z = 300;

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	$('#container').append(renderer.domElement);

	// create the sphere's material
	var material = new THREE.MeshLambertMaterial(
	{
	    color: 0x666666
	});

	// and the camera
	scene.add(camera);

	// create a point light
	var pointLight = new THREE.PointLight( 0xFFFFFF );

	// set its position
	pointLight.position.x = 0;
	pointLight.position.y = 0;
	pointLight.position.z = 300;

	// add to the scene
	scene.add(pointLight);

	// draw!
	renderer.render(scene, camera);
	
	function render() {
		renderer.render(scene, camera);
	}
	const cols = 8/2;
	const rows = 4/2;
	const halfwid = 20;
	const fSc = 1;
	var animating = false;
	var shown = false;
	var cubes = new Array(cols);
	for (var i = cubes.length - 1; i >= 0; i--) {
		cubes[i] = new Array(rows);
		for (var j = cubes[i].length - 1; j >= 0; j--) {
			cubes[i][j] = new Array(4);
			for (var k = cubes[i][j].length - 1; k >= 0; k--) {
				cubes[i][j][k] = new THREE.Mesh(new THREE.CubeGeometry(40, 40, 40), material);
				cubes[i][j][k].scale.x = cubes[i][j][k].scale.y = cubes[i][j][k].scale.z = 0;
				cubes[i][j][k].rotation.x = 0;
				scene.add(cubes[i][j][k]);
			};
			cubes[i][j][0].position.x = cubes[i][j][2].position.x = -WIDTH/4;
			cubes[i][j][1].position.x = cubes[i][j][3].position.x = WIDTH/4;
			cubes[i][j][0].position.y = cubes[i][j][1].position.y = HEIGHT/4;
			cubes[i][j][2].position.y = cubes[i][j][3].position.y = -HEIGHT/4;
		};
	};
	
	function oneRotaDone(i, j, k) {
		if(k < 2) {
			cubes[i][j][k].rotation.x = -Math.PI;
		}
		else {
			cubes[i][j][k].rotation.x = Math.PI;	
		}
	}
	
	function animateShow() {
		animating = true;
		for (var i = cubes.length - 1; i >= 0; i--) {
			for (var j = cubes[i].length - 1; j >= 0; j--) {
				var tl1 = new TimelineLite({delay:0.2*( 4 -i - j), autoRemoveChildren:true, onUpdate:render, onComplete:animateShowDone});
									
				tl1.appendMultiple([new TweenLite(cubes[i][j][0].position, 0.4, {x:-halfwid*(2*i+1), y:halfwid*(2*j +1), z:0}),
									new TweenLite(cubes[i][j][0].rotation, 0.4, {x:Math.PI, onComplete:oneRotaDone, onCompleteParams:[i, j, 0]}),
									new TweenLite(cubes[i][j][0].scale, 0.4, {x:fSc, y:fSc, z:fSc}),

									new TweenLite(cubes[i][j][1].position, 0.4, {x:halfwid*(2*i+1), y:halfwid*(2*j +1), z:0}),
									new TweenLite(cubes[i][j][1].rotation, 0.4, {x:Math.PI, onComplete:oneRotaDone, onCompleteParams:[i, j, 1]}),
									new TweenLite(cubes[i][j][1].scale, 0.4, {x:fSc, y:fSc, z:fSc}),

									new TweenLite(cubes[i][j][2].position, 0.4, {x:-halfwid*(2*i+1), y:-halfwid*(2*j +1), z:0}),
									new TweenLite(cubes[i][j][2].rotation, 0.4, {x:-Math.PI, onComplete:oneRotaDone, onCompleteParams:[i, j, 2]}),
									new TweenLite(cubes[i][j][2].scale, 0.4, {x:fSc, y:fSc, z:fSc}),

									new TweenLite(cubes[i][j][3].position, 0.4, {x:halfwid*(2*i+1), y:-halfwid*(2*j +1), z:0}),
									new TweenLite(cubes[i][j][3].rotation, 0.4, {x:-Math.PI, onComplete:oneRotaDone, onCompleteParams:[i, j, 3]}),
									new TweenLite(cubes[i][j][3].scale, 0.4, {x:fSc, y:fSc, z:fSc})
									]);

				tl1.appendMultiple([new TweenLite(cubes[i][j][0].scale, 0.5, {z:0}),
									new TweenLite(cubes[i][j][0].rotation, 0.5, {x:0}),

									new TweenLite(cubes[i][j][1].scale, 0.5, {z:0}),
									new TweenLite(cubes[i][j][1].rotation, 0.5, {x:0}),

									new TweenLite(cubes[i][j][2].scale, 0.5, {z:0}),
									new TweenLite(cubes[i][j][2].rotation, 0.5, {x:0}),

									new TweenLite(cubes[i][j][3].scale, 0.5, {z:0}),
									new TweenLite(cubes[i][j][3].rotation, 0.5, {x:0})
									]);
				tl1 = null;
			};
		};
	}

	function animateShowDone() {
		animating = false;
		shown = true;
	}

	function animateHide() {
		animating = true;
		for (var i = cubes.length - 1; i >= 0; i--) {
			for (var j = cubes[i].length - 1; j >= 0; j--) {
				var tl1 = new TimelineLite({delay:0.2*( 4 -i - j), autoRemoveChildren:true, onUpdate:render, onComplete:animateHideDone});
									
				tl1.appendMultiple([new TweenLite(cubes[i][j][0].scale, 0.5, {z:fSc}),
									new TweenLite(cubes[i][j][0].rotation, 0.5, {x:Math.PI}),

									new TweenLite(cubes[i][j][1].scale, 0.5, {z:fSc}),
									new TweenLite(cubes[i][j][1].rotation, 0.5, {x:Math.PI}),

									new TweenLite(cubes[i][j][2].scale, 0.5, {z:fSc}),
									new TweenLite(cubes[i][j][2].rotation, 0.5, {x:-Math.PI}),

									new TweenLite(cubes[i][j][3].scale, 0.5, {z:fSc}),
									new TweenLite(cubes[i][j][3].rotation, 0.5, {x:-Math.PI})
									]);

				tl1.appendMultiple([new TweenLite(cubes[i][j][0].position, 0.4, {x:-WIDTH/4, y:HEIGHT/4, z:0}),
									new TweenLite(cubes[i][j][0].rotation, 0.4, {x:0, onComplete:oneRotaDone, onCompleteParams:[i, j, 0]}),
									new TweenLite(cubes[i][j][0].scale, 0.4, {x:0, y:0, z:0}),

									new TweenLite(cubes[i][j][1].position, 0.4, {x:WIDTH/4, y:HEIGHT/4, z:0}),
									new TweenLite(cubes[i][j][1].rotation, 0.4, {x:0, onComplete:oneRotaDone, onCompleteParams:[i, j, 1]}),
									new TweenLite(cubes[i][j][1].scale, 0.4, {x:0, y:0, z:0}),

									new TweenLite(cubes[i][j][2].position, 0.4, {x:-WIDTH/4, y:-HEIGHT/4, z:0}),
									new TweenLite(cubes[i][j][2].rotation, 0.4, {x:0, onComplete:oneRotaDone, onCompleteParams:[i, j, 2]}),
									new TweenLite(cubes[i][j][2].scale, 0.4, {x:0, y:0, z:0}),

									new TweenLite(cubes[i][j][3].position, 0.4, {x:WIDTH/4, y:-HEIGHT/4, z:0}),
									new TweenLite(cubes[i][j][3].rotation, 0.4, {x:0, onComplete:oneRotaDone, onCompleteParams:[i, j, 3]}),
									new TweenLite(cubes[i][j][3].scale, 0.4, {x:0, y:0, z:0})
									]);
				tl1 = null;
			};
		};	
	}

	function animateHideDone() {
		animating = false;
		shown = false;
	}

	$("#show").on('click', function() {
		if(!animating && !shown) {
			animateShow();
		}
	});

	$("#flip").on('click', function() {
		if(!animating && shown) {
			animateShow();
		}
	});

	$("#hide").on('click', function() {
		if(!animating && shown) {
			animateHide();
		}
	});

});