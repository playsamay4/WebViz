let socket;



let rendererId = 'renderer-' + Math.round(Math.random() * 1000000); // Unique ID for this renderer
let commonKey = 'Commonkey'; // Common key to link with SmallTed instances
//set commonKey from the URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('commonKey')) {
    commonKey = urlParams.get('commonKey');
}

let serverUrl = 'ws://localhost:8765';
//set serverUrl from the URL
if (urlParams.has('serverUrl')) {
    serverUrl = urlParams.get('serverUrl');
}


if (urlParams.has('rendererId') && urlParams.has('commonKey') && urlParams.has('style')) {
    rendererId = urlParams.get('rendererId');
    commonKey = urlParams.get('commonKey');
    //get rid of main-window
    document.getElementById('main-window').remove();
    document.getElementById('vizCanvas').style.setProperty('opacity', '100%');
    document.documentElement.style.setProperty('--bg-primary', 'transparent');
    setTimeout(() => {VizInit(urlParams.get('style'))}, 1000);

    startTed();
}

export function TedMessage(message) {
    sendMessageToSmallTed(message);
}





function startTed()
{
    console.log('Starting SmallTed with rendererId:', rendererId, 'and commonKey:', commonKey);
    socket = new WebSocket(serverUrl);

    socket.onopen = function() {
        socket.send(JSON.stringify({ type: 'register', role: 'renderer', id: rendererId, common_key: commonKey }));
        console.log('Connected to SmallTed server:', serverUrl);
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
            console.log('Message from server:', data.message);
            // Handle the message from SmallTed instance
            window.handleTedMessage(data.message);
        } else if (data.status === 'linked') {
            console.log('Linked to SmallTed:', data.smallted_id);
        }
    };

}




function sendMessageToSmallTed(message) {
    socket.send(JSON.stringify({ type: 'renderer_message', renderer_id: rendererId, message: message }));
}