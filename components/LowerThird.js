import { fitTextToWidth, singleLineYoffset } from '../utils/textUtils.js';
import { newAnim, newAnimWithDevTools, easeFunc } from '../utils/animations.js';
import { vizEvents } from '../utils/events.js';
import { config } from '../utils/config.js';
import { RemoveFromGraphicsStatus } from '../utils/websocket.js';
import { TedMessage } from '../utils/smallted.js';

class Flipper {
    constructor(parent)
    {   
        this.isIn = false;
        this.headlines = 
        [
            {type: "Headline", text: "Mum, dad and daughters, 4 and 9, among crash dead", duration: 5},
            {type: "Headline", text: "Tories spent £700m on Rwanda scheme, Cooper says", duration: 5},
            {type: "Headline", text: "Woman died after begging GP for help - inquest", duration: 5},
            {type: "Headline", text: "Conservatives plan to name new leader in November", duration: 5},
            {type: "Headline", text: "Woman killed in attack by pet dog", duration: 5},     
        ]


        this.init(parent);
    }



    init(parent)
    {
        this.ctr = new PIXI.Container();
        this.ctr.label = "Flipper";
        
        this.backing = new PIXI.Graphics();
        this.dot = new PIXI.Graphics();
        //flipper backing
        this.backing.rect(0, 990, 1920, 90);
        this.backing.fill(0xFFFFFF, config.flipperAlpha);

        this.content = {}
        this.content.ctr = new PIXI.Container(); this.content.ctr.label = "Flipper Content";

        this.text = new PIXI.Text({ text: config.tickerOffText, style: {fill: "#3d3d3d", fontFamily: 'Reith Sans Medium', fontSize: 34} });
        this.text.resolution = 2;
        this.text.x = 311
        this.text.y = 995;



        //flipper dot
        this.dot.rect(288, 1008, 10, 10);
        this.dot.fill(0xb80000);

        this.ctr.addChild(this.backing);
        this.content.ctr.addChild(this.dot);
        this.content.ctr.addChild(this.text);

        this.contentMask = new PIXI.Graphics()
        // Add the rectangular area to show
            .rect(288, 995, 1920, 40)
            .fill({color: 0xffffff, alpha: 0});
        this.ctr.addChild(this.contentMask);
        this.content.ctr.mask = this.contentMask;

        this.ctr.addChild(this.content.ctr);

        parent.ctr.addChild(this.ctr);

        this.clock = new Clock(this);
    }


}

class Clock {
    constructor(parent)
    {
        this.isIn = false;

        this.init(parent);
    }

    init(parent)
    {
        this.ctr = new PIXI.Container()
        this.ctr.label = "Clock";

        this.backing = new PIXI.Graphics();
        this.backing.rect(1525, 990, 120, 48);
        this.backing.fill(0xb80000);
        this.ctr.addChild(this.backing);

        this.text = new PIXI.Text({ text: '21:01', style: {fill: "#ffffff", fontFamily: 'Reith Sans Medium', fontSize: 35} });
        this.text.resolution = 2;
        this.text.x = 1540;
        this.text.y = 992;
        this.ctr.addChild(this.text);

        //clocks mask
        this.clockMask = new PIXI.Graphics()
        // Add the rectangular area to show
            .rect(1525, 990, 120, 48)
            .fill(0xffffff);
        this.ctr.mask = this.clockMask;

        parent.ctr.addChild(this.clockMask);
        parent.ctr.addChild(this.ctr);
    }
}

class NewsBar {
    constructor(parent, newsBarText)
    {
        this.isIn = false;

        this.init(parent, newsBarText)
    }

    async init(parent, newsBarText)
    {
        this.ctr = new PIXI.Container(); 
        this.ctr.label = "News Bar";

        this.backing = new PIXI.Graphics();
        this.backing.rect(0, 942, 1920, 48);
        this.backing.fill(config.strapColor);
        this.ctr.addChild(this.backing);



        // Create a graphics object to define our mask
        this.mask = new PIXI.Graphics()
        // Add the rectangular area to show
        .rect(0, 942, 1920, 48)
        .fill(0xffffff);
        this.mask.id = "mask";

        parent.flipper.ctr.addChild(this.mask);
        this.ctr.mask = this.mask;

        
        this.textLine1 = new PIXI.Text({ text: 'Russian debt payments', style: {fill: "#ffffff", fontFamily: 'Reith Serif Medium', fontSize: 55 } }); 
        this.textLine1.id = "Text Line 1";
        this.textLine1.resolution = 2;
        this.textLine1.x = 286;
        this.textLine1.y = 985;
        this.ctr.addChild(this.textLine1);

        this.textLine2 = new PIXI.Text({ text: 'US Treasury ends waiver allowing some payments', style: {fill: "#ffffff", fontFamily: 'Reith Sans Medium', fontSize: 40.5 } }); 
        this.textLine2.id = "Text Line 2";
        this.textLine2.resolution = 2;
        this.textLine2.x = 286;
        this.textLine2.y = 1047;
        this.ctr.addChild(this.textLine2);

        //mask that will show the contents of the bar minus the logo strip bit
        this.nameStrapMask = new PIXI.Graphics()
            .rect(0, 942-125, 1920, 125)
            .fill(0xffffff);

        this.textLine1.mask = this.nameStrapMask;
        this.textLine2.mask = this.nameStrapMask;

        this.singleText = new PIXI.BitmapText({ 
                text: 'UK Deputy PM Raab resigns', 
                style: {
                    fill: "#ffffff", 
                    fontFamily: 'Reith Serif Medium Bitmap', 
                    fontSize: 92 
                } 
            }); 
        this.singleText.id = "Single Text";
        this.singleText.x = 281.5;
        this.singleText.y = 1014;
        //target 858.5
        //hidden: 1014
        this.ctr.addChild(this.singleText);

        
        this.logo = {};
        this.logo.ctr = new PIXI.Container();
        this.logo.ctr.label = "News Bar Logo";

        this.logoBox = new PIXI.Graphics();


        this.logo.ctr.addChild(this.logoBox);

        this.logo.bbcLogo = new PIXI.Sprite(await PIXI.Assets.load('images/bbc.png'));
        this.logo.bbcLogo.width = 560*0.21;
        this.logo.bbcLogo.height = 160*0.21;
        this.logo.bbcLogo.position.set(286,949);
        this.logo.ctr.addChild(this.logo.bbcLogo);

        this.logoText = new PIXI.Text({ text: newsBarText, style: {fill: "#ffffff", fontFamily: 'Reith Sans Bold', fontSize: 35} });
        this.logoText.resolution = 2;
        this.logoText.x = 286 + this.logo.bbcLogo.width + 11;
        this.logoText.y = 943;
        this.logo.ctr.addChild(this.logoText);

        this.logoBox.rect(275, 942, this.logoText.width + 10 + this.logo.bbcLogo.width + 20, 48);
        this.logoBox.fill(0xb80000);
        this.logo.mask = this.mask;

        this.ctr.addChild(this.logo.ctr);

        this.textBadge = {};
        this.textBadge.ctr = new PIXI.Container(); 
        this.textBadge.ctr.label = "Text Badge";

        this.textBadgeBacking = new PIXI.Graphics();
        this.textBadgeBacking.rect(275 + this.logoText.width + 10 + this.logo.bbcLogo.width + 20, 942+48, 1920, 48);
        this.textBadgeBacking.fill(0xffffff);
        this.textBadge.ctr.addChild(this.textBadgeBacking);

        this.textBadgeText = new PIXI.Text({ text: 'COMING UP', style: {fill: "#3f3e42", fontFamily: 'Reith Sans Medium', fontSize: 35} });
        this.textBadgeText.resolution = 2;
        this.textBadgeText.x = 275 + this.logoText.width + 10 + this.logo.bbcLogo.width + 32;
        this.textBadgeText.y = 943+45;
        this.textBadge.ctr.addChild(this.textBadgeText);

        this.textBadgeBacking.clear();
        this.textBadgeBacking.rect(275 + this.logoText.width + 10 + this.logo.bbcLogo.width + 20, 942+48, this.textBadgeText.width + 24, 48);
        this.textBadgeBacking.fill(0xffffff);

        //mask
        this.textBadgeMask = new PIXI.Graphics()
            .rect(275 + this.logoText.width + 10 + this.logo.bbcLogo.width + 20, 942, 1920, 48)
            .fill(0xffffff);
        this.textBadge.ctr.mask = this.textBadgeMask;
        this.textBadge.ctr.addChild(this.textBadgeMask);

        this.ctr.addChild(this.textBadge.ctr);

        this.programmeBadge = {};
        this.programmeBadge.ctr = new PIXI.Container(); 
        this.programmeBadge.ctr.label = "Programme Badge";

        this.programmeBadgeBacking = new PIXI.Graphics();
        //this one is aligned to the right, inside the safe area
        this.programmeBadgeBacking.rect(1920-275-10-192, 942+48, 1920, 48);
        this.programmeBadgeBacking.fill(0xffffff);
        this.programmeBadge.ctr.addChild(this.programmeBadgeBacking);

        this.programmeBadgeText = new PIXI.Text({ text: 'THE CONTEXT', style: {fill: "#ffffff", fontFamily: 'Reith Sans Bold', fontSize: 30} });
        this.programmeBadgeText.resolution = 2;
        //calculate the x position based on the width of the text
        this.programmeBadgeText.x = 1920-275-this.programmeBadgeText.width-11;
        this.programmeBadge.ctr.addChild(this.programmeBadgeText);

        this.programmeBadgeBacking.clear();
        this.programmeBadgeBacking.rect(1920-275-this.programmeBadgeText.width-24, 942+48, this.programmeBadgeText.width + 24, 48);
        this.programmeBadgeBacking.fill(0xd00001);

        this.programmeBadge.ctr.mask = this.textBadgeMask;

        this.ctr.addChild(this.programmeBadge.ctr);

        parent.ctr.addChild(this.ctr);



    }

    async setLogo(logoType)
    {
        console.log(`loading ${logoType}`);
        var logoTexture;

        if(logoType == "gill")
        {
            logoTexture = await PIXI.Assets.load(`images/GillSansLogo.png`);
            this.logoText.style.fontFamily = "Reith Sans Medium";
        }
        if(logoType == "reith")
        {
            logoTexture = await PIXI.Assets.load(`images/bbc.png`);
            this.logoText.style.fontFamily = "Reith Sans Bold";
        }
        
    
        this.logo.bbcLogo.texture = logoTexture; 

    }

    changeNewsBarLogoText(text)
    {
        this.logoText.text = text;
        this.logoBox.clear();
        this.logoBox.rect(275, 942, this.logoText.width + 10 + this.logo.bbcLogo.width + 20, 48);
        this.logoBox.fill(0xb80000);
        this.logo.ctr.y = 48;

        this.textBadgeText.x = 275 + this.logoText.width + 10 + this.logo.bbcLogo.width + 32;
    }
}

export class LowerThirdFull {

    constructor(app, newsBarText) 
    {
        this.isIn = false;

        this.twoLineIsIn = false;
        this.twoLineNameIsIn = false;
        this.oneLineNameIsIn = false;
        this.oneLineIsIn = false;

        this.lowerThirdIsIn = false;
        this.flipperIsIn = false;

        this.textBadgeIsIn = false;

        this.programmeBadgeIsIn = false;
        this.programmeBadgeEnabled = false;

        vizEvents.on('lowerthird:out', () => {
            return this.lowerThirdOut();
        });

        this.init(app, newsBarText);


    }

    init(app, newsBarText)
    {
        

        this.ctr = new PIXI.Container();       
        this.ctr.label = "Full Lower Third Container";


        this.flipper = new Flipper(this);
        this.newsBar = new NewsBar(this, newsBarText);

        app.stage.addChild(this.ctr);
    }

    async twoLineIn(line1, line2, badgeText)
    {

        console.log("Badge text: "+badgeText)

        let tl = newAnimWithDevTools("Show Two Liner with Flipper")

        if(this.twoLineIsIn)
        {
            await this.twoLineOut();
        }
        this.twoLineIsIn = true;

        
        await this.oneLineOut();
        await this.twoLineNameOut();
        await this.oneLineNameOut();

        //todo: change this into an event
        await vizEvents.emit('tile:out');

        let animDuration = 1;

        //turn off text masks
        this.newsBar.textLine1.mask = null;
        this.newsBar.textLine2.mask = null;
        return new Promise(resolve => { // Wrap the animation in a Promise
            let val = {y: 942, height: 48};
            tl.to(val, {
                y: 817,
                height: 173,
                duration: animDuration,
                ease: easeFunc,
                onUpdate: () =>
                {
                    this.newsBar.mask.clear();
                    this.newsBar.mask.rect(0, val.y, 1920, val.height);
                    this.newsBar.mask.fill(0xffffff);

                    this.newsBar.backing.clear();
                    this.newsBar.backing.rect(0, val.y, 1920, val.height);
                    this.newsBar.backing.fill(config.strapColor);
                }
            });

            tl.to(this.newsBar.logo.ctr, {
                y: -125,
                duration: animDuration,
                ease: easeFunc,
            }, "<");

            this.newsBar.textLine1.y = 985;
            this.newsBar.textLine2.y = 1052;
            this.newsBar.textLine1.text = line1;
            this.newsBar.textLine2.text = line2;

            tl.to(this.newsBar.textLine1, {
                y: 863,
                duration: animDuration,
                ease: easeFunc,
            }, "<");

            
            tl.to(this.newsBar.textBadge.ctr, {
                y: -125,
                duration: animDuration,
                ease: easeFunc,
            }, "<");

            tl.to(this.newsBar.programmeBadge.ctr, {
                y: -125,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => {
                    if (badgeText != "" && badgeText != null)
                    {
                        this.textBadgeIn(badgeText);
                    }
                    resolve(true);
                }
            }, "<");

            tl.to(this.newsBar.textLine2, {
                y: 930,
                duration: animDuration,
                ease: easeFunc,
            }, "<0.1");
        });

    }

    
    async twoLineOut()
    {

        if(!this.twoLineIsIn)
            return;
        this.twoLineIsIn = false;

        await this.textBadgeOut();


        return new Promise(resolve => { // Wrap the animation in a Promise


            let tl = newAnimWithDevTools("Hide Two Liner with Flipper")

            let animDuration = 0.8;

            let val = {y: 817, height: 173};
            tl.to(val, {
                y: 942,
                height: 48,
                duration: animDuration,
                ease: easeFunc,
                onUpdate: () =>
                {
                    this.newsBar.mask.clear();
                    this.newsBar.mask.rect(0, val.y, 1920, val.height);
                    this.newsBar.mask.fill(0xffffff);

                    this.newsBar.backing.clear();
                    this.newsBar.backing.rect(0, val.y, 1920, val.height);
                    this.newsBar.backing.fill(config.strapColor);
                }
            });

            tl.to(this.newsBar.logo.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
            }, "<");

            tl.to(this.newsBar.textLine1, {
                y: 985,
                duration: animDuration,
                ease: easeFunc,
            }, "<");

            tl.to(this.newsBar.textLine2, {
                y: 1047,
                duration: animDuration,
                ease: easeFunc,
            }, "<");

            tl.to(this.newsBar.textBadge.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => {
                    resolve(true)
                    RemoveFromGraphicsStatus("STRAP");
                }
            }, "<");

            tl.to(this.newsBar.programmeBadge.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
            }, "<");

        });
    }

    
    async twoLineNameIn(line1, line2)
    {
    
        await this.oneLineOut();
        await this.twoLineOut();
        await this.oneLineNameOut();
        
        await vizEvents.emit('headline:out');
        
        let tl = newAnimWithDevTools("Show Name Two Liner with Flipper")
    
        if(this.twoLineNameIsIn)
            return;
        this.twoLineNameIsIn = true;
    
        //turn on text masks
        this.newsBar.textLine1.mask = this.newsBar.nameStrapMask;
        this.newsBar.textLine2.mask = this.newsBar.nameStrapMask;
    
        let animDuration = 1.1;
    
        let val = {y: 942, height: 48};
        tl.to(val, {
            y: 817,
            height: 173,
            duration: animDuration,
            ease: easeFunc,
            onUpdate: () =>
            {
                this.newsBar.mask.clear();
                this.newsBar.mask.rect(0, val.y, 1920, val.height);
                this.newsBar.mask.fill(0xffffff);
    
                this.newsBar.backing.clear();
                this.newsBar.backing.rect(0, val.y, 1920, val.height);
                this.newsBar.backing.fill(config.strapColor);
            }
        });
    
        this.newsBar.textLine1.y = 985+48;
        this.newsBar.textLine2.y = 1052+48;
        this.newsBar.textLine1.text = line1;
        this.newsBar.textLine2.text = line2;
    
        tl.to(this.newsBar.textLine1, {
            y: 863-48,
            duration: animDuration,
            ease: easeFunc,
        }, "<");
    
        
    
        tl.to(this.newsBar.textLine2, {
            y: 930-48,
            duration: animDuration,
            ease: easeFunc,
        }, "<0.1");
    
    }
    
    async twoLineNameOut()
    {
        if(!this.twoLineNameIsIn)
            return;
        this.twoLineNameIsIn = false;
    
        await this.textBadgeOut();
    
    
        return new Promise(resolve => { // Wrap the animation in a Promise
    
    
            let tl = newAnimWithDevTools("Hide Name Two Liner with Flipper")
    
            let animDuration = 0.8;
    
            let val = {y: 817, height: 173};
            tl.to(val, {
                y: 942,
                height: 48,
                duration: animDuration,
                ease: easeFunc,
                onUpdate: () =>
                {
                    this.newsBar.mask.clear();
                    this.newsBar.mask.rect(0, val.y, 1920, val.height);
                    this.newsBar.mask.fill(0xffffff);
    
                    this.newsBar.backing.clear();
                    this.newsBar.backing.rect(0, val.y, 1920, val.height);
                    this.newsBar.backing.fill(config.strapColor);
                }
            });
    
            tl.to(this.newsBar.logo.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
            tl.to(this.newsBar.textLine1, {
                y: 985-48,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
            tl.to(this.newsBar.textLine2, {
                y: 1047-48,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => {
                        //turn off text masks
                        this.newsBar.textLine1.mask = null;
                        this.newsBar.textLine2.mask = null;
    
                        //empty text
                        this.newsBar.textLine1.text = "";
                        this.newsBar.textLine2.text = "";
                }
            }, "<");
    
            tl.to(this.newsBar.textBadge.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => 
                {
                    resolve(true)
                    RemoveFromGraphicsStatus("NAME");
                }
                
            }, "<");
        });
    }
    
    async oneLineNameIn(line1)
    {
    
        await this.oneLineOut();
        await this.twoLineOut();
        await this.twoLineNameOut();

        await vizEvents.emit('headline:out');
        
        let tl = newAnimWithDevTools("Show Name One Liner with Flipper")
    
        if(this.oneLineNameIsIn)
            return;
        this.oneLineNameIsIn = true;
    
        //turn on text masks
        this.newsBar.textLine1.mask = this.newsBar.nameStrapMask;
    
        let animDuration = 1;
    
        return new Promise(resolve => { 
            let val = {y: 942, height: 48};
            tl.to(val, {
                y: 817+48,
                height: 173-48,
                duration: animDuration,
                ease: easeFunc,
                onUpdate: () =>
                {
                    this.newsBar.mask.clear();
                    this.newsBar.mask.rect(0, val.y, 1920, val.height);
                    this.newsBar.mask.fill(0xffffff);
    
                    this.newsBar.backing.clear();
                    this.newsBar.backing.rect(0, val.y, 1920, val.height);
                    this.newsBar.backing.fill(config.strapColor);
                }
            });
    
            this.newsBar.textLine1.y = 985+20;
            this.newsBar.textLine1.text = line1;
    
            tl.to(this.newsBar.textLine1, {
                y: 863,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => {
                    resolve(true);
                }
            }, "<");
        });
    
    
        
    
    }
    
    async oneLineNameOut()
    {
        if(!this.oneLineNameIsIn)
            return;
        this.oneLineNameIsIn = false;
    
        await this.textBadgeOut();
    
    
        return new Promise(resolve => { // Wrap the animation in a Promise
    
    
            let tl = newAnimWithDevTools("Hide Name One Liner with Flipper")
    
            let animDuration = 0.8;
    
            let val = {y: 817+48, height: 173-48};
            tl.to(val, {
                y: 942,
                height: 48,
                duration: animDuration,
                ease: easeFunc,
                onUpdate: () =>
                {
                    this.newsBar.mask.clear();
                    this.newsBar.mask.rect(0, val.y, 1920, val.height);
                    this.newsBar.mask.fill(0xffffff);
    
                    this.newsBar.backing.clear();
                    this.newsBar.backing.rect(0, val.y, 1920, val.height);
                    this.newsBar.backing.fill(config.strapColor);
                }
            });
    
            tl.to(this.newsBar.logo.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
            tl.to(this.newsBar.textLine1, {
                y: 985-48,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => {
                    //turn off text masks
                    this.newsBar.textLine1.mask = null;  
                    //empty text
                    this.newsBar.textLine1.text = "";  
                }
            }, "<");
    
    
            tl.to(this.newsBar.textBadge.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => {
                    resolve(true)
                    RemoveFromGraphicsStatus("NAME");
                }
            }, "<");
        });
    }   
    
    async oneLineIn(text, badgeText)
    {
    
        if(this.oneLineIsIn)
            await this.oneLineOut();
        this.oneLineIsIn = true;
    
        await vizEvents.emit('headline:out');
        await this.twoLineOut();
        await this.twoLineNameOut();   
        await this.oneLineNameOut();
    
        return new Promise(async resolve => { 
            let tl = newAnimWithDevTools("Show One Liner with Flipper")
    
            let animDuration = 1;
    
            let val = {y: 942, height: 48};
            tl.to(val, {
                y: 817,
                height: 173,
                duration: animDuration,
                ease: easeFunc,
                onUpdate: () =>
                {
                    this.newsBar.mask.clear();
                    this.newsBar.mask.rect(0, val.y, 1920, val.height);
                    this.newsBar.mask.fill(0xffffff);
    
                    this.newsBar.backing.clear();
                    this.newsBar.backing.rect(0, val.y, 1920, val.height);
                    this.newsBar.backing.fill(config.strapColor);
    
                }
            });
    
            tl.to(this.newsBar.logo.ctr, {
                y: -125,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
            this.newsBar.singleText.y = 1014;
            this.newsBar.singleText.text = text;
            this.newsBar.singleText.fontSize = 92;
    
            await fitTextToWidth(this.newsBar.singleText, 1363, 92);
    
    
            tl.to(this.newsBar.textBadge.ctr, {
                y: -125,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
            tl.to(this.newsBar.programmeBadge.ctr, {
                y: -125,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
    
    
            tl.to(this.newsBar.singleText, {
                y: 858.5+singleLineYoffset,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () => {
                    if (badgeText != "" && badgeText != null)
                    {
                        this.textBadgeIn(badgeText);
                    }
                    resolve(true);
                }
            }, "<0.1");  
        });
    
    }
    
    async oneLineOut()
    {
    
        if(!this.oneLineIsIn)
            return;
        this.oneLineIsIn = false;
    
        let tl = newAnimWithDevTools("Hide One Liner with Flipper")
    
        await this.textBadgeOut();
    
        return new Promise(resolve => { // Wrap the animation in a Promise
    
    
            let animDuration = 0.8;
    
            let val = {y: 817, height: 173};
            tl.to(val, {
                y: 942,
                height: 48,
                duration: animDuration,
                ease: easeFunc,
    
                onUpdate: () =>
                {
                    this.newsBar.mask.clear();
                    this.newsBar.mask.rect(0, val.y, 1920, val.height);
                    this.newsBar.mask.fill(0xffffff);
    
                    this.newsBar.backing.clear();
                    this.newsBar.backing.rect(0, val.y, 1920, val.height);
                    this.newsBar.backing.fill(config.strapColor);
                }
    
            });
    
            tl.to(this.newsBar.logo.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
            tl.to(this.newsBar.singleText, {
    
                y: 1014 + singleLineYoffset,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
            tl.to(this.newsBar.textBadge.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
                onComplete: () =>  {
                    resolve(true);
                    RemoveFromGraphicsStatus("BIG STRAP");
                }
    
            }, "<");
    
            tl.to(this.newsBar.programmeBadge.ctr, {
                y: 0,
                duration: animDuration,
                ease: easeFunc,
            }, "<");
    
        });
    
    
    
    
    
    }

    
    async lowerThirdOut()
    {

        if(!this.lowerThirdIsIn)
        {
            return;
        }
        this.lowerThirdIsIn = false;
        this.flipperIsIn = false;

        let tl = newAnimWithDevTools("Lower Third Out");    
        
        this.programmeBadgeOut();
        tl.to(this.flipper.content.ctr, {
            alpha: 0,
            duration: 0.4,
        });
    

        await this.oneLineOut();
        await this.twoLineOut();
        await this.twoLineNameOut();
        await this.oneLineNameOut();

        
        return new Promise(resolve => { // Wrap the animation in a Promise

            
            //NEW STYLE LOWERTHIRDS USE: tl.timeScale(1.5);
            tl.timeScale(config.tickerTimeScale);
            if(gsap.getById("Ticker Sequence") != undefined)
            {
                gsap.getById("Ticker Sequence").kill();
            }

            


            gsap.delayedCall(0.5, () => {
                RemoveFromGraphicsStatus("[LOWERTHIRD ON]");
                TedMessage("LOGO OFF");
                resolve(true);
            });

            this.clockOut();
            gsap.delayedCall(0.2, () => {
                
                tl.to(this.ctr, {
                    y: 90,
                    duration: 1,
                    ease: easeFunc,
                }, "<0.4");
        
                tl.to(this.newsBar.ctr, {
                    y: 48,
                    duration: 1,
                    ease: easeFunc,
                } , "<");
        
                tl.to(this.newsBar.logo.ctr, {
                    y: 48,
                    duration: 2,
                    ease: easeFunc,
                }, "<");
            });

        
        });
    }

    lowerThirdOutInstant()
    {


        let tl = newAnimWithDevTools("Lower Third Out Instant");    
        if(gsap.getById("Ticker Sequence") != undefined)
        {
            gsap.getById("Ticker Sequence").kill();
        }

        this.flipper.content.ctr.alpha = 0;
        

        this.ctr.y = 90;
        this.newsBar.ctr.y = 48;
        this.newsBar.logo.ctr.y = 48;

        this.clockIsIn = true;
        this.flipperIsIn = false;
        this.lowerThirdIsIn = false;
        this.clockOut();

        RemoveFromGraphicsStatus("[LOWERTHIRD ON]");
    }

    async clockOut()
    {
        if(!this.clockIsIn) return;
        this.clockIsIn = false;

        return new Promise(resolve => {

            this.flipper.clock.ctr.y = 0;

            let tl = newAnim("Clock Out");    
            tl.to(this.flipper.clock.ctr, {
                y: -90,
                duration: 1,
                ease: easeFunc,
                onComplete: () => resolve(true)
            }, "<");
        });
    }

    clockIn()
    {

        
        if(this.clockIsIn || !config.flipperClockShouldShow) return;
        this.clockIsIn = true;
            

        this.flipper.clock.ctr.y = 90;
        

        let tl = newAnim("Clock In");
        tl.to(this.flipper.clock.ctr, {
            y: 0,
            duration: 0.6,
            ease: "power3.out",
        }, "<");
    }



    async textBadgeIn(text)
    {
        if(this.textBadgeIsIn)
        {
            //update the text. Hide the badge and show it again
            await this.textBadgeOut();
            this.textBadgeIn(text);
            return;
        }
            
        this.textBadgeIsIn = true;

        let tl = newAnimWithDevTools("Text Badge In");

        this.newsBar.textBadgeText.text = text;
        var offset = {val: 52};
        tl.to(offset, {
            val: 0,
            duration: 0.7,
            ease: easeFunc,
            onUpdate: () =>
            {
                this.newsBar.textBadgeBacking.clear();
                this.newsBar.textBadgeBacking.rect(275 + this.newsBar.logoText.width + 10 + this.newsBar.logo.bbcLogo.width + 20, 942+offset.val, this.newsBar.textBadgeText.width + 25, 48);
                this.newsBar.textBadgeBacking.fill(0xffffff);

                
                this.newsBar.textBadgeText.y = 943+offset.val;

            }
        });
    }

    async textBadgeOut()
    {   
        if(!this.textBadgeIsIn) return false;
        this.textBadgeIsIn = false;
        return new Promise(resolve => { // Wrap the animation in a Promise
            let tl = newAnimWithDevTools("Text Badge Out");

            var offset = { val: 0 };

            gsap.delayedCall(0.5, () => {
                resolve(true);
            });

            tl.to(offset, {
                val: 52,
                duration: 0.7,
                ease: easeFunc,
                onUpdate: () => {
                    this.newsBar.textBadgeBacking.clear();
                    this.newsBar.textBadgeBacking.rect(275 + this.newsBar.logoText.width + 10 + this.newsBar.logo.bbcLogo.width + 20, 942 - offset.val, this.newsBar.textBadgeText.width + 25, 48);
                    this.newsBar.textBadgeBacking.fill(0xffffff);

                    this.newsBar.textBadgeText.y = 943 - offset.val;
                },
            });
        });
    }


    async flipperIn()
    {

        if(this.flipperIsIn)
            return;

        //Only put up the flipper
        let tl = newAnimWithDevTools("Flipper In");

        this.newsBar.logo.ctr.y = 0;

        
            


        tl.to(this.ctr, {
            y: 0,
            duration: 1,
            ease: "power3.out",
        }, "<");

        this.flipper.content.ctr.y = 30;
        this.flipper.content.ctr.alpha = 0;
        this.flipper.content.ctr.mask = null;

        tl.to(this.flipper.content.ctr, {
            alpha: 1,
            duration: 0.8,
        
        }, "<0.5");

        tl.to(this.flipper.content.ctr, {
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () =>
            {
                this.flipper.content.ctr.mask = this.flipper.contentMask;
                this.flipperIsIn = true;
            }
        }, "<");

        
        this.flipper.text.destroy();
        this.flipper.text = new PIXI.Text({ text: config.tickerOffText, style: {fill: "#3d3d3d", fontFamily: 'Reith Sans Medium', fontSize: 34} });
        this.flipper.text.resolution = 2;
        this.flipper.text.x = 311
        this.flipper.text.y = 992;
        this.flipper.content.ctr.addChild(this.flipper.text);

    }

    flipperAndLowerThirdIn()
    {

        if(this.flipperIsIn)
            return;
        this.flipperIsIn = true;
        this.lowerThirdIsIn = true;

        return new Promise(resolve => {
            let tl = newAnimWithDevTools("Flipper and Lowerthird In");

            let flipperTl = newAnimWithDevTools("Flipper In");


            gsap.delayedCall(0.2, () => {this.clockIn()}); 
                
            flipperTl.to(this.ctr, {
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "<");

            
            this.flipper.dot.y = 70;
            this.flipper.dot.alpha = 0;

            this.flipper.content.ctr.y = 0;
            this.flipper.content.ctr.alpha = 0;
            this.flipper.content.ctr.mask = null;

            flipperTl.to(this.flipper.content.ctr, {
                alpha: 1,
                duration: 0.8,
            
            }, "<0.5");

            flipperTl.to(this.flipper.dot, {
                alpha: 1,
                duration: 0.8,
            }, "<");

            flipperTl.to(this.flipper.dot, {
                y: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "<");

            flipperTl.to(this.flipper.content.ctr, {
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                onComplete: () =>
                {
                    this.flipper.content.ctr.mask = this.flipper.contentMask;
                }
            }, "<");


            this.flipper.text.destroy();
            this.flipper.text = new PIXI.Text({ text: 'HEADLINES', style: {fill: "#3d3d3d", fontFamily: 'Reith Sans Bold', fontSize: 34} });
            this.flipper.text.resolution = 2;
            this.flipper.text.x = 311
            this.flipper.text.y = 992;

            this.flipper.content.ctr.addChild(this.flipper.text);
            ///////

            this.newsBar.logo.ctr.y = 90;

            gsap.delayedCall(0.9, ClockIn);

            tl.to(this.newsBar.ctr, {
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "<0.8");

            tl.to(this.newsBar.logo.ctr, {

                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "<");

            tl.to(this.ctr, {
                y: 0,
                duration: 1,
                ease: "power3.out",
                onComplete: () =>
                {
                    resolve(true);
                }

            }, "<");
        });


    }


    flipperOut()
    {

        if(!this.flipperIsIn)
            return;
        this.flipperIsIn = false;

        let tl = newAnimWithDevTools("Flipper Out");

        tl.to(this.flipper.content.ctr, {
            alpha: 0,
            duration: 0.4,
        });

        tl.to(this.ctr, {
            y: 90,
            duration: 1,
            ease: easeFunc,
        }, ">");



        this.clockOut();
    }


    async programmeBadgeIn(text, bgColor, fgColor)
    {
        if(this.programmeBadgeIsIn)
        {
            //update the text. Hide the badge and show it again
            await this.programmeBadgeOut();
            this.programmeBadgeIn(text, bgColor, fgColor);
            return;
        }
            
        this.programmeBadgeIsIn = true;

        let tl = newAnimWithDevTools("Programme Badge In");

        this.newsBar.programmeBadgeTextContent = text;
        this.newsBar.programmeBadgeText.text = text;
        this.newsBar.programmeBadgeBacking.clear();
        this.newsBar.programmeBadgeText.style.fill = fgColor;
        this.newsBar.programmeBadgeText.x = 1920-275-this.newsBar.programmeBadgeText.width-11;

        this.newsBar.programmeBadgeBgColor = bgColor;
        this.newsBar.programmeBadgeTextColor = fgColor;

        var offset = {val: 48};

        tl.to(offset, {
            val: 0,
            duration: 0.7,
            ease: easeFunc,
            onUpdate: () =>
            {
                this.newsBar.programmeBadgeBacking.clear();
                this.newsBar.programmeBadgeBacking.rect(1920-275-this.newsBar.programmeBadgeText.width-24, 942+offset.val, this.newsBar.programmeBadgeText.width + 24, 48);
                this.newsBar.programmeBadgeBacking.fill(this.newsBar.programmeBadgeBgColor);

                this.newsBar.programmeBadgeText.y = 943+offset.val+4;

                

            }
        });
    }

    async programmeBadgeOut()
    {
        if(!this.programmeBadgeIsIn) return;
        this.programmeBadgeIsIn = false;

        return new Promise(resolve => { // Wrap the animation in a Promise

            let tl = newAnimWithDevTools("Programme Badge Out");

            var offset = { val: 0 };

            tl.to(offset, {
                val: 48,
                duration: 0.7,
                ease: easeFunc,
                onUpdate: () => {
                    this.newsBar.programmeBadgeBacking.clear();
                    this.newsBar.programmeBadgeBacking.rect(1920-275-this.newsBar.programmeBadgeText.width-24, 942 - offset.val, this.newsBar.programmeBadgeText.width + 24, 48);
                    this.newsBar.programmeBadgeBacking.fill(this.newsBar.programmeBadgeBgColor);

                    this.newsBar.programmeBadgeText.y = 943-offset.val+4;

                },
                onComplete: () => {
                    resolve(true);
                }
            });
        });
    }

    async lowerThirdIn()
    {

        if(this.lowerThirdIsIn)
        {
            RemoveFromGraphicsStatus("[LOWERTHIRD ON]");
            return;
        }
            
        this.lowerThirdIsIn = true;

        await vizEvents.emit('tile:out');
        await vizEvents.emit('headline:out');


        let tl = newAnimWithDevTools("Lower Third In");

        if(gsap.getById("Lower Third Out") != undefined)
        {
            gsap.getById("Lower Third Out").kill();
        }

        this.newsBar.logo.ctr.y = 0;

        gsap.delayedCall(0.2, () => {this.clockIn()}); 
            

        return new Promise(resolve => { 
            tl.to(this.newsBar.ctr, {
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "<");

            tl.to(this.ctr, {
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "<");

            if(this.flipperIsIn)
            {
                //If programme badge is enabled, show it
                if(this.programmeBadgeEnabled)
                {
                    this.programmeBadgeIn(this.newsBar.programmeBadgeTextContent, this.newsBar.programmeBadgeBgColor, this.newsBar.programmeBadgeTextColor);
                }

                resolve(true);
                return;
            }
            this.flipperIsIn = true;


            this.flipper.content.ctr.y = 32;
            this.flipper.content.ctr.alpha = 0;
            this.flipper.content.ctr.mask = null;

            tl.to(this.flipper.content.ctr, {
                alpha: 1,
                duration: 0.8,
            
            }, "<0.5");

            tl.to(this.flipper.content.ctr, {
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                onComplete:() =>
                {
                    this.flipper.content.ctr.mask = this.flipper.contentMask;
                    
                    //If programme badge is enabled, show it
                    if(this.programmeBadgeEnabled)
                    {
                        this.programmeBadgeIn(this.newsBar.programmeBadgeTextContent, this.newsBar.programmeBadgeBgColor, this.newsBar.programmeBadgeTextColor);
                    }

                    setTimeout(() => {
                        window.BeginTickerSequence();
                    }, 1500);

                    resolve(true);
                }
            }, "<");

            
            this.flipper.text.destroy();
            this.flipper.text = new PIXI.Text({ text: config.tickerOffText, style: {fill: "#3d3d3d", fontFamily: 'Reith Sans Medium', fontSize: 34} });
            this.flipper.text.resolution = 2;
            this.flipper.text.x = 311
            this.flipper.text.y = 992;
            this.flipper.content.ctr.addChild(this.flipper.text);

        });




    

    }

    
    updateNewsBarText(text)
    {
        if(this.newsBar.logoText.text == text)
            return;

        console.log("LWIS2" + this.lowerThirdIsIn);
        if(!this.lowerThirdIsIn)
        {
            console.log("Lower Third is not in, so not flipping news bar text");
            this.newsBar.changeNewsBarLogoText(text);
            return;
        }

        //Flip out the news bar logo stuff
        let tl = newAnimWithDevTools("Update Newsbar Text");
        

        tl.to(this.newsBar.logo.ctr, {
            y: -48,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () =>
            {
                this.newsBar.changeNewsBarLogoText(text);
            }
        });

        tl.to(this.newsBar.logo.ctr, {
            y: 0,
            duration: 0.8,
            ease: "power3.inOut"
        }, ">");

        
    }

    
    
    beginTickerSequence()
    {
        if(gsap.getById("Ticker Sequence") != undefined)
        {
            gsap.getById("Ticker Sequence").kill();
        }
    
        let tl = newAnimWithDevTools("Ticker Sequence");
        tl.repeat(-1);
    
        //Scroll out existing text (in the case it is first launch it would be: bbc.co.uk/news) and set the HEADLINES text
        tl.to(this.flipper.content.ctr, {
            y: -40,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () =>
            {
                this.flipper.content.ctr.y = 5;
                this.flipper.content.ctr.alpha = 0;
                
                this.flipper.text.destroy();
                this.flipper.text = new PIXI.Text({ text: 'HEADLINES', style: {fill: "#3d3d3d", fontFamily: 'Reith Sans Bold', fontSize: 34} });
                this.flipper.text.resolution = 2;
                this.flipper.text.x = 311
                this.flipper.text.y = 992;
                this.flipper.content.ctr.addChild(this.flipper.text);
            }
        });
    
        //Scroll in the HEADLINES text
        tl.to(this.flipper.content.ctr, {
            y: 0,
            duration: 0.4,
            ease: "power3.out",
        }, ">0.5");
    
        //Fade in the HEADLINES text
        tl.to(this.flipper.content.ctr, {
            alpha: 1,
            duration: 0.4,
        }, "<");
    
        if(this.flipper.headlines[0] != undefined)
        {
            //Scroll out the HEADLINES text and set the first headline
            tl.to(this.flipper.content.ctr, {
                y: -40,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () =>
                {
                    this.flipper.content.ctr.y = 40;
                    
                    this.flipper.text.destroy();
                    this.flipper.text = new PIXI.Text({ text: this.flipper.headlines[0].text, style: {fill: "#3d3d3d", fontFamily: 'Reith Sans Medium', fontSize: 34} });
                    this.flipper.text.resolution = 2;
                    this.flipper.text.x = 311
                    this.flipper.text.y = 992;
                    this.flipper.content.ctr.addChild(this.flipper.text);
                }
            }, ">3");
    
    
            //Scroll in the first headline
            tl.to(this.flipper.content.ctr, {
                y: 0,
                duration: 0.6,
                ease: "power3.out",
            }, ">");
        }
    
    
        for (let i = 1; i < this.flipper.headlines.length; i++) {
            //Scroll out the first headline and set the second headline
            tl.to(this.flipper.content.ctr, {
            y: -40,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () =>
            {
                this.flipper.content.ctr.y = 40;
                
                this.flipper.text.destroy();
                this.flipper.text = new PIXI.Text({ text: this.flipper.headlines[i].text, style: {fill: "#3d3d3d", fontFamily: 'Reith Sans Medium', fontSize: 34} });
                this.flipper.text.resolution = 2;
                this.flipper.text.x = 311
                this.flipper.text.y = 992;
                this.flipper.content.ctr.addChild(this.flipper.text);
            }
        }, ">3");
    
        //Scroll in the second headline
        tl.to(this.flipper.content.ctr, {
            y: 0,
            duration: 0.6,
            ease: "power3.out",
        }, ">");
    
        }
    
    
    
        
        //Scroll out the Headline
        tl.to(this.flipper.content.ctr, {
            y: -40,
            duration: 0.8,
            ease: "power3.inOut",
        }, ">3");
       
    
    
    }


    

}

