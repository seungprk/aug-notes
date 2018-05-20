/* eslint no-param-reassign: 0 */
import * as THREE from 'three';

class mainScene {
  constructor(attachDom) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    this.renderer = new THREE.WebGLRenderer({ canvas: attachDom });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 100;

    const light = new THREE.PointLight(0xFFFF00);
    light.position.set(10, 0, 25);
    this.scene.add(light);

    this.renderer.render(this.scene, this.camera);
  }

  addNode(x, y, z) {
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshNormalMaterial();
    const node = new THREE.Mesh(geometry, material);
    node.position.set(x, y, z);

    this.scene.add(node);
    this.animate(node);
  }

  animate(node) {
    const loopRender = () => {
      node.rotation.x += 0.01;
      node.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(loopRender);
    };
    loopRender();
  }
}

export default mainScene;
