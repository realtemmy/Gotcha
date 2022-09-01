console.log('background is logging');

chrome.runtime.onMessage.addListener(reciever);

var userMessage = "";
function reciever(request, sender, sendResponse) {
    console.log(request, "The request");
    userMessage = request;

    // switch (request.directive) {
    //     case "sound":
    //         chrome.tabs.executeScript(null, {file: "content.js", allFrames: true})
    //         break;
    
    //     default:
    //         break;
    // }
}


