import findMeaning from "../DataAccess/dictionary.js";

const body = document.querySelector("body");

const getHighlightedWord = async () => {
  const selectedText = handleSelection();

  if(selectedText.length == 1){
    return
  }else{
    const { response } = await findMeaning(selectedText)
    destructuredData(response);
  }
  
}

body.addEventListener("dblclick", getHighlightedWord);

function handleSelection() {
  let selectedTxt = window.getSelection().toString();
  return selectedTxt;
}

const destructuredData = (response) => {
  const { hasError, errormessage, result } = response[0];

  const { word, phonetic, audio, definition } = result[0];

  const def = definition.forEach((_, idx)=> idx < 2 );

  console.log(word);
};





/*
for display position, innerHeight and width / 2..

so it'd always pop up at the center of the screen.
*/ 

// const apiData = () => {
//   return {
//     hasError: false,
//     errorMessage: null,
//     result: [
//       {
//         word: "gotcha",
//         phonetics: "/djnjcr",
//         audio: "music.mp3",
//         definitions: [
//           {
//             partOfSpeech: "noun",
//             meaning: "returns the name of a word",
//             example: "gotcha is the most used extension in the world",
//             synonyms: ["bright", "david", "temi"],
//             antonyms: ["bad", "nah"],
//           },
//           {
//             otherDefinitions: "nah nah nah",
//           },
//         ],
//       },
//       {
//         otherresults: "Other results under result",
//       },
//     ],
//   };
// };