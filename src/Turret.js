var FIRE_DELAY = 2000;
var BULLET_VELOCITY = 200;

function Turret(game, ammo, player) {
    Phaser.Sprite.call(this, game, 0, 0, 'turret');

    this.animations.add('walk');
    this.animations.play('walk', 4, true);

    this.game = game;
    this.ammo = ammo;
    this.player = player;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.3, 0.3);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.laserSound = this.game.add.audio('laser');

    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(FIRE_DELAY, FIRE_DELAY * 2), this.fireWeapon.bind(this));

}
Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.constructor = Turret;

Turret.prototype.fireWeapon = function () {
    // Only fire our weapon if we are alive
    if (this.alive && this.player.alive) {
        var bullet = this.ammo.getFirstExists(false);
        if (bullet) {
            bullet.reset(this.body.x + this.width / 2, this.body.y + this.height / 2);
            this.game.physics.arcade.moveToObject(bullet, this.player, BULLET_VELOCITY);
            this.laserSound.play();
        }
    }

    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(FIRE_DELAY, FIRE_DELAY * 2), this.fireWeapon.bind(this));
};

module.exports = Turret;
