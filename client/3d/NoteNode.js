import * as THREE from 'three';
import Helper from '../../helper';

class NoteNode {
  constructor(title, pos) {
    this.title = title;
    this.defaultColor = 'indigo';
    this.highlightColor = 'red';
    this.highlighted = false;

    this.marker = NoteNode.createMarker(pos);

    const spritePos = pos.clone();
    spritePos.setY(pos.y + 5);
    this.textSprite = this.createTextSprite(title, spritePos);

    this.group = new THREE.Group();
    this.group.add(this.marker);
    this.group.add(this.textSprite);
    this.group.userData.noteNode = this;
  }

  addToScene(scene) {
    scene.add(this.group);
  }

  toggleHighlight() {
    const newColor = this.highlighted ? this.defaultColor : this.highlightColor;
    const canvas = Helper.createTextCanvas(this.title, newColor);
    const spriteMap = new THREE.CanvasTexture(canvas);
    this.textSprite.material.map = spriteMap;

    this.highlighted = !this.highlighted;
  }

  update(title, content) {
    this.group.remove(this.textSprite);
    this.textSprite.material.dispose();

    this.title = title;
    this.content = content;

    const updatedTextSprite = this.createTextSprite(title, this.textSprite.position);
    this.textSprite = updatedTextSprite;
    this.group.add(updatedTextSprite);
  }

  static createMarker(pos) {
    const geometry = new THREE.OctahedronGeometry(1);
    const material = new THREE.MeshNormalMaterial();
    const marker = new THREE.Mesh(geometry, material);
    marker.position.copy(pos);
    return marker;
  }

  createTextSprite(title, pos) {
    const canvas = Helper.createTextCanvas(title, this.defaultColor);
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
