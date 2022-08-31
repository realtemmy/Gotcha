import findMeaning from "../Application/dataAccess.js";

const success = document.querySelector('.wrapper');
const error = document.querySelector(".not-found");

let bgPage = chrome.extension.getBackgroundPage();
let wordData = bgPage.userMessage

// Error display on the UI
const errorUiDisplay = (selectedText) => {
    //   const main = document.querySelector("main");
      error.innerHTML = `
      <div class="pop">
        <span class="pop__close" title="button">
                <i class="bi bi-x-lg"></i>
        </span>
        <div class="not-found">
                <h1 class="not-found__word">Oops!!!</h1>
                <div class="not-found__img">
                    <img src="./img/93134-not-found.gif" alt="404 not found gif">
                </div>
                <p class="not-found__title">Couldn't find the word "${selectedText}"</p>
            </div>
      </div>
      `;
    
};

let list_stuffs = (list) => {
    let my_text = ''
    let length = 0
    while (length <= list.length) {
        if (length === 2) {
            break
        }
        // if (length === list.length - 1)
        // my_text += `${list[length]}`
        // else
        // my_text += `${list[length]}, `
        my_text += `${list[length]}, `
        length++

    }
    return my_text;
}

// Meaning of word display
const successUiDisplay = (word, phonetic,defOne, defTwo) => {
    //   const main = document.querySelector("main");
   
    let defTwoSynonyms = 'Synonyms: '
        defTwoSynonyms += list_stuffs(defTwo.synonyms)
    let defTwoAntonyms = 'Antonyms: '
    defTwoAntonyms += list_stuffs(defTwo.antonyms)
    let defOneSynonyms = 'Synonyms: '
    defOneSynonyms += list_stuffs(defOne.synonyms)
    let defOneAntonyms = 'Antonyms: '
    defOneAntonyms += list_stuffs(defOne.antonyms)   
    
    console.log('success');
      success.innerHTML = `
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
                            <q class="desc__example">small household articles</q><br />
                            <i class="alt">${defOneSynonyms}</i>
                            <br/ >
                            <i class="alt">${defOneAntonyms}</i>
                        </ul>
                    </article>
    
    
                    <article class="desc">
                        <ul class="desc__main">
                            <li>
                                <p>${defTwo.definition}<sup><span class="pos">${defTwo.partofspeech}</span></sup></p>
                            </li>
                            <q class="desc__example">small household articles</q><br />
                            <i class="alt">${defTwoSynonyms}</i>
                            <br/>
                            <i class="alt">${defTwoAntonyms}</i>
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
      const pop = document.querySelector(".pop");
      pop.classList.toggle("hide");
    };
    const closeBtn = document.querySelector(".pop__close");
    closeBtn.addEventListener("click", closeModalPopUp);
    
    // To get the audio meaning word searched for
    const playAudio = (audioUrl) => {
      const audioEl = document.createElement("audio");
      audioEl.id = "audio";
      audioEl.src = audioUrl;
      document.body.appendChild(audioEl)
      audioEl.play();
    // let audioSrc = document.querySelector(".audio-src").getAttribute('src')
    // let audio = new Audio();
    // audio.src = audioSrc

    };
    
    const playBtn = document.querySelector(".play-pron");
    playBtn.addEventListener("click", playAudio);
    
    const getClickPosition = (e) =>{
      const xPosition = (e.clientX - (main.offsetWidth / 2) * 2.25)
      const yPosition = (e.clientY - (main.offsetHeight / 2) * 3.3)
    
      const translateValue =
        "translate(" + xPosition + "px, " + yPosition + "px)";
      success.style.transform = translateValue;
    
      console.log(translateValue);
    
    }
    
    
    document.body.addEventListener('dblclick', getClickPosition)
    
    // display position on the UI
    
    // Destructure information coming from the API
    const destructuredData = (response, selectedText) => {
      const { hasError, errorMessage, result } = response.response;

      console.log(response)

      console.log('destructured 1')
    
    //   if (!result) {
    //     errorUiDisplay(selectedText);
    //     return;
    //   }
    console.log(result);
      const { word, phonetic, audio, definition } = result;
    //   playAudio(audio);
      console.log(audio);
      const defOne = definition[0];
      const defTwo = definition[1];
    console.log(defOne);
    console.log(defTwo);
      successUiDisplay(word, phonetic, defOne, defTwo);
    
        // return audio;

    console.log('destructured 2')
    };

if (wordData.isWord === false) {
    errorUiDisplay(wordData.word)
    // return
}


let response = await findMeaning(wordData.word)
destructuredData(response, wordData.word)

console.log(response);
