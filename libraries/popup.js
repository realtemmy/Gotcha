import findMeaning from "../Application/dataAccess.js";

document.addEventListener('DOMContentLoaded', async function () {
    const success = document.querySelector('.wrapper');
    const error = document.querySelector(".not-found");

    let bgPage = chrome.extension.getBackgroundPage();
    let wordData = bgPage.userMessage

    console.log(wordData);

    // Error display on the UI
    const errorUiDisplay = (selectedText) => {
        //   const main = document.querySelector("main");
        toggleModal(error)
        toggleModal(success)
        error.innerHTML = `
    <h1 class="not-found__word">Oops!!!</h1>
    <div class="not-found__img">
        <img src="./img/93134-not-found.gif" alt="404 not found gif">
    </div>
    <p class="not-found__title">Couldn't find the definition for "${selectedText}"</p>
      `;

    };



    const SynonymsAndAntonyms = (list) => {
        let my_text = ''
        if (list.length <= 0) return my_text;

        let count = 0
        while (count <= list.length - 1) {
            if (count === 2) {
                my_text += `${list[count]}`
                break
            }

            if (count === list.length - 1) {
                my_text += `${list[count]}`
                count++;
                continue;
            }

            my_text += `${list[count]}, `

            count++

        }

        return my_text;
    }

    const setDefinitionsStructure = (definitions) => {
        let definition_text = "";
        console.log(definitions);
        if (definitions.length <= 0) return definition_text;

        let count = 0
        while (count <= definitions.length - 1) {
            if (count === 2) break; //break the loop when we get to the 3rd index

            let exampleText = (definitions[count].example === undefined || definitions[count].example === "undefined") ? '' : definitions[count].example
            let synonyms = '<em class="alt__color">Synonyms:</em> ';
            let antonyms = '<em class="alt__color">Antonyms:</em> ';
            synonyms += SynonymsAndAntonyms(definitions[count].synonyms)
            antonyms += SynonymsAndAntonyms(definitions[count].antonyms)
            definition_text +=
                `
            <article class="desc">
                <ul class="desc__main">
                    <li>
                        <p>${definitions[count].definition}
                        <sup><span class="pos">${definitions[count].partofspeech}</span></sup></p>
                    </li>
                    <q class="desc__example">${exampleText}</q><br />
                    <i class="alt">${synonyms}</i>
                    <br/ >
                    <i class="alt">${antonyms}</i>
                </ul>
            </article>
        `

            count++
        }

        return definition_text;
    }

    const phoneticRepresentation = (phonetic, audio) => {
        let response_html = ""
        let phonetic_text = ""
        let audio_file = ""

        if (phonetic !== "undefined") {
            phonetic_text +=
                `   <div class="col">
                <span class="pr">'${phonetic}'</span>
            </div>
        `
        }

        if (audio) {
            audio_file +=
                `
            <a href="#" class="play-pron pop__icon" data-audio-url="${audio}">
                <i class="bi bi-volume-up play-pron" data-audio-url="${audio}"></i>
            </a>
        `
        }

        response_html +=
            `
                ${phonetic_text}
                ${audio_file}
            `

        return response_html;
    }

    // Meaning of word display
    const successUiDisplay = (word, phonetic, audio, definitions) => {

        let definition = setDefinitionsStructure(definitions)
        phonetic = phoneticRepresentation(phonetic, audio)

        success.innerHTML = `
    <div class="wrapper">
        <h1 class="pop__title">
            ${word}
            <span class="pop__icon pop__icon--disabled" style="cursor: pointer;">
                <i class="bi bi-heart"></i>
            </span>
        </h1>
        <section class="pop__prs">
            ${phonetic}
        </section>
        <section class="pop__body">
            ${definition}
        </section>
        <section class="pop__bottom">
            <a href="#" class="more-btn" id="redirect" style="display: flex; align-items:center; gap: 1.6rem; font-size: 1.6rem;">
                <span>Read more</span>
                <span class="redirect__icon">
                    <i class="bi bi-box-arrow-up-right"></i>
                </span>
            </a>
        </section>
    </div>
      `;
    };

    const toggleModal = (modal) => {
        modal.classList.toggle('hide');
    }

    const closeBtn = document.querySelector(".pop__close");
    closeBtn.addEventListener("click", (e)=>{
        window.close();
    });




    const getClickPosition = (e) => {
        const xPosition = (e.clientX - (main.offsetWidth / 2) * 2.25)
        const yPosition = (e.clientY - (main.offsetHeight / 2) * 3.3)

        const translateValue =
            "translate(" + xPosition + "px, " + yPosition + "px)";
        success.style.transform = translateValue;

        console.log(translateValue);

    }



    // display position on the UI

    // Destructure information coming from the API
    const destructuredData = (response, selectedText) => {
        const { hasError, errorMessage, result } = response.response;

        console.log(response)

        if (hasError) {
            errorUiDisplay(selectedText);
            return;
        }
        console.log(result);
        const { word, phonetic, audio, definition } = result;

        successUiDisplay(word, phonetic, audio, definition);
    };


    // document.body.addEventListener('dblclick', getClickPosition)

    if (wordData.isWord === false) {
        errorUiDisplay(wordData.word)
    } else {
        let response = await findMeaning(wordData.word)
        destructuredData(response, wordData.word)

        console.log(response);

    }

    document.querySelector(".play-pron").addEventListener('click', (e) => {
        let audioUrl = e.target.getAttribute('data-audio-url')
        // console.log("audio url ", audioUrl);
        var audio = new Audio(audioUrl);
        audio.play();
    })

    document.querySelector(".more-btn").addEventListener('click', ()=>{
        const isConfirmed = confirm('redirecting...');
        if(isConfirmed)window.open(`http://google.com/search?q=what is the meaning of ${wordData.word}`, '_blank');
    })
});
