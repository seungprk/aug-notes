/* eslint no-param-reassign: 0 */
import * as THREE from 'three';
import NoteNode from './NoteNode';

class MainScene {
  constructor(attachDom) {
    this.animations = [];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer({ canvas: attachDom });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.PointLight(0xFFFF00);
    light.position.set(10, 0, 25);
    this.scene.add(light);

    this.startRenderLoop();
  }

  selectAtWindow(x, y) {
    const raycaster = new THREE.Raycaster();
    const windowPos = new THREE.Vector2();
    windowPos.x = ((x / window.innerWidth) * 2) - 1;
    windowPos.y = (-(y / window.innerHeight) * 2) + 1;

    raycaster.setFromCamera(windowPos, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children, true);

    return intersects.length > 0 ? intersects[0].object : null;
  }

  selectNodeAtWindow(x, y) {
    const selected = this.selectAtWindow(x, y);
    if (selected && selected.parent && selected.parent.userData.noteNode) {
      return selected.parent.userData.noteNode;
    }
    return null;
  }

  addNodeAtWindow(text, x, y) {
    const rayX = ((x / window.innerWidth) * 2) - 1;
    const rayY = (-(y / window.innerHeight) * 2) + 1;
    const rayVector = new THREE.Vector3(rayX, rayY, 0.5);
    rayVector.unproject(this.camera);

    const direction = rayVector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / direction.z;
    const nodePos = this.camera.position.clone().add(direction.multiplyScalar(distance));
    const node = new NoteNode(text, nodePos);

    node.addToScene(this.scene);
  }

  addDonut(x, y, z) {
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshNormalMaterial();
    const node = new THREE.Mesh(geometry, material);
    node.position.set(x, y, z);

    this.scene.add(node);
    this.animations.push(() => {
      node.rotation.x += 0.01;
      node.rotation.y += 0.01;
    });
  }

  connectNodes(startNode, endNode) {
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const geometry = new THREE.Geometry();

    const startPos = startNode.marker.position.clone();
    const endPos = endNode.marker.position.clone();
    geometry.vertices.push(startPos);
    geometry.vertices.push(endPos);

    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  }

  startRenderLoop() {
    requestAnimationFrame(() => this.startRenderLoop());
    this.animations.forEach(animation => animation());
    this.renderer.render(this.scene, this.camera);
  }
}

export default MainScene;

