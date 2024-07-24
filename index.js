var devToolsEnabled = false;
var strapColor = {color: 0xb80000, alpha: 1};
var strapColor = {color: 0x000000, alpha: 0.8}

//In states:
var lowerThirdIn = false;
var flipperIn = false;
var newsBarIn = false;
var clockIn = false;
var textBadgeIn = false;
var tileIn = false;
var oneLineIn = false;
var twoLineIn = false;



// Create a PixiJS application.
const app = new PIXI.Application();
globalThis.__PIXI_APP__ = app;
//window.__PIXI_DEVTOOLS__ = {app: app};

// Intialize the application.
//await app.init({ antialias: true, backgroundAlpha:0 , resizeTo: window, width: 1920, height: 1080 });
await app.init({ antialias: true, background: 0x002233, resizeTo: window, width: 1920, height: 1080 });


PIXI.Assets.addBundle('fonts', [
    { alias: 'Reith Sans Bold', src: 'fonts/ReithSansBd.ttf' },
    { alias: 'Reith Sans Medium', src: 'fonts/ReithSansMd.ttf' },
    { alias: 'Reith Serif Medium', src: 'fonts/ReithSerifMd.ttf' },
    

]);


await PIXI.Assets.loadBundle('fonts');




const templateTexture = await PIXI.Assets.load('TextStrapBadge.png');
const template = new PIXI.Sprite(templateTexture);
template.alpha = 0;
app.stage.addChild(template);

//     ===LOWER THIRD===
var lowerThird = {};
lowerThird.ctr = new PIXI.Container(); lowerThird.ctr.label = "Lower Third";

var flipper = {};
flipper.ctr = new PIXI.Container(); flipper.ctr.label = "Flipper";
var flipperBacking = new PIXI.Graphics();
var flipperDot = new PIXI.Graphics();

//flipper backing
flipperBacking.rect(0, 990, 1920, 90);
flipperBacking.fill(0xffffff);

var flipperContent = {}
flipperContent.ctr = new PIXI.Container(); flipperContent.ctr.label = "Flipper Content";

var flipperText = new PIXI.Text({ text: 'bbc.co.uk/news', style: {fill: "#3d3d3d", fontFamily: 'BBC Reith Sans Medium', fontSize: 34} });
flipperText.resolution = 2;
flipperText.x = 311
flipperText.y = 992;



//flipper dot
flipperDot.rect(288, 1008, 10, 10);
flipperDot.fill(0xb80000);

flipper.ctr.addChild(flipperBacking);
flipperContent.ctr.addChild(flipperDot);
flipperContent.ctr.addChild(flipperText);

var flipperContentMask = new PIXI.Graphics()
// Add the rectangular area to show
    .rect(288, 995, 1920, 40)
    .fill(0xffffff);
flipper.ctr.addChild(flipperContentMask);
flipperContent.ctr.mask = flipperContentMask;

flipper.ctr.addChild(flipperContent.ctr);

var clock = {};
clock.ctr = new PIXI.Container(); clock.ctr.label = "Clock";
var clockBacking = new PIXI.Graphics();
clockBacking.rect(1525, 990, 120, 48);
clockBacking.fill(0xb80000);
clock.ctr.addChild(clockBacking);

var clockText = new PIXI.Text({ text: '21:01', style: {fill: "#ffffff", fontFamily: 'BBC Reith Sans Medium', fontSize: 35} });
clockText.resolution = 2;
clockText.x = 1540;
clockText.y = 992;
clock.ctr.addChild(clockText);

//clocks mask
var clockMask = new PIXI.Graphics()
// Add the rectangular area to show
    .rect(1525, 990, 120, 48)
    .fill(0xffffff);
clock.ctr.mask = clockMask;
flipper.ctr.addChild(clockMask);



flipper.ctr.addChild(clock.ctr);

lowerThird.ctr.addChild(flipper.ctr);




var newsBar = {};
newsBar.ctr = new PIXI.Container(); newsBar.ctr.label = "News Bar";
var newsBarBacking = new PIXI.Graphics();
newsBarBacking.rect(0, 942, 1920, 48);
newsBarBacking.fill(strapColor);
newsBar.ctr.addChild(newsBarBacking);

// Create a graphics object to define our mask
var newsBarMask = new PIXI.Graphics()
// Add the rectangular area to show
 .rect(0, 942, 1920, 48)
 .fill(0xffffff);
 newsBarMask.id = "newsBarMask";

flipper.ctr.addChild(newsBarMask);
newsBar.ctr.mask = newsBarMask;

var newsBarLogo = {};
newsBarLogo.ctr = new PIXI.Container(); newsBarLogo.ctr.label = "News Bar Logo";

var newsBarLogoBox = new PIXI.Graphics();


newsBarLogo.ctr.addChild(newsBarLogoBox);

newsBarLogo.bbcLogo = new PIXI.Sprite(await PIXI.Assets.load('images/bbc.png'));
newsBarLogo.bbcLogo.width = 560*0.21;
newsBarLogo.bbcLogo.height = 160*0.21;
newsBarLogo.bbcLogo.position.set(286,949);
newsBarLogo.ctr.addChild(newsBarLogo.bbcLogo);

var newsBarLogoText = new PIXI.Text({ text: 'NEWS', style: {fill: "#ffffff", fontFamily: 'BBC Reith Sans', fontSize: 35, fontWeight: 'bold' } });
newsBarLogoText.resolution = 2;
newsBarLogoText.x = 286 + newsBarLogo.bbcLogo.width + 11;
newsBarLogoText.y = 943;
newsBarLogo.ctr.addChild(newsBarLogoText);

newsBarLogoBox.rect(275, 942, newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 20, 48);
newsBarLogoBox.fill(0xb80000);
newsBarLogo.mask = newsBarMask;

newsBar.ctr.addChild(newsBarLogo.ctr);

var textBadge = {};
textBadge.ctr = new PIXI.Container(); textBadge.ctr.label = "Text Badge";
var textBadgeBacking = new PIXI.Graphics();
textBadgeBacking.rect(275 + newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 20, 942+48, 1920, 48);
textBadgeBacking.fill(0xffffff);
textBadge.ctr.addChild(textBadgeBacking);

var textBadgeText = new PIXI.Text({ text: 'COMING UP', style: {fill: "#3f3e42", fontFamily: 'BBC Reith Sans Medium', fontSize: 35} });
textBadgeText.resolution = 2;
textBadgeText.x = 275 + newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 32;
textBadgeText.y = 943+48;
textBadge.ctr.addChild(textBadgeText);

textBadgeBacking.clear();
textBadgeBacking.rect(275 + newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 20, 942+48, textBadgeText.width + 24, 48);
textBadgeBacking.fill(0xffffff);

//mask
var textBadgeMask = new PIXI.Graphics()
// Add the rectangular area to show
    .rect(275 + newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 20, 942, textBadgeText.width + 24, 48)
    .fill(0xffffff);
textBadge.ctr.mask = textBadgeMask;
textBadge.ctr.addChild(textBadgeMask);




newsBar.ctr.addChild(textBadge.ctr);




var textLine1 = new PIXI.Text({ text: 'Russian debt payments', style: {fill: "#ffffff", fontFamily: 'BBC Reith Serif Medium', fontSize: 55 } }); textLine1.id = "Text Line 1";
textLine1.resolution = 2;
textLine1.x = 286;
textLine1.y = 985;
newsBar.ctr.addChild(textLine1);

var textLine2 = new PIXI.Text({ text: 'US Treasury ends waiver allowing some payments', style: {fill: "#ffffff", fontFamily: 'BBC Reith Sans Medium', fontSize: 40.5 } }); textLine2.id = "Text Line 2";
textLine2.resolution = 2;
textLine2.x = 286;
textLine2.y = 1047;
newsBar.ctr.addChild(textLine2);

var singleText = new PIXI.Text({ text: 'UK Deputy PM Raab resigns', style: {fill: "#ffffff", fontFamily: 'BBC Reith Serif Medium', fontSize: 92 } }); singleText.id = "Single Text";
singleText.resolution = 2;
singleText.x = 281.5;
singleText.y = 1014;
//target 858.5
//hidden: 1014
newsBar.ctr.addChild(singleText);




lowerThird.ctr.addChild(newsBar.ctr);


app.stage.addChild(lowerThird.ctr);


var tile = new PIXI.Sprite(await PIXI.Assets.load('tiles/uk_reith.png')); tile.id = "Tile";
tile.alpha = 0;
app.stage.addChild(tile);

var connectingIndicator = new PIXI.Graphics();
connectingIndicator.rect(0, 0, 1920, 1080);
connectingIndicator.fill(0x000000);
connectingIndicator.alpha = 0.8;
app.stage.addChild(connectingIndicator);

var connectingText = new PIXI.Text({ text: 'No connection active', style: {fill: "#ffffff", fontFamily: 'Arial', fontSize: 50} });
connectingText.resolution = 2;
connectingText.x = 1920/2 - connectingText.width/2;
connectingText.y = 1080/2 - connectingText.height/2;
app.stage.addChild(connectingText);




// gsap.to(template, {
//     // this is the vars object
//     // it contains properties to animate
//    alpha: 1,
//     // and special properties
//     duration: 0.5,
//     repeat: 6,
//     yoyo: true
//   })
// Then adding the application's canvas to the DOM body.
document.body.appendChild(app.canvas);
//remove margins
document.body.style.margin = 0;

document.addEventListener('keydown', (event) => {
   if (event.key === 'd') {
       template.alpha = 1;
   }
});

//Try to connect to the server using normal websockets
var ws = new WebSocket("ws://localhost:3010");

ws.onopen = function() {
    // Web Socket is connected, send data using send()
    ws.send("Connection established");
    connectingIndicator.alpha = 0;
    connectingText.text = "Connected to server";
    connectingText.x = 1920/2 - connectingText.width/2;
    connectingText.y = 1080/2 - connectingText.height/2;
};

ws.onmessage = function (evt) {
    var received_msg = evt.data;
    console.log("Message is received...");
    console.log(received_msg);
};

ws.onclose = function() {
    // websocket is closed.

    connectingIndicator.alpha = 0.8;
    connectingText.text = "No connection active";
    connectingText.x = 1920/2 - connectingText.width/2;
    connectingText.y = 1080/2 - connectingText.height/2;
};



gsap.registerPlugin(CustomEase) 

let easeFunc = CustomEase.create("custom", "M0,0 C0.2,0 0.2,1 0.8,1 1,1 1,1 1,1");

async function TileIn()
{

    if(tileIn) return;

    await LowerThirdOut();

    let tl = newAnimWithDevTools("Tile In");

    tileIn = true;

    tl.to(tile, {
        alpha: 1,
        duration: 0.3,
    });
}

async function TileOut()
{
    if(!tileIn) return;
    tileIn = false;
    return new Promise(resolve => { // Wrap the animation in a Promise

        let tl = newAnimWithDevTools("Tile Out");

        tl.to(tile, {
            alpha: 0,
            duration: 0.3,
            onComplete: () => resolve(true)
        });
    });
}

async function ShowTwoLiner(line1, line2)
{

    await HideOneLiner();
    await TileOut();
    
    let tl = newAnimWithDevTools("Show Two Liner with Flipper")

    if(twoLineIn)
        return;
    twoLineIn = true;

    let animDuration = 1;

    let val = {y: 942, height: 48};
    tl.to(val, {
        y: 817,
        height: 173,
        duration: animDuration,
        ease: easeFunc,
        onUpdate: function()
        {
            newsBarMask.clear();
            newsBarMask.rect(0, val.y, 1920, val.height);
            newsBarMask.fill(0xffffff);

            newsBarBacking.clear();
            newsBarBacking.rect(0, val.y, 1920, val.height);
            newsBarBacking.fill(strapColor);
        }
    });

    tl.to(newsBarLogo.ctr, {
        y: -125,
        duration: animDuration,
        ease: easeFunc,
    }, "<");

    textLine1.y = 985;
    textLine2.y = 1052;
    textLine1.text = line1;
    textLine2.text = line2;

    tl.to(textLine1, {
        y: 863,
        duration: animDuration,
        ease: easeFunc,
    }, "<");

    
    tl.to(textBadge.ctr, {
        y: -125,
        duration: animDuration,
        ease: easeFunc,
    }, "<");

    tl.to(textLine2, {
        y: 930,
        duration: animDuration,
        ease: easeFunc,
    }, "<0.1");

}

async function HideTwoLiner()
{
    if(!twoLineIn)
        return;
    twoLineIn = false;

    await TextBadgeOut();


    return new Promise(resolve => { // Wrap the animation in a Promise


        let tl = newAnimWithDevTools("Hide Two Liner with Flipper")

        let animDuration = 0.8;

        let val = {y: 817, height: 173};
        tl.to(val, {
            y: 942,
            height: 48,
            duration: animDuration,
            ease: easeFunc,
            onUpdate: function()
            {
                newsBarMask.clear();
                newsBarMask.rect(0, val.y, 1920, val.height);
                newsBarMask.fill(0xffffff);

                newsBarBacking.clear();
                newsBarBacking.rect(0, val.y, 1920, val.height);
                newsBarBacking.fill(strapColor);
            }
        });

        tl.to(newsBarLogo.ctr, {
            y: 0,
            duration: animDuration,
            ease: easeFunc,
        }, "<");

        tl.to(textLine1, {
            y: 985,
            duration: animDuration,
            ease: easeFunc,
        }, "<");

        tl.to(textLine2, {
            y: 1047,
            duration: animDuration,
            ease: easeFunc,
        }, "<");

        tl.to(textBadge.ctr, {
            y: 0,
            duration: animDuration,
            ease: easeFunc,
            onComplete: () => resolve(true)
        }, "<");
    });
}

//ShowTwoLiner("Russian debt payments", "US Treasury ends waiver allowing some payments");

var singleLineYoffset = 0;

async function fitTextToWidth(textObject, maxWidth, originalFontSize) 
{

    singleLineYoffset = 0;

    // Reset the font size to the original size
    textObject.style.fontSize = originalFontSize;
    
    // Reduce font size until the text fits within the maxWidth
    while (textObject.width > maxWidth && textObject.style.fontSize > 1) {
        textObject.style.fontSize--;
    }

    //the text object is now the correct size, but we need to adjust the y position to center it
    singleLineYoffset = (130 - textObject.height) / 2;


    //return the y offset
    return singleLineYoffset;
}

async function ShowOneLiner(text)
{

    if(oneLineIn)
        return;
    oneLineIn = true;

    await TileOut();
    await HideTwoLiner();

    let tl = newAnimWithDevTools("Show One Liner with Flipper")

    let animDuration = 1;

    let val = {y: 942, height: 48};
    tl.to(val, {
        y: 817,
        height: 173,
        duration: animDuration,
        ease: easeFunc,
        onUpdate: function()
        {
            newsBarMask.clear();
            newsBarMask.rect(0, val.y, 1920, val.height);
            newsBarMask.fill(0xffffff);

            newsBarBacking.clear();
            newsBarBacking.rect(0, val.y, 1920, val.height);
            newsBarBacking.fill(strapColor);

        }
    });

    tl.to(newsBarLogo.ctr, {
        y: -125,
        duration: animDuration,
        ease: easeFunc,
    }, "<");

    singleText.y = 1014;
    singleText.text = text;
    singleText.fontSize = 92;

    await fitTextToWidth(singleText, 1363, 92);


    tl.to(textBadge.ctr, {
        y: -125,
        duration: animDuration,
        ease: easeFunc,
    }, "<");


    tl.to(singleText, {
        y: 858.5+singleLineYoffset,
        duration: animDuration,
        ease: easeFunc,
    }, "<0.1");  

}

async function HideOneLiner()
{

    if(!oneLineIn)
        return;
    oneLineIn = false;

    let tl = newAnimWithDevTools("Hide One Liner with Flipper")

    await TextBadgeOut();

    return new Promise(resolve => { // Wrap the animation in a Promise


        let animDuration = 0.8;

        let val = {y: 817, height: 173};
        tl.to(val, {
            y: 942,
            height: 48,
            duration: animDuration,
            ease: easeFunc,

            onUpdate: function()
            {
                newsBarMask.clear();
                newsBarMask.rect(0, val.y, 1920, val.height);
                newsBarMask.fill(0xffffff);

                newsBarBacking.clear();
                newsBarBacking.rect(0, val.y, 1920, val.height);
                newsBarBacking.fill(strapColor);
            }

        });

        tl.to(newsBarLogo.ctr, {
            y: 0,
            duration: animDuration,
            ease: easeFunc,
        }, "<");

        tl.to(singleText, {

            y: 1014 + singleLineYoffset,
            duration: animDuration,
            ease: easeFunc,
        }, "<");

        tl.to(textBadge.ctr, {
            y: 0,
            duration: animDuration,
            ease: easeFunc,
            onComplete: () => resolve(true)
        }, "<");
    });





}



async function LowerThirdOut()
{

    if(!lowerThirdIn)
        return;
    lowerThirdIn = false;
    flipperIn = false;

    let tl = newAnimWithDevTools("Lower Third Out");    

    tl.to(flipperContent.ctr, {
        alpha: 0,
        duration: 0.4,
    });

    ClockOut();



    await HideOneLiner();
    await HideTwoLiner();


    
    return new Promise(resolve => { // Wrap the animation in a Promise

        
        //NEW STYLE LOWERTHIRDS USE: tl.timeScale(1.5);
        if(gsap.getById("Ticker Sequence") != undefined)
        {
            gsap.getById("Ticker Sequence").kill();
        }

        gsap.delayedCall(0.5, () => {
            resolve(true)
        });



        tl.to(lowerThird.ctr, {
            y: 90,
            duration: 1,
            ease: easeFunc,
        }, "<0.4");

        tl.to(newsBar.ctr, {
            y: 48,
            duration: 1,
            ease: easeFunc,
        } , "<");

        tl.to(newsBarLogo.ctr, {
            y: 48,
            duration: 2,
            ease: easeFunc,
        }, "<");
    });
}

function LowerThirdOutInstant()
{


    let tl = newAnimWithDevTools("Lower Third Out Instant");    
    if(gsap.getById("Ticker Sequence") != undefined)
    {
        gsap.getById("Ticker Sequence").kill();
    }

    flipperContent.ctr.alpha = 0;
    

    lowerThird.ctr.y = 90;
    newsBar.ctr.y = 48;
    newsBarLogo.ctr.y = 48;

}

async function ClockOut()
{
    if(!clockIn) return;
    clockIn = false;

    return new Promise(resolve => {

        clock.ctr.y = 0;

        let tl = newAnimWithDevTools("Clock Out");    
        tl.to(clock.ctr, {
            y: -90,
            duration: 1,
            ease: easeFunc,
            onComplete: () => resolve(true)
        }, "<");
    });
}

function ClockIn()
{

    if(clockIn) return;
    clockIn = true;
        

    clock.ctr.y = 90;

    let tl = newAnimWithDevTools("Clock In");
    tl.to(clock.ctr, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
    }, "<");
}

LowerThirdOutInstant();

async function TextBadgeIn(text)
{
    if(textBadgeIn)
    {
        //update the text. Hide the badge and show it again
        await TextBadgeOut();
        TextBadgeIn(text);
        return;
    }
        
    textBadgeIn = true;

    let tl = newAnimWithDevTools("Text Badge In");

    textBadgeText.text = text;
    var offset = {val: 48};

    tl.to(offset, {
        val: 0,
        duration: 0.7,
        ease: easeFunc,
        onUpdate: function()
        {
            textBadgeBacking.clear();
            textBadgeBacking.rect(275 + newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 20, 942+offset.val, 1920, 48);
            textBadgeBacking.fill(0xffffff);

            
            textBadgeText.y = 943+offset.val;

        }
    });
}

async function TextBadgeOut()
{
    if(!textBadgeIn) return false;
    textBadgeIn = false;
    return new Promise(resolve => { // Wrap the animation in a Promise
        let tl = newAnimWithDevTools("Text Badge Out");

        var offset = { val: 0 };

        tl.to(offset, {
            val: 48,
            duration: 0.7,
            ease: easeFunc,
            onUpdate: function() {
                textBadgeBacking.clear();
                textBadgeBacking.rect(275 + newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 20, 942 - offset.val, 1920, 48);
                textBadgeBacking.fill(0xffffff);

                textBadgeText.y = 943 - offset.val;
            },
            onComplete: () => resolve(true) // Resolve the Promise with true when the animation completes
        });
    });
}


function FlipperIn()
{

    if(flipperIn)
        return;
    flipperIn = true;

    //Only put up the flipper
    let tl = newAnimWithDevTools("Flipper In");

    newsBarLogo.ctr.y = 0;

    gsap.delayedCall(0.2, ClockIn); 
        


    tl.to(lowerThird.ctr, {
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "<");

    flipperContent.ctr.y = 30;
    flipperContent.ctr.alpha = 0;
    flipperContent.ctr.mask = null;

    tl.to(flipperContent.ctr, {
        alpha: 1,
        duration: 0.8,
    
    }, "<0.5");

    tl.to(flipperContent.ctr, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: function()
        {
            flipperContent.ctr.mask = flipperContentMask;
        }
    }, "<");

    
    flipperText.destroy();
    flipperText = new PIXI.Text({ text: 'bbc.co.uk/news', style: {fill: "#3d3d3d", fontFamily: 'BBC Reith Sans Medium', fontSize: 34} });
    flipperText.resolution = 2;
    flipperText.x = 311
    flipperText.y = 992;
    flipperContent.ctr.addChild(flipperText);

}

function FlipperAndLowerThirdIn()
{

    if(flipperIn)
        return;
    flipperIn = true;
    lowerThirdIn = true;

    let tl = newAnimWithDevTools("Flipper and Lowerthird In");

    let flipperTl = newAnimWithDevTools("Flipper In");


    gsap.delayedCall(0.2, ClockIn); 
        
    flipperTl.to(lowerThird.ctr, {
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "<");

    
    flipperDot.y = 70;
    flipperDot.alpha = 0;

    flipperContent.ctr.y = 0;
    flipperContent.ctr.alpha = 0;
    flipperContent.ctr.mask = null;

    flipperTl.to(flipperContent.ctr, {
        alpha: 1,
        duration: 0.8,
    
    }, "<0.5");

    flipperTl.to(flipperDot, {
        alpha: 1,
        duration: 0.8,
    }, "<");

    flipperTl.to(flipperDot, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    }, "<");

    flipperTl.to(flipperContent.ctr, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: function()
        {
            flipperContent.ctr.mask = flipperContentMask;
        }
    }, "<");


    flipperText.destroy();
    flipperText = new PIXI.Text({ text: 'HEADLINES', style: {fill: "#3d3d3d", fontFamily: 'BBC Reith Sans', fontWeight: "bold", fontSize: 34} });
    flipperText.resolution = 2;
    flipperText.x = 311
    flipperText.y = 992;

    flipperContent.ctr.addChild(flipperText);
    ///////

    newsBarLogo.ctr.y = 90;

    gsap.delayedCall(0.9, ClockIn);

    tl.to(newsBar.ctr, {
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "<0.8");

    tl.to(newsBarLogo.ctr, {

        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "<");

    tl.to(lowerThird.ctr, {
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "<");


}


function FlipperOut()
{

    if(!flipperIn)
        return;
    flipperIn = false;

    let tl = newAnimWithDevTools("Flipper Out");

    tl.to(flipperContent.ctr, {
        alpha: 0,
        duration: 0.4,
    });

    tl.to(lowerThird.ctr, {
        y: 90,
        duration: 1,
        ease: easeFunc,
    }, ">");



    ClockOut();
}


async function LowerThirdIn()
{

    if(lowerThirdIn)
        return;
    lowerThirdIn = true;
    flipperIn = true;

    await TileOut();

    let tl = newAnimWithDevTools("Lower Third In");

    if(gsap.getById("Lower Third Out") != undefined)
    {
        gsap.getById("Lower Third Out").kill();
    }

    newsBarLogo.ctr.y = 0;

    gsap.delayedCall(0.2, ClockIn); 
        

    tl.to(newsBar.ctr, {
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "<");

    tl.to(lowerThird.ctr, {
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "<");

    flipperContent.ctr.y = 30;
    flipperContent.ctr.alpha = 0;
    flipperContent.ctr.mask = null;

    tl.to(flipperContent.ctr, {
        alpha: 1,
        duration: 0.8,
    
    }, "<0.5");

    tl.to(flipperContent.ctr, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: function()
        {
            flipperContent.ctr.mask = flipperContentMask;
        }
    }, "<");

    
    flipperText.destroy();
    flipperText = new PIXI.Text({ text: 'bbc.co.uk/news', style: {fill: "#3d3d3d", fontFamily: 'BBC Reith Sans Medium', fontSize: 34} });
    flipperText.resolution = 2;
    flipperText.x = 311
    flipperText.y = 992;
    flipperContent.ctr.addChild(flipperText);




    

}

function UpdateNewsBarText(text)
{
    //Flip out the news bar logo stuff
    let tl = newAnimWithDevTools("Update Newsbar Text");
    

    tl.to(newsBarLogo.ctr, {
        y: -48,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: function()
        {
            newsBarLogoText.text = text;
            newsBarLogoBox.clear();
            newsBarLogoBox.rect(275, 942, newsBarLogoText.width + 10 + newsBarLogo.bbcLogo.width + 20, 48);
            newsBarLogoBox.fill(0xb80000);
            newsBarLogo.ctr.y = 48;
        }
    });

    tl.to(newsBarLogo.ctr, {
        y: 0,
        duration: 0.8,
        ease: "power3.inOut"
    }, ">");

    
}

var tickerHeadlines = 
[
    {type: "Headline", text: "Mum, dad and daughters, 4 and 9, among crash dead", duration: 5},
    {type: "Headline", text: "Tories spent £700m on Rwanda scheme, Cooper says", duration: 5},
    {type: "Headline", text: "Woman died after begging GP for help - inquest", duration: 5},
    {type: "Headline", text: "Conservatives plan to name new leader in November", duration: 5},
    {type: "Headline", text: "Woman killed in attack by pet dog", duration: 5},     
]

function BeginTickerSequence()
{
    if(gsap.getById("Ticker Sequence") != undefined)
    {
        gsap.getById("Ticker Sequence").kill();
    }

    let tl = newAnimWithDevTools("Ticker Sequence");
    tl.repeat(-1);

    //Scroll out existing text (in the case it is first launch it would be: bbc.co.uk/news) and set the HEADLINES text
    tl.to(flipperContent.ctr, {
        y: -40,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: function()
        {
            flipperContent.ctr.y = 5;
            flipperContent.ctr.alpha = 0;
            
            flipperText.destroy();
            flipperText = new PIXI.Text({ text: 'HEADLINES', style: {fill: "#3d3d3d", fontFamily: 'BBC Reith Sans', fontSize: 34, fontWeight: "bold"} });
            flipperText.resolution = 2;
            flipperText.x = 311
            flipperText.y = 992;
            flipperContent.ctr.addChild(flipperText);
        }
    });

    //Scroll in the HEADLINES text
    tl.to(flipperContent.ctr, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
    }, ">0.5");

    //Fade in the HEADLINES text
    tl.to(flipperContent.ctr, {
        alpha: 1,
        duration: 0.4,
    }, "<");

    if(tickerHeadlines[0] != undefined)
    {
        //Scroll out the HEADLINES text and set the first headline
        tl.to(flipperContent.ctr, {
            y: -40,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: function()
            {
                flipperContent.ctr.y = 40;
                
                flipperText.destroy();
                flipperText = new PIXI.Text({ text: tickerHeadlines[0].text, style: {fill: "#3d3d3d", fontFamily: 'BBC Reith Sans Medium', fontSize: 34} });
                flipperText.resolution = 2;
                flipperText.x = 311
                flipperText.y = 992;
                flipperContent.ctr.addChild(flipperText);
            }
        }, ">3");


        //Scroll in the first headline
        tl.to(flipperContent.ctr, {
            y: 0,
            duration: 0.6,
            ease: "power3.out",
        }, ">");
    }


    for (let i = 1; i < tickerHeadlines.length; i++) {
        //Scroll out the first headline and set the second headline
        tl.to(flipperContent.ctr, {
        y: -40,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: function()
        {
            flipperContent.ctr.y = 40;
            
            flipperText.destroy();
            flipperText = new PIXI.Text({ text: tickerHeadlines[i].text, style: {fill: "#3d3d3d", fontFamily: 'BBC Reith Sans Medium', fontSize: 34} });
            flipperText.resolution = 2;
            flipperText.x = 311
            flipperText.y = 992;
            flipperContent.ctr.addChild(flipperText);
        }
    }, ">3");

    //Scroll in the second headline
    tl.to(flipperContent.ctr, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
    }, ">");

    }



    
    //Scroll out the Headline
    tl.to(flipperContent.ctr, {
        y: -40,
        duration: 0.8,
        ease: "power3.inOut",
    }, ">3");
   


}


function newAnimWithDevTools(id)
{
    if(devToolsEnabled)
        GSDevTools.getById("main").kill();
    let tl = gsap.timeline({id: id});
    if(devToolsEnabled)
        GSDevTools.create({id:"main", animation: tl, persist: false});
    return tl;
}

new WinBox("Controls", {
    html:
    `

    <button onclick="LowerThirdOut()">Lower Third Out</button>
    <button onclick="LowerThirdIn()">Lower Third In</button>
    </br>
    <button onclick="BeginTickerSequence()">Begin Ticker Sequence</button>
    </br>
    <input type="text" id="newsBarText" placeholder="News Bar Text">
    <button onclick="UpdateNewsBarText(document.getElementById('newsBarText').value)">Update News Bar Text</button>

    </br></br>
    <input type="text" id="twoLinerLine1" placeholder="Two Liner Line 1">
    <input type="text" id="twoLinerLine2" placeholder="Two Liner Line 2">
    </br>
    <button onclick="ShowTwoLiner(document.getElementById('twoLinerLine1').value, document.getElementById('twoLinerLine2').value)">Show Two Liner</button>
    <button onclick="HideTwoLiner()">Hide Two Liner</button>

    </br></br>
    <input type="text" id="oneLinerText" placeholder="One Liner Text">
    </br>
    <button onclick="ShowOneLiner(document.getElementById('oneLinerText').value)">Show One Liner</button>
    <button onclick="HideOneLiner()">Hide One Liner</button>

    </br></br>
    <button onclick="ClockOut()">Clock Out</button>
    <button onclick="ClockIn()">Clock In</button>

    </br></br>
    <button onclick="FlipperIn()">Flipper In</button>
    <button onclick="FlipperOut()">Flipper Out</button>
    <button onclick="FlipperAndLowerThirdIn()">Flipper in and Lowerthird In</button>

    </br></br>
    <button onclick="TileIn()">Tile In</button>
    <button onclick="TileOut()">Tile Out</button>

    </br></br>
    <button onclick="TextBadgeIn('COMING UP')">Text Badge In</button>
    <button onclick="TextBadgeOut()">Text Badge Out</button>




    `,
    x: "center",
    y: "center",
    width: 800,
    height: 600,
    class: [ "no-min", "no-max", "no-full",  ]
});

window.UpdateNewsBarText = UpdateNewsBarText;



//expose all functions to window
window.LowerThirdOut = LowerThirdOut;
window.LowerThirdIn = LowerThirdIn;
window.BeginTickerSequence = BeginTickerSequence;
window.ShowTwoLiner = ShowTwoLiner;
window.HideTwoLiner = HideTwoLiner;
window.ShowOneLiner = ShowOneLiner;
window.HideOneLiner = HideOneLiner;
window.ClockOut = ClockOut;
window.ClockIn = ClockIn;

window.TextBadgeIn = TextBadgeIn;
window.TextBadgeOut = TextBadgeOut;

window.FlipperIn = FlipperIn;
window.FlipperOut = FlipperOut;
window.FlipperAndLowerThirdIn = FlipperAndLowerThirdIn;

window.TileIn = TileIn;
window.TileOut = TileOut;




window.gsap = gsap;