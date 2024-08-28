
export let getData = async() => {
    try {
        const response = await fetch('https://66adc881b18f3614e3b5e0b7.mockapi.io/product');
        const data = await response.json();
        return data[0]
    } catch(error){
        console.error(error)
    }
}


