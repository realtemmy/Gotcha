const body = document.querySelector("body");

const getHighlightedWord = async (e) => {
    const selectedText = handleSelection();
    
    let message;


    if (selectedText.length == 0) message = { isWord: false, word: '' }
    else message = { isWord: true , word: selectedText }

    console.log(message);
        
    // sending message to the background

    chrome.runtime.sendMessage(message);
};


function handleSelection() {
    let selectedTxt = window.getSelection().toString().trim();
    return selectedTxt;
}


body.addEventListener("dblclick", getHighlightedWord);


console.log("content Script");