class Dictionary {

    async getWords(words) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`)

            const dataResponse = await response.json();

            let arr = dataResponse[0];

            return arr;
        } catch (error) {
            return error
        }
    }

    getAudio(phonetics) {
        let phonetic_counter = phonetics.length - 1;
        while (phonetic_counter >= 0) {

            if (phonetics[phonetic_counter].audio !== "") return phonetics[phonetic_counter].audio

            phonetic_counter--;
            continue

        }
    }

    getDefinitions(definition) {
        let def_counter = meanings.length - 1;
        while (def_counter >= 0) {
            if (definition[def_counter].definitions < 2) return definition[def_counter].definitions
        }
    }
}


const findMeaning = async (word) => {
    const dictionary = new Dictionary

    let response = await dictionary.getWords(word)


    let audio = dictionary.getAudio(response.phonetics);

    // console.log(dataResponse);
    return {
        response: [
            {
                hasError: false,
                errormessage: null,
                result: [
                    {
                        word: `${response.word}`,
                        phonetic: `${response.phonetic}`,
                        audio: audio,
                        definition: [
                            {
                                //   1: [meanings],
                            },
                        ],
                    },
                ],
            },
        ],
    };
}


export default findMeaning 