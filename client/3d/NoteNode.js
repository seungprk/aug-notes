import * as THREE from 'three';
import Helper from '../../helper';

class NoteNode {
  constructor(text, pos) {
    this.marker = NoteNode.createMarker(pos);

    const spritePos = pos.clone();
    spritePos.setY(pos.y + 5);
    this.textSprite = NoteNode.createTextSprite(text, spritePos);

    this.group = new THREE.Group();
    this.group.add(this.marker);
    this.group.add(this.textSprite);
    this.group.userData.noteNode = this;
  }

  addToScene(scene) {
    scene.add(this.group);
  }

  static createMarker(pos) {
    const geometry = new THREE.OctahedronGeometry(1);
    const material = new THREE.MeshNormalMaterial();
    const marker = new THREE.Mesh(geometry, material);
    marker.position.copy(pos);
    return marker;
  }

  static createTextSprite(text, pos) {
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

    return sprite;
  }
}

export default NoteNode;
