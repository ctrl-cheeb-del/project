import Phaser from "phaser";

export default class Lizard extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string){
        super(scene, x, y, texture, frame)

        this.anims.play('lizard-idle')
    }
}