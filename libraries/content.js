const getHighlightedWord = async (e) => {
    const selectedText = handleSelection();
    
    let message;

    message = (selectedText.length == 0) ? { isWord: false, word: '' } : { isWord: true , word: selectedText }

    console.log(message);
        
    // sending message to the background

    chrome.runtime.sendMessage(message);
};


function handleSelection() {
    let selectedTxt = window.getSelection().toString().trim();
    return selectedTxt;
}


const body = document.querySelector("body");
body.addEventListener("dblclick", getHighlightedWord);


console.log("content Script");