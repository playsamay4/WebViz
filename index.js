import { initializeWebSocket, AddToGraphicsStatus, OverlayGraphicsStatus} from './utils/websocket.js';


import { Tile } from './components/tile.js';
import { Headline } from './components/headline.js';
import { LeftLiveBug } from './components/leftLiveBug.js';
import { LowerThirdFull } from './components/LowerThird.js';
import { config } from './utils/config.js';

var devToolsEnabled = false;



// Create a PixiJS application.
const app = new PIXI.Application();
globalThis.__PIXI_APP__ = app;
//window.__PIXI_DEVTOOLS__ = {app: app};

// Intialize the application.
await app.init({ antialias: true, backgroundAlpha:0 , resizeTo: window, width: 1920, height: 1080 });
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




const tileComponent = new Tile(app, "uk_reith");
const headlineComponent = new Headline(app);

const leftLiveBugComponent = new LeftLiveBug(app);

const lowerThird = new LowerThirdFull(app);





async function configure2023Style()
{
    config.tickerTimeScale = 1.5;
    config.strapColor = {color: 0xb80000, alpha: 1};

    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOut();

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Bold";


}

async function configure2022Style()
{
    config.tickerTimeScale = 1;
    config.strapColor = {color: 0x000000, alpha: 0.75};

    //redraw, hide lowerthird backing
    await lowerThird.lowerThirdOut();

    lowerThird.newsBar.backing.clear();
    lowerThird.newsBar.backing.rect(0, 942, 1920, 48);
    lowerThird.newsBar.backing.fill(config.strapColor);

    //change programmeBadgeText font
    lowerThird.newsBar.programmeBadgeText.style.fontFamily = "Reith Sans Medium";
    
}




// Then adding the application's canvas to the DOM body.
document.body.appendChild(app.canvas);
//remove margins
document.body.style.margin = 0;

document.addEventListener('keydown', (event) => {
//    if (event.key === 'd') {
//        template.alpha = 1;
//    }
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
} 
else 
{
    openMenu();
    template.alpha = 1;
}


window.UpdateNewsBarText = (text) => {
    lowerThird.updateNewsBarText(text);
};

window.parseMsg = async (evt )=> 
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
            if (parts[0] == "2023")
            {
                configure2023Style();
            }
            else if (parts[0] == "Channel")
            {
                configure2022Style();
            }
            else {
                configure2022Style();
            }
        
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