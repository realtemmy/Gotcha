const mediumHighlighter = document.createElement("medium-highlighter");
document.body.appendChild(mediumHighlighter);

const setMarkerPosition = (markerPosition) =>
mediumHighlighter.setAttribute(
  "markerPosition",
  JSON.stringify(markerPosition)
);


const getHighlightedWord = async (e) => {
    const selectedText = handleSelection();
    
    let message;

    message = (selectedText.length == 0) ? { isWord: false, word: '' } : { isWord: true , word: selectedText }

    console.log(message);

    setMarkerPosition(getMarkerPosition());
        
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



body.addEventListener("click", () => {
    if (handleSelection().length > 0) {
      setMarkerPosition(getMarkerPosition());
    }
  });
  
  body.addEventListener("dblclick", () => {
    if (handleSelection().length === 0) {
      setMarkerPosition({ display: "none" });
    }
  });
  
  
  function getMarkerPosition() {
    const rangeBounds = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    return {
      // Substract width of marker button -> 40px / 2 = 20
      left: rangeBounds.left + rangeBounds.width / 2 - 20,
      top: rangeBounds.top - 30,
      display: "flex",
    };
  }


// setMarkerPosition({
//   left: 0,
//   top: 0,
//   display: "flex",
// });