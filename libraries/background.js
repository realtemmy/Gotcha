console.log('background is logging');

chrome.runtime.onMessage.addListener(reciever);

var userMessage = "";
function reciever(request, sender, sendResponse) {
    console.log(request, "The request");
    userMessage = request;
}


