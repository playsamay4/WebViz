let ws;
let connectInterval;
let reconnectAttempts = 0;

//graphic types:

//NONEAUTOOUT-DSK - graphic is taken in and kept until Transition logic takes it out or it is manually taken out
//AUTOUT-DSK - graphic is taken in and taken out automatically after a set time
//KEEPWHILEBACKGROUND-DSK - graphic is taken in and kept on while we are on this element in the story, automation will sort this out for us.
//KEEPWHILESTORY-DSK - graphic is taken in and kept on while we are on this story, automation will sort this out for us.

export var OverlayGraphicsStatus = 
[
    //example {"NONEAUTOOUT-DSK", ".5"}
]

export function SendServerGraphicOut(graphic)
{
    console.log("Sending graphic out: " + graphic);
    //Make sure the connection is open
    if(ws && ws.readyState === WebSocket.OPEN)
    {

        console.log("Sending message...");
    } else
    {
        console.log("Connection is not open, cannot send message");
    }


}

export function AddToGraphicsStatus(overlayType, overlayName, overlayData) 
{
    OverlayGraphicsStatus.push({
        overlayType:overlayType,
        type: overlayName,
        data: overlayData
    });

    console.log(OverlayGraphicsStatus);
    
    if(ws != null)
        ws.send(JSON.stringify({type: "GRAPHICS STATUS", data: JSON.stringify(OverlayGraphicsStatus)}));

}

export function RemoveFromGraphicsStatus( overlayName)
{
    //remove the {OUT} from the overlayName
    overlayName = overlayName.replace("{OUT}", "");

    //find the overlay in the array
    for (var i = 0; i < OverlayGraphicsStatus.length; i++)
    {        
        if(OverlayGraphicsStatus[i].type == overlayName )
        {
            OverlayGraphicsStatus.splice(i, 1);
            break;
        }
    }

    console.log(OverlayGraphicsStatus);

    //Send back the status to the server
    if(ws != null)
        ws.send(JSON.stringify({type: "GRAPHICS STATUS", data: JSON.stringify(OverlayGraphicsStatus)}));
}


export function initializeWebSocket() {
    // Check if useAutomation parameter exists in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('useAutomation')) {
        console.log('Automation disabled - websocket not initialized');
        return null;
    }



        
    function connectWebSocket() {
        // Close previous WebSocket if open
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
        }

        ws = new WebSocket("ws://localhost:3010");


        //Tells the connected server that a graphic was taken out by the engine due to transition logic
        ws.onopen = function() {
            console.log("Connection established");
            clearInterval(connectInterval);
            reconnectAttempts = 0; // Reset reconnect attempts on successful connection

 
        };

        ws.onmessage = (evnt) => {window.parseMsg(evnt)}; 

        ws.onclose = function() {
            console.log("Connection is closed...");
            scheduleReconnect();
        };

        ws.onerror = function(err) {
            console.log("WebSocket error:", err);
            ws.close(); // Ensure WebSocket is closed after an error
        };
    }

    function scheduleReconnect() {
        clearTimeout(connectInterval); // Clear previous reconnect interval if any
        connectInterval = setTimeout(() => {
            connectWebSocket(); // Attempt to reconnect
        }, 3000); // Attempt to reconnect every 3 seconds

        // Update UI to show no connection
        // connectingIndicator.alpha = 0.8;
        // connectingText.text = "No connection active";
        // connectingText.x = 1920 / 2 - connectingText.width / 2;
        // connectingText.y = 1080 / 2 - connectingText.height / 2;
    }

    

    // Initial connection attempt
    connectWebSocket();
    return ws;
}
