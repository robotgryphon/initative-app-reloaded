export class Character {
  public name: String;
  public initiative: number = 0;
  public dexScore: number = 0;

  constructor(props?) {
    Object.assign(this, props);
  }

  toJSON() {
    return {
      name: this.name,
      initiative: this.initiative,
      dexScore: this.dexScore
    };
  }
}

export class PlayerCharacter extends Character {
  toJSON() {
    let j = super.toJSON();
    j.type = "player";
    return j;
  }
}

export class EnemyCharacter extends Character {
  toJSON() {
    let j = super.toJSON();
    j.type = "enemy";
    return j;
  }
}
