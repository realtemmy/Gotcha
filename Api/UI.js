import findMeaning from "../Application/dataAccess.js";
const body = document.querySelector('body');
const main = document.querySelector("body");

// To get highlighted word from the UI
const getHighlightedWord = async (e) => {
  const selectedText = handleSelection();

  if (selectedText.length == 1) {
    return;
  }

  const { response } = await findMeaning(selectedText);
  // console.log(response);
  destructuredData(response, selectedText);
};

main.addEventListener("dblclick", getHighlightedWord);

function handleSelection() {
  let selectedTxt = window.getSelection().toString();
  return selectedTxt;
}

// Error display on the UI
const errorUiDisplay = (selectedText) => {
//   const main = document.querySelector("main");
  main.innerHTML = `
  <div class="pop">
    <span class="pop__close" title="button">
            <i class="bi bi-x-lg"></i>
    </span>
    <div class="not-found">
            <h1 class="not-found__word">${selectedText}</h1>
            <div class="not-found__img">
                <img src="./img/93134-not-found.gif" alt="404 not found gif">
            </div>
            <p class="not-found__title">Couldn't find the word "${selectedText}"</p>
        </div>
  </div>
  `;
};

// Meaning of word display
const successUiDisplay = (word, phonetic, audio, defOne, defTwo) => {
//   const main = document.querySelector("main");
  main.innerHTML = `
  <div class="pop">
    <span class="pop__close" title="button">
            <i class="bi bi-x-lg"></i>
        </span>

        <div class="wrapper">
            <h1 class="pop__title">
                ${word}
                <span class="pop__icon pop__icon--disabled" style="cursor: pointer;">
                    <i class="bi bi-heart"></i>
                </span>
            </h1>

            <section class="pop__prs">
                <div class="col">
                    <span class="first-slah">/</span>
                    <span class="pr">'${phonetic}'</span>
                    <span class="last-slash">/</span>
                </div>


                <a href="#" class="play-pron">
                    <i class="bi bi-volume-up"></i>
                </a>
            </section>

            <section class="pop__body">


                <article class="desc">
                    <ul class="desc__main">
                        <li>
                            <p>${defOne.definition}<sup><span
                                        class="pos">${defOne.partofspeech}</span></sup></p>
                        </li>
                        <q class="desc__example">small household articles</q>
                    </ul>
                </article>


                <article class="desc">
                    <ul class="desc__main">
                        <li>
                            <p>${defTwo.definition}<sup><span class="pos">${defTwo.partofspeech}</span></sup></p>
                        </li>
                        <q class="desc__example">small household articles</q>
                    </ul>
                </article>


            </section>

            <section class="pop__bottom">
                <a href="#" id="redirect" style="display: flex; align-items:center; gap: 1.6rem; font-size: 1.6rem;">
                    <span>Read more</span>
                    <span class="redirect__icon">
                        <i class="bi bi-box-arrow-up-right"></i>
                    </span>
                </a>
            </section>
        </div>
  </div>
  `;
};

// Close meaning of word pop up
const closeModalPopUp = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
};
const closeBtn = document.querySelector(".pop__close");
closeBtn.addEventListener("click", closeModalPopUp);

// To get the audio meaning word searched for
const playAudio = (audioUrl) => {
  const audioEl = document.createElement("audio");
  audioEl.id = "audio";
  audioEl.src = audioUrl;
  audioEl.play();
};

const playBtn = document.querySelector(".play-pron");
playBtn.addEventListener("click", playAudio);

const getClickPosition = (e) =>{
  const xPosition = (e.clientX - (main.offsetWidth / 2) * 2.25)
  const yPosition = (e.clientY - (main.offsetHeight / 2) * 3.3)

  const translateValue =
    "translate(" + xPosition + "px, " + yPosition + "px)";
  main.style.transform = translateValue;

  console.log(translateValue);

}


body.addEventListener('dblclick', getClickPosition)

// display position on the UI

// Destructure information coming from the API
const destructuredData = (response, selectedText) => {
  const { hasError, errorMessage, result } = response;

  if (!result) {
    errorUiDisplay(selectedText);
    return;
  }

  const { word, phonetic, audio, definition } = result;
//   playAudio(audio);
  console.log(audio);
  const defOne = definition[0];
  const defTwo = definition[1];

//   successUiDisplay(word, phonetic, defOne, defTwo);

    return audio;
};