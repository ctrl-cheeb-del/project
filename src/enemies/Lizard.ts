import Phaser from "phaser";

enum Direction 
{
    UP,
    DOWN,
    LEFT,
    RIGHT
}



export default class Lizard extends Phaser.Physics.Arcade.Sprite
{
    private direciton = Direction.RIGHT
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string){
        super(scene, x, y, texture, frame)

        this.anims.play('lizard-idle')
    }

    preUpdate(t: number, dt: number){
        super.preUpdate(t, dt)

        let speed = 50

        switch (this.direciton)
        {
            case Direction.UP: 
            this.setVelocity(0, -speed)
            break

            case Direction.DOWN: 
            this.setVelocity(0, speed)
            break

            case Direction.LEFT: 
            this.setVelocity(-speed, 0)
            break

            case Direction.RIGHT: 
            this.setVelocity(speed, 0)
            break
        }
    }
}