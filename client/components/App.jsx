import React from 'react';
import * as THREE from 'three';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const material = new THREE.MeshLambertMaterial({ color: 0xfd59d7 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 100;

    const light = new THREE.PointLight(0xFFFF00);
    light.position.set(10, 0, 25);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return <canvas ref={this.canvas} />;
  }
}

export default App;
