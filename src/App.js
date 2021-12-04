import React, { Component } from "react";
import * as THREE from "three";
import earthTexture from "./earth.jpeg";
import gsap from 'gsap';
import './App.css'
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
import { Float32BufferAttribute } from "three";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

class App extends Component {
  constructor(props) {
    super(props);
    this.threeJsMountRef = React.createRef();
    this.state = {
      mouse: {
        x: 0,
        y: 0
      }
    }
  }
  componentDidMount() {
    const canvasWidth = this.threeJsMountDiv.width;
    const canvasHeight = this.threeJsMountDiv.height;
      // === THREE.JS CODE START ===
      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera( 75, this.threeJsMountDiv.offsetWidth/this.threeJsMountDiv.offsetHeight, 0.1, 1000 );
      let renderer = new THREE.WebGLRenderer({
        antialias: true,
        //canvas: this.threeJsMountDiv,
      });
      
      const canvasContainer = document.querySelector('#canvasContainer');
      renderer.setSize( this.threeJsMountDiv.offsetWidth, this.threeJsMountDiv.offsetHeight );
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
      camera.position.z = this.threeJsMountDiv.offsetHeight / 60;

      const group = new THREE.Group()
      group.add(sphere)
      group.renderOrder = 1;
      scene.add(group)

      const starGeometry = new THREE.
        BufferGeometry()
      const starMaterial = new THREE.
        PointsMaterial({
          color: 0xffffff
        })

      const starVertices = [];
      for(let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.floor(Math.random() * (1000 - 200 + 1) + 300)) * -1
        starVertices.push(x, y, z);
      }

      console.log({starVertices})
      starGeometry.setAttribute('position', 
        new Float32BufferAttribute(
          starVertices, 3)
        )
      const stars = new THREE.Points(
        starGeometry, starMaterial)
      scene.add(stars)


      const mouse = {
        x: 0,
        y: 0
      };

      var animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        sphere.rotation.y += 0.001;
        //group.rotation.y = mouse.x * .1;
        //group.rotation.x = mouse.y * -.1;
        gsap.to(group.rotation, {
          x: -mouse.y * 0.2,
          y: mouse.x * 0.2,
          duration: 2
        })
      };
      animate();
      // === THREE.JS EXAMPLE CODE END ===

      window.addEventListener('mousemove', () => {    
        mouse.x = (window.event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(window.event.clientY / window.innerHeight) * 2 + 1
        this.setState({mouse: mouse})
      });
  }

  render() {
    console.log(this.state.mouse)
    return (
      <Box height="100vh" sx={{ flexGrow: 1 }}>
        <Grid className="domContainer" height="100vh" container >
          <Grid height="100vh" item xs={6}>
            Hello World
          </Grid>
          <Grid height="100vh" className="canvasContainer" ref={(thisDiv) => {this.threeJsMountDiv = thisDiv}} id="canvasContainer" item xs={6}>
          </Grid>
        </Grid>
    </Box>
    )
  }
}

export default App;
