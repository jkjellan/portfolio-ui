import React, { Component } from "react";
import * as THREE from "three";
import earthTexture from "./earth.jpeg";

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

class App extends Component {
  constructor(props) {
    super(props);
    this.threeJsMountRef = React.createRef();
    this.state = {
      mouse: {
        x: null,
        y: null
      }
    }
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
          fragmentShader,
          uniforms: {
            earthTexture: {
              value: new THREE.TextureLoader().load(earthTexture)
            }
          }
        }) 
      );

      scene.add( sphere );

      // sphere for atmosphere shader
      var atmosphere = new THREE.Mesh( 
        new THREE.SphereGeometry( 5, 50, 50 ),
        new THREE.ShaderMaterial({
          vertexShader: atmosphereVertexShader,
          fragmentShader: atmosphereFragmentShader,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide
        }) 
      );

      atmosphere.scale.set(1.2, 1.2, 1.2)

      scene.add( atmosphere );

      camera.position.z = 15;
      var animate = function () {
        requestAnimationFrame( animate );
        //sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.001;
        renderer.render( scene, camera );
      };
      animate();
      // === THREE.JS EXAMPLE CODE END ===

      window.addEventListener('mousemove', () => {
        const mouse = {
          x: undefined,
          y: undefined
        };
        
        mouse.x = (window.event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(window.event.clientY / window.innerHeight) * 2 + 1
        this.setState({mouse: mouse})
      });
  }

  render() {
    console.log(this.state.mouse)
    return (
      <div ref={(thisDiv) => {this.threeJsMountDiv = thisDiv}}/>
    )
  }
}

export default App;
