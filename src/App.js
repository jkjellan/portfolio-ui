import React, { Component } from "react";
import * as THREE from "three";
import earth from "./earth.jpeg"

class App extends Component {
  constructor(props) {
    super(props);
    this.threeJsMountRef = React.createRef();
  }
  componentDidMount() {
      // === THREE.JS CODE START ===
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      this.threeJsMountDiv.appendChild( renderer.domElement );

      var sphere = new THREE.Mesh( 
        new THREE.SphereGeometry( 5, 50, 50 ),
        new THREE.MeshBasicMaterial( { 
          map: new THREE.TextureLoader().load(earth)
        }) 
      );

      console.log(sphere)
      scene.add( sphere );
      camera.position.z = 20;
      var animate = function () {
        requestAnimationFrame( animate );
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render( scene, camera );
      };
      animate();
      // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return (
      <div ref={(thisDiv) => {this.threeJsMountDiv = thisDiv}}/>
    )
  }
}

export default App;
