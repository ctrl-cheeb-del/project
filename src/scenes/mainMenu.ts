import Phaser, { Scene } from 'phaser'

export default class Game extends Phaser.Scene
{

	constructor()
	{
		super('mainMenu')
	}

	preload()
    {
    }

    create()
    {
    this.add.image(-220, -155, 'background').setOrigin(0)
    this.add.image(innerWidth / 2.8, innerHeight / 4.2, 'logo').setOrigin(0)
    const playbutton = this.add.image(innerWidth / 2.2, innerHeight / 2, 'playreal').setOrigin(0)
    this.add.image(innerWidth / 2.2, innerHeight / 1.2, 'settings').setOrigin(0)

    this.cameras.main.zoom = 0.59;

    playbutton.setInteractive()

    playbutton.on("pointerdown", ()=> {
        this.scene.stop()
        this.scene.start('game')
    })
 

    }


    update(t: number, dt: number){                

    }

}