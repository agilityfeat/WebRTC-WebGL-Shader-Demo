// standard global variables
var container, scene, camera, renderer;

// custom global variables
var video, videoImage, videoImageContext, videoTexture, movieScreen;

// FUNCTIONS 		
function init_video(){
  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  camera = new THREE.OrthographicCamera( 0, video.videoWidth, 0, video.videoHeight, 0, 10000);
  scene.add(camera);
  camera.position.set(0,0,-100);
  camera.lookAt(scene.position);	
  // RENDERER
  renderer = new THREE.WebGLRenderer( {antialias:true} );
    
  renderer.setSize(video.videoWidth, video.videoHeight);
  container = document.getElementById('video-out');
  container.appendChild( renderer.domElement );
  
  ///////////
  // VIDEO //
  ///////////
  
  videoImage = document.createElement( 'canvas' );
  videoImage.width = video.videoWidth;
  videoImage.height = video.videoHeight;

  videoImageContext = videoImage.getContext( '2d' );
  // background color if no video present
  videoImageContext.fillStyle = '#000000';
  videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

  videoTexture = new THREE.Texture( videoImage );
  videoTexture.flipY = false;
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  
  var movieMaterial = new THREE.ShaderMaterial(THREE.EdgeShader);
  movieMaterial.uniforms.tDiffuse.value = videoTexture;
  
  // the geometry on which the movie will be displayed;
  // movie image will be scaled to fit these dimensions.
  var movieGeometry = new THREE.PlaneBufferGeometry( videoImage.width, videoImage.height, 1, 1 );
  movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
  movieScreen.position.x = -video.videoWidth/2;
  movieScreen.position.y = video.videoHeight/2;
  
  scene.add(movieScreen);
        
  animate();
}

function animate() 
{
  requestAnimationFrame( animate );
  render();		
}

function render() 
{	
  if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
  {
    videoImageContext.drawImage( video, 0, 0 );
    if ( videoTexture ) 
      videoTexture.needsUpdate = true;
  }

  renderer.render( scene, camera );
}