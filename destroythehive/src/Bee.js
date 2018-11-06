class Bee {

  constructor({ i, type, damage, health }) {
    this.id = i;
    this.type = type;
    this.damage = damage;
    this.health = health;
    this.alive = true;
  }

  reduceHealth() {
    this.health--;
  }

  checkHealth() {
    if (this.health < 0) {
      this.status = false;
    }
  }

}

export default Bee;

