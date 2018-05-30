/* eslint no-param-reassign: 0 */
import * as THREE from 'three';
import NoteNode from './NoteNode';
import './TrackballControls';

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

    this.controls = new THREE.TrackballControls(this.camera);

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

  mapWindowToPoint(x, y) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane();
    const planeNormal = new THREE.Vector3();
    const point = new THREE.Vector3();

    mouse.x = ((x / window.innerWidth) * 2) - 1;
    mouse.y = (-(y / window.innerHeight) * 2) + 1;
    planeNormal.copy(this.camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, this.scene.position);
    raycaster.setFromCamera(mouse, this.camera);
    raycaster.ray.intersectPlane(plane, point);

    return point;
  }

  addNodeAtWindow(title, content, x, y) {
    const point = this.mapWindowToPoint(x, y);
    const node = new NoteNode(title, content, point);
    node.addToScene(this.scene);
    return node;
  }

  addNodesFromArray(arr) {
    arr.forEach((nodeData) => {
      const {
        title,
        content,
        x,
        y,
        z,
      } = nodeData;

      const point = new THREE.Vector3(x, y, z);
      const node = new NoteNode(title, content, point);
      node.addToScene(this.scene);
    });
  }

  moveNodeAtWindow(x, y, node) {
    const point = this.mapWindowToPoint(x, y);
    node.moveTo(point);
  }

  addDonut(x, y, z) {
    const geometry = new THREE.TorusGeometry(5, 1, 16, 100);
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

  resetCamera() {
    this.controls.reset();
  }

  startRenderLoop() {
    requestAnimationFrame(() => this.startRenderLoop());
    this.animations.forEach(animation => animation());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default MainScene;

