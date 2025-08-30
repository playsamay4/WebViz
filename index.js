import { initializeWebSocket, AddToGraphicsStatus, OverlayGraphicsStatus, RemoveFromGraphicsStatus} from './utils/websocket.js';


import { Tile } from './components/tile.js';
import { Headline } from './components/headline.js';
import { LeftLiveBug } from './components/leftLiveBug.js';
import { LowerThirdFull } from './components/LowerThird.js';
import { config } from './utils/config.js';
import { newAnimWithDevTools } from './utils/animations.js';
import {  } from './utils/smallTed.js';


window.devToolsEnabled = false;


// Create a PixiJS application.
const app = new PIXI.Application();
globalThis.__PIXI_APP__ = app;
//window.__PIXI_DEVTOOLS__ = {app: app};

// Intialize the application.
await app.init({ canvas: document.getElementById('vizCanvas'), antialias: true, backgroundAlpha:0 , resizeTo: window, width: 1920, height: 1080, sharedTicker:true });
//await app.init({ antialias: true, background: 0x002233, resizeTo: window, width: 1920, height: 1080 });


var templateTexture;
try  
{
    templateTexture = await PIXI.Assets.load('LiveAndBkfastclock.png');
} catch (err)
{
    console.info("Template image not found")
}

const template = new PIXI.Sprite(templateTexture);

template.alpha = 0;
app.stage.addChild(template);




await PIXI.Assets.addBundle('fonts', {
    ReithSansRegular: {
        src: 'fonts/ReithSansRg.ttf',
        data: { family: 'Reith Sans Regular' },
    },
    ReithSansMedium: {
        src: 'fonts/ReithSansMd.ttf',
        data: { family: 'Reith Sans Medium' },
    },
    ReithSansBold: {
        src: 'fonts/ReithSansBd.ttf',
        data: { family: 'Reith Sans Bold' },
    },
    ReithSerifRegular: {
        src: 'fonts/ReithSerifRg.ttf',
        data: { family: 'Reith Serif Regular' },
    },
    ReithSerifMedium: {
        src: 'fonts/ReithSerifMd.ttf',
        data: { family: 'Reith Serif Medium' },
    },


});
await PIXI.Assets.loadBundle('fonts');

 
await PIXI.BitmapFont.install({
    name: 'Reith Serif Regular Bitmap',
    style:{
        fontFamily: 'Reith Serif Regular',
        fill: "#ffffff",
        fontSize: 128,

    }
});
await PIXI.BitmapFont.install({
    name: 'Reith Serif Medium Bitmap',
    style:{
        fontFamily: 'Reith Serif Medium',
        fill: "#ffffff",
        fontSize: 92,

    }
});



let tileComponent = new Tile(app, "uk_reith");
let headlineComponent = new Headline(app, "NEWS");

let leftLiveBugComponent = new LeftLiveBug(app);

let lowerThird = new LowerThirdFull(app, "NEWS");


async function configureWorld2022Style()
{
    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1;
    config.flipperClockShouldShow = false;
    config.tickerOffText = "bbc.com/news";
    config.strapColor = {color: 0x000000, alpha: 0.65};
    config.flipperColor = {color: 0xFFFFFF, alpha: 0.85};
    lowerThird.updateNewsBarText("WORLD NEWS");
    tileComponent.setTile("world_reith");
    headlineComponent.setLogo("reith");
    lowerThird.newsBar.setLogo("reith");
    headlineComponent.newsBarLogoTextHeadline.text = "WORLD NEWS";

    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);



    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Medium";
    
}

async function configureWorld2019Style()
{
    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1;
    config.flipperClockShouldShow = false;
    config.tickerOffText = "bbc.com/news";
    config.strapColor = {color: 0x000000, alpha: 0.65};
    config.flipperColor = {color: 0xFFFFFF, alpha: 0.85};
    lowerThird.updateNewsBarText("WORLD NEWS");
    tileComponent.setTile("world_gill_salmon");
    headlineComponent.setLogo("gill");
    lowerThird.newsBar.setLogo("gill");
    headlineComponent.newsBarLogoTextHeadline.text = "WORLD NEWS";

    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);



    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Medium";
    
    
}



async function configure2023Style()
{
    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1.5;
    config.flipperClockShouldShow = true;
    config.tickerOffText = "bbc.co.uk/news";
    config.strapColor = {color: 0xb80000, alpha: 1};
    config.flipperColor = {color: 0xFFFFFF, alpha: 1};
    lowerThird.updateNewsBarText("NEWS");
    headlineComponent.newsBarLogoTextHeadline.text = "NEWS";
    tileComponent.setTile("uk_reith");
    headlineComponent.setLogo("reith");
    lowerThird.newsBar.setLogo("reith");

    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Bold";


}

async function configureWorld2023Style()
{
    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1.5;
    config.flipperClockShouldShow = false;
    config.tickerOffText = "bbc.co.uk/news";
    config.strapColor = {color: 0xb80000, alpha: 1};
    config.flipperColor = {color: 0xFFFFFF, alpha: 1};
    lowerThird.updateNewsBarText("NEWS");
    headlineComponent.newsBarLogoTextHeadline.text = "NEWS";
    tileComponent.setTile("uk_reith");
    headlineComponent.setLogo("reith");
    lowerThird.newsBar.setLogo("reith");

    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Bold";


}

async function configure2022Style()
{

    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1;
    config.flipperClockShouldShow = true;
    config.tickerOffText = "bbc.co.uk/news";
    config.strapColor = {color: 0x000000, alpha: 0.65};
    config.flipperColor = {color: 0xFFFFFF, alpha: 0.85};

    lowerThird.updateNewsBarText("NEWS");
    headlineComponent.newsBarLogoTextHeadline.text = "NEWS";
    tileComponent.setTile("uk_reith");
    
    headlineComponent.setLogo("reith");
    lowerThird.newsBar.setLogo("reith");

    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Medium";
    
}

async function configure2019Style()
{
    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1;
    config.flipperClockShouldShow = true;
    config.tickerOffText = "bbc.co.uk/news";
    config.strapColor = {color: 0x000000, alpha: 0.65};
    config.flipperColor = {color: 0xFFFFFF, alpha: 0.85};

    lowerThird.updateNewsBarText("NEWS");
    headlineComponent.newsBarLogoTextHeadline.text = "NEWS";
    tileComponent.setTile("uk_gill");
    headlineComponent.setLogo("gill");
    lowerThird.newsBar.setLogo("gill");


    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Medium";
    
}

async function configureReportingScotlandStyle()
{
    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1;
    config.flipperClockShouldShow = true;
    config.tickerOffText = "bbc.co.uk/news";
    config.strapColor = {color: 0x000000, alpha: 0.65};
    config.newsBarLogoBoxColor = 0x0e195b;
    config.flipperColor = {color: 0xFFFFFF, alpha: 0.85};

    lowerThird.updateNewsBarText("REPORTING SCOTLAND");
    headlineComponent.newsBarLogoTextHeadline.text = "REPORTING SCOTLAND";
    tileComponent.setTile("uk_reith");

    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Medium";
    
}

async function configureNewslineStyle()
{
    console.log("Newsline");
    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOutInstant();

    config.tickerTimeScale = 1;
    config.flipperClockShouldShow = true;
    config.tickerOffText = "bbc.co.uk/news";
    config.strapColor = {color: 0x000000, alpha: 0.65};
    config.flipperColor = {color: 0xFFFFFF, alpha: 0.85};

    lowerThird.updateNewsBarText("NEWSLINE");
    headlineComponent.newsBarLogoTextHeadline.text = "NEWSLINE";
    tileComponent.setTile("uk_reith");
    
    headlineComponent.setLogo("reith");
    lowerThird.newsBar.setLogo("reith");

    lowerThird.flipper.backing.clear();
    lowerThird.flipper.backing.rect(0, 990, 1920, 90);
    lowerThird.flipper.backing.fill(config.flipperColor);

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Medium";
    
}

//remove margins
document.body.style.margin = 0;

document.addEventListener('keydown', (event) => {
   if (event.key === 'm') {
        openMenu();
   }
});

const ws = initializeWebSocket();
if (ws) {
    window.ws = ws;
}



gsap.registerPlugin(CustomEase) 


//every second, update the clock
setInterval(function()
{
    //HH(24):MM
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if(hours < 10)
        hours = "0" + hours;
    if(minutes < 10)
        minutes = "0" + minutes;

    lowerThird.flipper.clock.text.text = hours + ":" + minutes;

    //Set the live bug clocks using the offsets
    //broke this out into its own function so  i can  call it when we show the bug as well
    leftLiveBugComponent.setClocks();

        
    //Send back the status to the server
    if(ws && ws.readyState === WebSocket.OPEN)
    {

        ws.send(JSON.stringify({type: "GRAPHICS STATUS", data: JSON.stringify(OverlayGraphicsStatus)}));
    } 


    
}, 1000);




function openMenu()
{
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
    
        </br></br>
        <input type="text" id="nameTwoLinerLine1" placeholder="Name Two Liner Line 1">
        <input type="text" id="nameTwoLinerLine2" placeholder="Name Two Liner Line 2">
        </br>
        <button onclick="ShowNameTwoLiner(document.getElementById('nameTwoLinerLine1').value, document.getElementById('nameTwoLinerLine2').value)">Show Name Two Liner</button>
        <button onclick="HideNameTwoLiner()">Hide Name Two Liner</button>
    
        </br></br>
        <input type="text" id="nameOneLinerLine1" placeholder="Name One Liner Line 1">  
        </br>
        <button onclick="ShowNameOneLiner(document.getElementById('nameOneLinerLine1').value)">Show Name One Liner</button>
        <button onclick="HideNameOneLiner()">Hide Name One Liner</button>
    
        </br></br>
        <input type="text" id="headlineOneLine" placeholder="Headline One Line">
        </br>
        <button onclick="HeadlineInOneLine(document.getElementById('headlineOneLine').value)">Headline In One Line</button>
        <button onclick="HeadlineOutOneLine()">Headline Out One Line</button>

        </br></br>
        <input type="text" id="programmeBadgeText" placeholder="Programme Badge Text">
        <input type="color" id="programmeBadgeBgColor" value="#000000">
        <input type="color" id="programmeBadgeFgColor" value="#ffffff">
        </br>
        <button onclick="ProgrammeBadgeIn(document.getElementById('programmeBadgeText').value, document.getElementById('programmeBadgeBgColor').value, document.getElementById('programmeBadgeFgColor').value)">Programme Badge In</button>
        <button onclick="ProgrammeBadgeOut()">Programme Badge Out</button>
        </br>
        <button onclick="toggleProgrammeBadge()">Toggle Programme Badge</button>
        </br></br>
        <input type="text" id="leftLiveBugLocatorText" placeholder="Left Live bug Locator text"> Clock Offset </input>  
        <input type="number" id="leftLiveBugClockOffset"  name="quantity" min="-24" max="24">Clock On/Off</input>
        
        <input type="checkbox" id="leftLiveBugClockOnOff" name="clockOnOff" value="clockOnOff">
        <button onclick="LeftLiveBugIn(document.getElementById('leftLiveBugLocatorText').value,document.getElementById('leftLiveBugClockOnOff').checked, parseInt(document.getElementById('leftLiveBugClockOffset').value))">Left Live Bug In</button>
        <button onclick="LeftLiveBugOut()">Left Live Bug Out</button>

        </br></br></br>
        <label for="styleSelector">Choose a viz graphics profile:</label>
        <select onchange="setGraphicsProfile(document.getElementById('styleSelector').value)" id="styleSelector">
            <option>News Channel 2022</option>
            <option>News Channel 2023</option>
            <option>World News 2022</option>
        </select>

        <button onclick="VizInit()">Send Viz Init</button>
        



        `,
        x: "900",
        y: "0",
        width: 800,
        height: 800,
        class: [ "no-min", "no-max", "no-full",  ]
    });
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('useAutomation')) 
{
    template.alpha = 0;
    
    app.ticker.maxFPS = 50;
} 
else 
{
    //openMenu();
    template.alpha = 0;
}

window.setGraphicsProfile = (profile) => {
    switch (profile)
    {
        case "News Channel 2022":
            VizInit("2022"); break;
        case "News Channel 2023":
            VizInit("2023"); break;
        case "World News 2022":
            VizInit("World"); break;

    }
};

window.UpdateNewsBarText = (text) => {
    lowerThird.updateNewsBarText(text);
};

window.handleTedMessage = (message) => {
    switch (message) {
        case 'LOGO ON':
            lowerThird.lowerThirdIn();
            break;
        case 'LOGO OFF':
            lowerThird.lowerThirdOut();
            break;

        default:
            console.log('Unknown message type:', message.type);
    }
    
    
}

window.parseMsg = async (evt)=> 
{
   
    var received_msg = evt.data;
    console.log("Message is received...");
    console.log(received_msg);

    var message = JSON.parse(received_msg);


    if(message.type == "straps on")
    {
        lowerThird.lowerThirdIn();
    }

    if(message.type == "straps off")
    {
        lowerThird.lowerThirdOut();
    }

    if(message.type == ".5")
    {
        await tileComponent.in();
        AddToGraphicsStatus(message.overlayType, message.type, message.data);
    }
    else if(message.type == ".5{OUT}")
    {
        tileComponent.out();
    } 
    else if(message.type == "[TILE OFF]")
    {
        tileComponent.out();
    }
    else if(message.type == "[HEAD OFF]")
    {
        headlineComponent.outOneLine();
    }   
    else if(message.type == "[STRAPS OFF]")
    {
        lowerThird.oneLineOut();
        lowerThird.twoLineOut();
        lowerThird.oneLineNameOut();
        lowerThird.twoLineNameOut();
    }
    else if(message.type == "[TICKER ON]")
    {
        lowerThird.flipperIn();
    }
    else if(message.type == "[LOGO ON]")
    {

        await lowerThird.flipperAndLowerThirdIn();
        AddToGraphicsStatus(message.overlayType, "[LOWERTHIRD ON]", message.data);

    }
    else if(message.type == "[LOGO OFF]")
    {
        lowerThird.lowerThirdOut();
    }
    else if(message.type == "[LOWERTHIRD ON]")
    {
        await lowerThird.lowerThirdIn();
        AddToGraphicsStatus(message.overlayType, message.type, message.data);
    }
    else if(message.type == "[LOWERTHIRD ON]{OUT}")
    {
        lowerThird.lowerThirdOut();
    } 
    else if(message.type == "[SET BADGE]")
    {
        //split the message by \\
        var parts = message.data.split("\\");
        //set the text
        lowerThird.newsBar.programmeBadgeTextContent = parts[0];
    
        lowerThird.newsBar.programmeBadgeBgColor = parseInt(parts[1], 16);
        lowerThird.newsBar.programmeBadgeTextColor = parseInt(parts[2], 16);
        

        lowerThird.newsBar.programmeBadgeText.text = lowerThird.newsBar.programmeBadgeTextContent;

        lowerThird.programmeBadgeEnabled = true;

        console.log("Set badge to: " + lowerThird.newsBar.programmeBadgeTextContent + " with bg color: " + lowerThird.newsBar.programmeBadgeBgColor + " and text color: " + lowerThird.newsBar.programmeBadgeTextColor);
        console.log(parts);
    }
    else if(message.type == "[SET BADGE]{OUT}")
    {
        lowerThird.programmeBadgeEnabled = false;
    }
    else if(message.type == "Style")
        {
            //split the message by \\
            var parts = message.data.split("\\");
            //set the text
            VizInit(parts[0]);
        
        }
    else if (message.type == "[ALL OFF]")
    {
        lowerThird.lowerThirdOut();
        lowerThird.flipperOut();
        tileComponent.out();
        headlineComponent.outOneLine();
        leftLiveBugComponent.out();
    }
    else if(message.type == "HEAD")
    {
        await headlineComponent.inOneLine(message.data);
        AddToGraphicsStatus(message.overlayType, message.type, message.data);
        
    }
    else if(message.type == "HEAD{OUT}")
    {
        //remove the overlay from the status
        headlineComponent.outOneLine();

    }
    else if(message.type == "STRAP")
    {

        var parts = message.data.split("\\");

        await lowerThird.twoLineIn(parts[0], parts[1], parts[2]);
        console.log (parts[0] + "-" + parts[1] + "-" + parts[2]);
        AddToGraphicsStatus(message.overlayType, message.type, parts[0] + "\\" + parts[1] + "\\" + parts[2]);



    }else if(message.type == "STRAP{OUT}") 
    {
        lowerThird.twoLineOut();

    
    }else if(message.type == "BIG STRAP")
    {
        var parts = message.data.split("\\");

        await lowerThird.oneLineIn(parts[0], parts[1]);
        AddToGraphicsStatus(message.overlayType, message.type, message.data);

    } 
    else if(message.type == "BIG STRAP{OUT}")
    {
        lowerThird.oneLineOut();
    }
    else if(message.type == "NAME")
    {
        //split the message by \\
        var parts = message.data.split("\\");
        
        if(parts.length == 1)
        {
            await lowerThird.oneLineNameIn(parts[0]);
            AddToGraphicsStatus(message.overlayType, message.type, parts[0]);
        }
        else if(parts.length == 2)
        {
            await lowerThird.twoLineNameIn(parts[0], parts[1]);
            AddToGraphicsStatus(message.overlayType, message.type, parts[0] + "\\" + parts[1]);
        }
        
    }
    else if(message.type == "NAME{OUT}")
    {
        if(lowerThird.oneLineNameIsIn)
            lowerThird.oneLineNameOut();
        if(lowerThird.twoLineNameIsIn)
            lowerThird.twoLineNameOut();
    }
    else if(message.type == "LIVE")
    {            
        var parts = message.data.split("\\");

        if(parts.length == 1)
        {
            await leftLiveBugComponent.in(parts[0], false, 0);
            AddToGraphicsStatus(message.overlayType, message.type, parts[0]);
        } else
        {
            await leftLiveBugComponent.in(parts[0], true, parseInt(parts[1]));
            AddToGraphicsStatus(message.overlayType, message.type, parts[0] + "\\" + parts[1]);
        }
        
    }
    else if(message.type == "LIVE{OUT}")
    {
        leftLiveBugComponent.out();
        RemoveFromGraphicsStatus("LIVE");
    }

};


//expose all functions to window
window.LowerThirdOut = () => { lowerThird.lowerThirdOut(); };
window.LowerThirdIn = () => { lowerThird.lowerThirdIn(); };
window.BeginTickerSequence = () => { lowerThird.beginTickerSequence(); };
window.ShowTwoLiner = (line1, line2, badgeText) => { lowerThird.twoLineIn(line1, line2, badgeText); };
window.HideTwoLiner = () => { lowerThird.twoLineOut(); };
window.ShowOneLiner = (text) => { lowerThird.oneLineIn(text); };
window.HideOneLiner = () => { lowerThird.oneLineOut(); };
window.ShowNameTwoLiner = (line1, line2) => { lowerThird.twoLineNameIn(line1, line2); };
window.HideNameTwoLiner = () => { lowerThird.twoLineNameOut(); };
window.ShowNameOneLiner = (line1) => { lowerThird.oneLineNameIn(line1); };
window.HideNameOneLiner = () => { lowerThird.oneLineNameOut(); };
window.ClockOut = () => { lowerThird.clockOut(); };
window.ClockIn = () => { lowerThird.clockIn(); };

window.ProgrammeBadgeIn = (text,bgColor, fgColor) => { lowerThird.programmeBadgeIn(text,bgColor, fgColor)};
window.ProgrammeBadgeOut = () => { lowerThird.programmeBadgeOut() };
window.toggleProgrammeBadge = function() { lowerThird.programmeBadgeEnabled = !lowerThird.programmeBadgeEnabled; }
window.VizInit = (style) => { 
  VizInit(style);
}
function VizInit(style)
{
    
    console.log("VIZ INIT" + style);
    let ticker = PIXI.Ticker.shared;
    ticker.stop();

    let tl = newAnimWithDevTools("Viz Init Flicker");

    // Select the canvas element
    let canvas = document.getElementById('vizCanvas');

    // Animate the opacity to flicker for 2 seconds
    tl.to(canvas, {
        opacity: 0,
        duration: 0.02,
        repeat: 100, // 20 times to cover 2 seconds (0.1s * 20 = 2s)
        yoyo: true, // Flicker effect
        ease: "linear",
        onComplete: () => {
            ticker.start();
            canvas.style.opacity = 1;

            switch(style)
            {
                case "Channel2019":
                    configure2019Style(); break;
                case "Channel2022":
                    configure2022Style(); break;
                case "Channel2023":
                    configure2023Style(); break;
                case "World2023":
                    configureWorld2023Style(); break;
                case "World2022":
                    configureWorld2022Style(); break;
                case "World2019":
                    configureWorld2019Style(); break;
                case "Reporting Scotland":
                    configureReportingScotlandStyle(); break;
                case "Newsline":
                    configureNewslineStyle(); break;
                default:
                    configure2022Style(); break;
            }

        }
    });

    
}

window.TextBadgeIn = (text) => { lowerThird.textBadgeIn(text) };
window.TextBadgeOut = () => { lowerThird.textBadgeOut() };

window.FlipperIn = () => { lowerThird.flipperIn() };
window.FlipperOut = () => { lowerThird.flipperOut() };
window.FlipperAndLowerThirdIn = () => { lowerThird.flipperAndLowerThirdIn() } ;

window.TileIn = () => {
    tileComponent.in();
};
window.TileOut = () => {
    tileComponent.out();
}

window.HeadlineInOneLine = (text) => {
    headlineComponent.inOneLine(text);
};
window.HeadlineOutOneLine = () => {
    headlineComponent.outOneLine();
};

window.LeftLiveBugIn = (locatorText, showClock, clockOffset) => {
    leftLiveBugComponent.in(locatorText, showClock, clockOffset)
};
window.LeftLiveBugOut = () => {
    leftLiveBugComponent.out();
};

window.openMenu = openMenu;

setTimeout(() => {
    configure2022Style();
}, 500);

window.gsap = gsap;

/////////////////
lowerThird.lowerThirdOutInstant();