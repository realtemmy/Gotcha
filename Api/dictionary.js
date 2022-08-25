class Dictionary{
    constructor () {
        this.input = document.querySelector('.input')
    }

    async getWords(words) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`)

        const dataResponse = await response.json()

        return {
            dataResponse
        }
    }

    getAudio(phonetics){
        let phonetic_counter = phonetics.length - 1;
        while (phonetic_counter >= 0) {
            
            if(phonetics[phonetic_counter].audio !== "") return phonetics[phonetic_counter].audio

            phonetic_counter--;
            continue
            
        }
    }

    getDefinitions(definition){
        let def_counter = meanings.length - 1;
        while (def_counter >=0) {
            if(definition[def_counter].definitions < 2) return definition[def_counter].definitions
        }
    }
}


const Data = new Dictionary
const uii = new UI

Data.getWords('laugh').then((data)=>{

    uii.outputUi(data.dataResponse[0])
    let arr = data.dataResponse[0]

    let audio = Data.getAudio(arr.phonetics)
    // let meanings = Data.getDefinitions(arr.meanings)
    // // arr.phonetics.forEach((data)=>{
    // //     audio += `${data.audio}`
    // // })

    // // let phonetic_counter = arr.phonetics.length - 1;
    // // while (phonetic_counter >= 0) {
        
    // //     if(arr.phonetics[phonetic_counter].audio !== ""){
    // //         audio = arr.phonetics[phonetic_counter].audio
    // //         break;
    // //     };

    // //     phonetic_counter--;
    // //     continue 
        
    // // }

    let meanings = ''
    arr.meanings.forEach(element => {
        let defined = ''
        element.definitions.map((definition)=>{
            defined += definition.definition
        })
        meanings += `partofSpeech: ${element.partOfSpeech}, Definition: ${defined}`
        // console.log(defined);
    });

    console.log(data.dataResponse)
    console.log({ 
        response : [{
            hasError: false,
            errormessage: null, 
            result: [
                {
                    word: `${arr.word}`,
                    phonetic: `${arr.phonetic}`,
                    audio: audio,
                    definition: [
                        {
                           1: [meanings]
                        }
                    ]
                },
            ]
            
        }]
    })
})