import DictionaryApi from "./data.js"

const findMeaning = async (word) => {
    const dictionary = new DictionaryApi

    let response = await dictionary.getData(word)

    if (!response.status) {
        return { 
            response: {
                hasError:true,
                errorMessage : response.data.message,
                result: null
            }
        }
    }

    let meaning = dictionary.getInfo(response.data.meanings);

    let audio = dictionary.getAudio(response.data.phonetics);

    return {
        response: 
            {
                hasError: false,
                errormessage: null,
                result:
                    {
                        word: `${response.data.word}`,
                        phonetic: `${response.data.phonetic}`,
                        audio: audio,
                        definition: meaning
                    },
                
            },
        
    };
}


export default findMeaning 