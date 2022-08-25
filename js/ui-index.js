import findMeaning from "../Api/dataAccess.js";
console.log(await findMeaning("hello"));

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
 
const response = apiData();

const destructuredData = () => {
  const { hasError, errorMessage, result } = response;

  const { word, phonetics, audio, definitions } = result[0];

  const { partOfSpeech, meaning, example, synonyms, antonyms } = definitions[0];

  const syn = synonyms.filter((_, idx)=> idx < 2);

};
destructuredData(response)
/*
for display position, innerHeight and width / 2..

so it'd always pop up at the center of the screen.
*/ 

const body = document.querySelector("body");

body.addEventListener('click', () => {
  const selectedTxt = handleSelection();
  console.log(selectedTxt);
})

function handleSelection() {
  let selectedTxt = window.getSelection().toString();
  return selectedTxt
}
