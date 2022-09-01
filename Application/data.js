class DictionaryApi {

    async getData(words) {
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`)

            let dataResponse = ''

            if (response.status !== 200) {
                dataResponse = await response.json();
               return {status: false, data: dataResponse}
            }

            dataResponse = await response.json();
    
            return {status: true, data: dataResponse[0]};

        }catch (error) {
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

    getInfo(meanings) {
        let m = this.getDefinition(meanings).map((data)=>{
            return {
                partofspeech: data.partOfSpeech,
                synonyms: data.synonyms,
                antonyms: data.antonyms,
                definition: data.definitions[0].definition,
                example: data.definitions[0].definition
            }
        })
        
        return m
    }

    getDefinition(definitionsArray) {
        let defined = []
        for (let i = 0 ; i < definitionsArray.length; i++) {
            if (i <= 1) {
               defined.push(definitionsArray[i])
               continue
            }
            break
        }

        return defined
    }
}

export default DictionaryApi
