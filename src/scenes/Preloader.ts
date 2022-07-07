import Phaser from "phaser";

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        this.load.image('tiles', 'tiles/Serene_Village_16x16_extruded.png');
        this.load.tilemapTiledJSON('mainmap', 'tiles/mainmaptest.json');
        this.load.atlas('faune', 'character/faune.png', 'character/faune.json')
    } 

    create()
    {
        this.scene.start('game')
    }
}