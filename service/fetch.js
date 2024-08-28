export let getData = async() => {
    try {
        const response = await fetch('../data/Data.json');
        const data = await response.json();
        return data
    } catch(error){
        console.error(error)
    }
}


