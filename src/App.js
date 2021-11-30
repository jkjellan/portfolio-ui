import React, { Component } from "react";
import * as THREE from "three";
import earth from "./earth.jpeg";
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

class App extends Component {
  constructor(props) {
    super(props);
    this.threeJsMountRef = React.createRef();
  }
  componentDidMount() {
      // === THREE.JS CODE START ===
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      var renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setPixelRatio(window.devicePixelRatio);
      this.threeJsMountDiv.appendChild( renderer.domElement );

      var sphere = new THREE.Mesh( 
        new THREE.SphereGeometry( 5, 50, 50 ),
        new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader
        }) 
      );

      console.log(sphere)
      scene.add( sphere );
      camera.position.z = 10;
      var animate = function () {
        requestAnimationFrame( animate );
        //sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.001;
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
