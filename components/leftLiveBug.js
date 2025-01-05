import { newAnimWithDevTools, easeFunc } from "../utils/animations.js";

export class LeftLiveBug {  
    constructor (app)
    {
        this.isIn = false;
        this.timeOffset = 0;


        this.init(app);
    }

    async init(app)
    {
            
        this.ctr = new PIXI.Container(); this.ctr.label = "Left Live Bug";
        this.backing = new PIXI.Graphics();
        this.backing.rect(275 , 45, 90, 45);
        this.backing.fill(0xb80000);
        this.ctr.addChild(this.backing);

        this.liveText = new PIXI.Text({ text: 'LIVE', style: {fill: "#ffffff", fontFamily: 'Reith Sans Medium', fontSize: 30.5} });
        this.liveText.resolution = 2;
        this.liveText.x = 275 + 10;
        this.liveText.y = 47;
        this.ctr.addChild(this.liveText);

        this.locatorText = new PIXI.Text({ text: 'MOSCOW', style: {fill: "#ffffff", fontFamily: 'Reith Sans Regular', fontSize: 31} });
        this.locatorText.resolution = 2;
        this.locatorText.x = 375;
        this.locatorText.y = 47;

        this.locatorBacking = new PIXI.Graphics(); this.locatorBacking.alpha = 0.65;
        this.locatorBacking.rect(365, 45, this.locatorText.width + 20, 45);
        this.locatorBacking.fill(0x000000);
        this.ctr.addChild(this.locatorBacking);

        this.locatorUnderline = new PIXI.Graphics()
            this.locatorUnderline.rect(365, 87, this.locatorText.width + 20, 3);
            this.locatorUnderline.fill(0xb80000);
        this.ctr.addChild(this.locatorUnderline);

        this.ctr.addChild(this.locatorText);
        
        this.clockContainer = new PIXI.Container(); this.clockContainer.label = "Left Live Bug Clock";
            this.clockText = new PIXI.Text({ text: '17:12', style: {fill: "#ffffff", fontFamily: 'Reith Sans Regular', fontSize: 31} });
            this.clockText.resolution = 2;    
            this.clockText.x = 365+ this.locatorText.width+28 + 10;
            this.clockText.y = 47;


            this.clockBacking = new PIXI.Graphics(); this.clockBacking.alpha = 0.65;
                this.clockBacking.rect(365+ this.locatorText.width+28, 45, this.clockText.width+20, 45);
                this.clockBacking.fill(0x000000);
            this.clockContainer.addChild(this.clockBacking);
            this.clockContainer.addChild(this.clockText);

            this.clockUnderline = new PIXI.Graphics()
            this.clockUnderline.rect(365+ this.locatorText.width+28, 87, this.clockText.width+20, 3);
            this.clockUnderline.fill(0xb80000);
            this.clockContainer.addChild(this.clockUnderline);
            this.ctr.addChild(this.clockContainer);






            this.mask = new PIXI.Graphics()
            // Add the rectangular area to show
                .rect(275, 45, 1920, 45)
                .fill(0xffffff);
            this.ctr.mask = this.mask;



        app.stage.addChild(this.ctr);
        this.ctr.y = 45;

    }

    async in(locatorText, showClock, clockOffset)
    {
        if(this.isIn)
        {
            await this.out();
            this.in(locatorText,showClock, clockOffset);
            return;
        }
    
            this.isIn = true;
        
        
            this.locatorText.text = locatorText;
        
            this.timeOffset = clockOffset ?? 0;
            this.setClocks();
            
            //redraw the backing and underline.
            this.locatorBacking.clear();
            this.locatorBacking.rect(365, 45, this.locatorText.width + 20, 45);
            this.locatorBacking.fill(0x000000);
        
            this.locatorUnderline.clear();
            this.locatorUnderline.rect(365, 87, this.locatorText.width + 20, 3);
            this.locatorUnderline.fill(0xb80000);
        
            //redraw the left live bug clock
            this.clockText.x = 365+ this.locatorText.width+28 + 10;
            
            this.clockBacking.clear();
            this.clockBacking.rect(365+ this.locatorText.width+28, 45, this.clockText.width+20, 45);
            this.clockBacking.fill(0x000000);
        
            this.clockUnderline.clear();
            this.clockUnderline.rect(365+ this.locatorText.width+28, 87, this.clockText.width+20, 3);
            this.clockUnderline.fill(0xb80000);
        
            this.clockContainer.visible = showClock;
        
            this.ctr.y = 45;
        
            if(locatorText.trim() == "")
            {
                this.locatorUnderline.clear();
                this.locatorBacking.clear();
            }
            
        
            return new Promise(resolve => {
        
                let tl = newAnimWithDevTools("Left Live Bug In");
        
                tl.to(this.ctr, {
                    y: 0,
                    duration: 0.5,
                    ease: easeFunc,
                    onComplete: () => resolve(true)
                });
            });
    }

    async out() 
    {
        if(!this.isIn)
            return;
        this.isIn = false;
    
        return new Promise(resolve => {
                
                let tl = newAnimWithDevTools("Left Live Bug Out");
        
                tl.to(this.ctr, {
                    y: -45,
                    duration: 0.5,
                    ease: easeFunc,
                    onComplete: () => {
                        RemoveFromGraphicsStatus("LIVE");
                        resolve(true)
                    }
                });
            });   
    }

    setClocks()
    {
        let leftOffsetDate = new Date();
            leftOffsetDate.setHours(leftOffsetDate.getHours()+this.timeOffset);
        
            let hoursLeftOffset = leftOffsetDate.getHours();
            let minutesLeftOffset = leftOffsetDate.getMinutes();
        
        if(hoursLeftOffset < 10)
            hoursLeftOffset = "0" + hoursLeftOffset;
        if(minutesLeftOffset < 10)
            minutesLeftOffset = "0" + minutesLeftOffset;
        
        this.clockText.text = hoursLeftOffset + ":" + minutesLeftOffset;
    }

}