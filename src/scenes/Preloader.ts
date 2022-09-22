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
        this.load.image('tiles2', 'tiles/Serene_Village_16x16.png');
        this.load.tilemapTiledJSON('map2', 'tiles/map2.json');
        this.load.image('ui-heart-empty', 'ui/ui_heart_empty.png')
		this.load.image('ui-heart-full', 'ui/ui_heart_full.png')
        this.load.image('knife', 'weapons/weapon_knife.png')
        this.load.atlas('faune', 'character/faune.png', 'character/faune.json')
        this.load.atlas('lizard', 'enemies/lizard.png', 'enemies/lizard.json')
    } 

    create()
    {
        this.scene.start('game')
    }
}