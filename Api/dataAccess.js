import DictionaryApi from "./data.js"

const findMeaning = async (word) => {
    const dictionary = new DictionaryApi

    let response = await dictionary.getData(word)

    if (response.hasError) {
        return response
    }

    let meaning = dictionary.getInfo(response.meanings);

    let audio = dictionary.getAudio(response.phonetics);

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
                        definition: meaning
                    },
                ],
            },
        ],
    };
}


export default findMeaning 