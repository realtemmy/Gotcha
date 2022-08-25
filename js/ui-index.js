// document.body.style.backgroundColor = 'blue';
// document.body.style.color = "red";

// const responseData = require('../Api/dictionary');

import findMeaning from "../Api/dictionary.js";
console.log(await findMeaning("hello"));

// console.log(responseData)

const apiData = () => {
  return {
    hasError: false,
    errorMessage: null,
    result: [
      {
        word: "gotcha",
        phonetics: "/djnjcr",
        audio: "music.mp3",
        definitions: [
          {
            partOfSpeech: "noun",
            meaning: "returns the name of a word",
            example: "gotcha is the most used extension in the world",
            synonyms: ["bright", "david", "temi"],
            antonyms: ["bad", "nah"],
          },
          {
            otherDefinitions: "nah nah nah",
          },
        ],
      },
      {
        otherresults: "Other results under result",
      },
    ],
  };
};

const response = apiData();

const destructuredData = () => {
  const { hasError, errorMessage, result } = response;

  const { word, phonetics, audio, definitions } = result[0];

  const { partOfSpeech, meaning, example, synonyms, antonyms } = definitions[0];

  const syn = synonyms.filter((_, idx)=> idx < 2);

  document.getElementById("main").innerHTML = `
        <h2>${word}</h2>
        <span>${phonetics}</span>
        <button id="btn">sound</button>
        <p>${meaning}</p>
        <div>${partOfSpeech}</div>
        <span>${syn}</span>
        <span>${antonyms}</span>
  `;
};
destructuredData(response)

// const Btn = document.getElementById("btn");

// Btn.addEventListener('click', ()=>{
//   console.log('working')
// })

// console.log(window)
/*
for display position, innerHeight and width / 2..

so it'd always pop up at the center of the screen.
*/ 

const closePop_btn = document.querySelector(".pop__close");

console.log(closePop_btn);