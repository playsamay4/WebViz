import { fitTextToWidthHeadline } from '../utils/textUtils.js';
import { newAnimWithDevTools, easeFunc } from '../utils/animations.js';
import { vizEvents } from '../utils/events.js';
import { RemoveFromGraphicsStatus } from '../utils/websocket.js';


export class Headline {
    constructor(app) {
        if (!app) throw new Error('Headline requires app parameter');
        this.app = app;
        this.isIn = false;

        vizEvents.on('headline:out', () => {
            return this.outOneLine();
        });

        this.init(app);
    }

    async init(app) {
        this.ctr = new PIXI.Container();
        this.ctr.label = "Headline";

        // Initialize headline fade
        const headlineFadeTexture = await PIXI.Assets.load('images/HeadlineFade.png');
        this.headlineFade = new PIXI.Sprite(headlineFadeTexture);
        this.headlineFade.id = "Headline Fade";
        this.headlineFade.alpha = 0;
        this.headlineFade.width = 1920;
        this.headlineFade.height = 1280;
        this.ctr.addChild(this.headlineFade);

        // Initialize text components
        this.textLine1Offset = { y: 0 };
        this.textLine1 = new PIXI.Text({ 
            text: 'Athletics transgender ruling', 
            style: {
                fill: "#ffffff", 
                fontFamily: 'Reith Serif Regular', 
                fontSize: 55 
            }
        });
        this.textLine1.id = "Headline Text Line 1";
        this.textLine1.resolution = 2;
        this.textLine1.style.padding = 20;
        this.textLine1.x = 280;
        this.textLine1.y = 856;
        this.ctr.addChild(this.textLine1);


                
        this.newsBarLogoHeadline = {};
        this.newsBarLogoHeadline.ctr = new PIXI.Container(); 
        this.newsBarLogoHeadline.ctr.label = "News Bar Logo";

        this.newsBarLogoBoxHeadline = new PIXI.Graphics();


        this.newsBarLogoHeadline.ctr.addChild(this.newsBarLogoBoxHeadline);

        this.newsBarLogoHeadline.bbcLogo = new PIXI.Sprite(await PIXI.Assets.load('images/bbc.png'));
        this.newsBarLogoHeadline.bbcLogo.width = 560*0.21;
        this.newsBarLogoHeadline.bbcLogo.height = 160*0.22;
        this.newsBarLogoHeadline.bbcLogo.position.set(286,0);
        this.newsBarLogoHeadline.ctr.addChild(this.newsBarLogoHeadline.bbcLogo);

        this.newsBarLogoTextHeadline = new PIXI.Text({ text: 'NEWS', style: {fill: "#ffffff", fontFamily: 'Reith Sans Regular', fontSize: 35, fontWeight: 'bold' } });
        this.newsBarLogoTextHeadline.resolution = 2;
        this.newsBarLogoTextHeadline.x = 286 + this.newsBarLogoHeadline.bbcLogo.width + 11;
        this.newsBarLogoTextHeadline.y = 948;
        this.newsBarLogoHeadline.ctr.addChild(this.newsBarLogoTextHeadline);

        this.newsBarLogoBoxHeadline.rect(275, 942, this.newsBarLogoTextHeadline.width + 10 + this.newsBarLogoHeadline.bbcLogo.width + 20, 48);
        this.newsBarLogoBoxHeadline.fill(0xb80000);

        //mask
        this.newsBarLogoMaskHeadline = new PIXI.Graphics()
        // Add the rectangular area to show
            .rect(275, 942, this.newsBarLogoTextHeadline.width + 10 + this.newsBarLogoHeadline.bbcLogo.width + 20, 48)
            .fill(0xffffff);
        this.newsBarLogoHeadline.ctr.mask = this.newsBarLogoMaskHeadline;

        this.ctr.addChild(this.newsBarLogoHeadline.ctr);


        this.leftBar = {}; 
        this.leftBar.ctr = new PIXI.Container(); 
        this.leftBar.ctr.label = "Headline Left Bar";
        this.leftBarBackingRed = new PIXI.Graphics();
        this.leftBarBackingWhite = new PIXI.Graphics();
        
        this.leftBarBackingRed.rect(245, 900, 5, 50);
        this.leftBarBackingRed.fill(0xb80000);
        
        this.leftBarBackingWhite.rect(250, 900, 5, 50);
        this.leftBarBackingWhite.fill(0xffffff);
        
        this.leftBar.ctr.addChild(this.leftBarBackingWhite);
        this.leftBar.ctr.addChild(this.leftBarBackingRed);
        
        //Masks for the left bar
        this.leftBarMask = new PIXI.Graphics()
            // Add the rectangular area to show
            .rect(245, 900, 5, 50)
            .fill(0xffffff);
            this.leftBar.ctr.mask = this.leftBarMask;
        
    
        this.ctr.addChild(this.leftBar.ctr);


        // Create mask for the headline
        this.headlineMask = new PIXI.Graphics()
            .rect(280, 856, 1363, 128)
            .fill(0xffffff);
        this.textLine1.mask = this.headlineMask;
        this.ctr.addChild(this.headlineMask);

        // Add to stage
        app.stage.addChild(this.ctr);

        // Initialize state
        this.outInstant();

                
        //This would be run when text is updated, but for now we will just run it every 10ms
        setInterval(async () => {
            this.adjust();
        }, 10);
    }

    async inOneLine(text) {
        
        if (this.isIn) {
            await this.outOneLine();
            this.inOneLine(text);
            return;
        }
        

        await vizEvents.emit('lowerthird:out');
        await vizEvents.emit("tile:out");

        this.isIn = true;
        this.textLine1.text = text;
        this.adjust();

        let tl = newAnimWithDevTools("Headline In One Line");

        this.textLine1Offset.y = this.textLine1.height + 20;

        this.newsBarLogoHeadline.ctr.y = 48;

        this.leftBarBackingRed.y = -this.textLine1.height - 50;
        this.leftBarBackingWhite.y = -this.textLine1.height - 50;

        return new Promise(resolve => {
            tl.to(this.textLine1Offset, {
                y: 0,
                duration: 1.3,
                ease: "power4.out",
            });

            tl.to(this.headlineFade, {
                alpha: 1,
                duration: 1,
                onComplete: () => resolve(true)
            }, "<");

            tl.to(this.newsBarLogoHeadline.ctr, {
                y: 0,
                duration: 0.8,
                ease: easeFunc,
            }, "<");

            tl.to(this.leftBarBackingWhite, {
                y: 0,
                duration: 1,
                ease: easeFunc,
            }, "<");

            tl.to(this.leftBarBackingRed, {
                y: 0,
                duration: 1,
                ease: easeFunc,
                onComplete: () => 
                    {
                        resolve(true)
                        this.isIn = true;
                    }
            }, "<0.2");
    
        });
    }

    async outOneLine() {
        if (!this.isIn) return;

        let tl = newAnimWithDevTools("Headline Out One Line");

        return new Promise(resolve => {
            tl.to(this.newsBarLogoHeadline.ctr, {
                y: -48,
                duration: 1,
                ease: "power4.out",
            });
    
            tl.to(this.leftBarBackingWhite, {
                y: this.textLine1.height+50,
                duration: 1,
                ease: "power4.out",
            }, "<");
    
            tl.to(this.leftBarBackingRed, {
                y: this.textLine1.height+50,
                duration: 1,
                ease: "power4.out",
            }, "<");

  

            tl.to(this.headlineFade, {
                alpha: 0,
                duration: 1,
            }, "<");

            tl.to(this.textLine1Offset, {
                y: -this.textLine1.height - 20,
                duration: 1,
                ease: "power4.out",
                onComplete: () => {
                    RemoveFromGraphicsStatus("HEAD")
                    this.isIn = false
                    resolve(true);   
                }
            }, "<0.1");

            
        });
    }

    outInstant() {
        this.isIn = false;
        this.textLine1.text = "";
        this.headlineFade.alpha = 0;
        this.adjust();
        this.textLine1Offset.y = - this.textLine1.height - 20;
        this.newsBarLogoHeadline.ctr.y = -48;
        this.leftBarBackingWhite.y = this.textLine1.height+50;
        this.leftBarBackingRed.y = this.textLine1.height+50;

    }

    async adjust() {
        // this.textLine1.y = 1080 - 100 - this.textLine1.height + this.textLine1Offset.y;
        // await fitTextToWidthHeadline(this.textLine1, 1363, 128);
        
        // this.headlineMask.clear();
        // this.headlineMask.rect(280, (this.textLine1.y - this.textLine1Offset.y), 
        //     this.textLine1.width, this.textLine1.height + 20);
        // this.headlineMask.fill(0xffffff);

        //promise
        this.textLine1.y = 1080-100 - this.textLine1.height + this.textLine1Offset.y;
        await fitTextToWidthHeadline(this.textLine1, 1363, 128);
        //adjust the mask
        this.headlineMask.clear();
        this.headlineMask.rect(280, (this.textLine1.y- this.textLine1Offset.y), this.textLine1.width, this.textLine1.height+20);
        
        this.headlineMask.fill(0xffffff);
        
        
        this.newsBarLogoTextHeadline.y = (this.textLine1.y- this.textLine1Offset.y) - 48;
        this.newsBarLogoHeadline.bbcLogo.y = (this.textLine1.y- this.textLine1Offset.y) - 48 + 6;
        this.newsBarLogoBoxHeadline.clear();
        this.newsBarLogoBoxHeadline.rect(275, (this.textLine1.y- this.textLine1Offset.y) - 48, this.newsBarLogoTextHeadline.width + 10 + this.newsBarLogoHeadline.bbcLogo.width + 20, 48);
        this.newsBarLogoBoxHeadline.fill(0xb80000);

        this.newsBarLogoMaskHeadline.clear();
        this.newsBarLogoMaskHeadline.rect(275, (this.textLine1.y- this.textLine1Offset.y) - 48, this.newsBarLogoTextHeadline.width + 10 + this.newsBarLogoHeadline.bbcLogo.width + 20, 48);
        this.newsBarLogoMaskHeadline.fill(0xffffff);

        //redraw the left bar
        this.leftBarBackingRed.clear();
        this.leftBarBackingRed.rect(245, (this.textLine1.y- this.textLine1Offset.y) - 50, 5, this.textLine1.height + 50);
        this.leftBarBackingRed.fill(0xb80000);

        this.leftBarBackingWhite.clear();
        this.leftBarBackingWhite.rect(245, (this.textLine1.y- this.textLine1Offset.y) - 50, 5, this.textLine1.height + 50);
        this.leftBarBackingWhite.fill(0xffffff);

        this.leftBarMask.clear();
        this.leftBarMask.rect(245, (this.textLine1.y- this.textLine1Offset.y) - 50, 5, this.textLine1.height + 50);
        this.leftBarMask.fill(0xffffff);
    }
}