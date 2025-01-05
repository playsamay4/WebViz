import { newAnimWithDevTools } from "../utils/animations.js";
import { vizEvents } from "../utils/events.js";
import { RemoveFromGraphicsStatus } from "../utils/websocket.js";
export class Tile 
{
    constructor(app, tileType)
    {
        this.isIn = false;

        
        vizEvents.on('tile:out', () => {
            return this.out();
        });


        this.init(app, tileType);
    }

    async init(app, tileType)
    {
        const tileTexture = await PIXI.Assets.load(`tiles/${tileType}.png`);
        this.sprite = new PIXI.Sprite(tileTexture);
        this.sprite.id = "Tile";
        this.sprite.alpha = 0;
        app.stage.addChild(this.sprite);
    }

    async setTile(tileType)
    {
        console.log(`loading ${tileType}`);
        const tileTexture = await PIXI.Assets.load(`tiles/${tileType}.png`);
        this.sprite.texture = tileTexture; // Update the existing sprite's texture
        this.sprite.alpha = 0; // Ensure the alpha is set to 0

    }

    async in()
    {
        if (this.isIn)
        {
            return;
        }

        await vizEvents.emit('headline:out');
        await vizEvents.emit('lowerthird:out');

        this.isIn = true;
        let tl = newAnimWithDevTools("Tile In");

        return new Promise(resolve => {
            tl.to(this.sprite, {
                alpha: 1,
                duration: 0.4,
                onComplete: () => {
                    resolve(true)
                }
            });
        });
    }

    async out() {
        if (!this.isIn)
        {
            return;
        }

        this.isIn = false;
        let tl = newAnimWithDevTools("Tile Out");

        return new Promise(resolve => {
            tl.to(this.sprite, {
                alpha: 0,
                duration: 0.4,
                onComplete: () => {
                    RemoveFromGraphicsStatus(".5")
                    resolve(true);
                }
            });
        });
    }

}
