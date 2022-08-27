import findMeaning from "../Application/dataAccess.js";

const body = document.querySelector("body");

const getHighlightedWord = async () => {
  const selectedText = handleSelection();

  if (selectedText.length == 1) {
    return;
  }

  const { response } = await findMeaning(selectedText);
  // console.log(response);
  destructuredData(response, selectedText);
};

body.addEventListener("dblclick", getHighlightedWord);

function handleSelection() {
  let selectedTxt = window.getSelection().toString();
  return selectedTxt;
}

const destructuredData = (response, selectedText) => {
  const { hasError, errorMessage, result } = response;

  if (!result) {
    errorUiDisplay(selectedText);
    return;
  }

  const { word, phonetic, audio, definition } = result;
  console.log(audio)
  playAudio(audio)
  const defOne = definition[0];
  const defTwo = definition[1];

  successUiDisplay(word, phonetic, defOne, defTwo);
};

const errorUiDisplay = (selectedText) => {
  const body = document.querySelector("body");
  body.innerHTML = `
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

const successUiDisplay = (word, phonetic, audio, defOne, defTwo) => {
  const body = document.querySelector("body");
  body.innerHTML = `
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

const playAudio = (audio) => {
  const audioTag = document.createElement("audio");
  audioTag.id = "sound";
  audioTag.src = audio;
  console.log(audio)

  console.log(audioTag);
};
const audioBtn = document.querySelector(".play-pron");
audioBtn.addEventListener("click", () => playAudio());

/*
for display position, innerHeight and width / 2..

so it'd always pop up at the center of the screen.
*/
