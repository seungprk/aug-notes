/* eslint no-param-reassign: 0 */
import * as THREE from 'three';
import Helper from '../../helper';

class mainScene {
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

  addNodeAtWindow(x, y) {
    const rayX = ((x / window.innerWidth) * 2) - 1;
    const rayY = (-(y / window.innerHeight) * 2) + 1;
    const rayVector = new THREE.Vector3(rayX, rayY, 0.5);
    rayVector.unproject(this.camera);

    const direction = rayVector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / direction.z;
    const markerPos = this.camera.position.clone().add(direction.multiplyScalar(distance));
    this.addMarker(markerPos);

    const spritePos = markerPos.clone();
    spritePos.setY(markerPos.y + 5);
    this.addTextSprite('hello world!', spritePos);
  }

  addMarker(pos) {
    const geometry = new THREE.OctahedronGeometry(1);
    const material = new THREE.MeshNormalMaterial();
    const marker = new THREE.Mesh(geometry, material);
    marker.position.copy(pos);

    this.scene.add(marker);
  }

  addTextSprite(text, pos) {
    const canvas = Helper.createTextCanvas(text);
    const spriteMap = new THREE.CanvasTexture(canvas);
    spriteMap.wrapS = THREE.RepeatWrapping;
    spriteMap.wrapT = THREE.RepeatWrapping;
    spriteMap.repeat.set(1, 1);

    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
    const sprite = new THREE.Sprite(spriteMaterial);

    const aspectRatio = canvas.width / canvas.height;
    const height = 5;
    sprite.scale.set(aspectRatio * height, height, 1);
    sprite.position.copy(pos);

    this.scene.add(sprite);
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

  startRenderLoop() {
    requestAnimationFrame(() => this.startRenderLoop());
    this.animations.forEach(animation => animation());
    this.renderer.render(this.scene, this.camera);
  }
}

export default mainScene;
