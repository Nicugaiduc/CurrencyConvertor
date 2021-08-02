window.onload = function() {
    getCurrencyList();
}

const fromCurrency = document.querySelector('#fromCurrency')
const toCurrency = document.querySelector('#toCurrency')
const fromCurrencySelector = document.querySelector('#fromCurrencySelector')
const toCurrencySelector = document.querySelector('#toCurrencySelector')
const swapButton = document.querySelector('#swap')
const alertError = document.querySelector('.alert')

//GET CURRENCY LIST FROM JSON FILE AND POPULATE THE SELECT
const getCurrencyList = async () => {
    const rowData = await fetch(`http://localhost:3000/`);
    currency = await rowData.json();
    let option = ''
    currency.forEach(element => {
        option += `<option value="${element.rate}">${element.code}</option>`
    });

    fromCurrencySelector.innerHTML = option
    toCurrencySelector.innerHTML = option
}

//SWAP CURRENCY WHEN SWAP BUTTON IS CLICKED
swapButton.addEventListener('click', () => {
    let temp1 = fromCurrency.value
    let temp2 = fromCurrencySelector.value
    fromCurrency.value = toCurrency.value
    fromCurrencySelector.value = toCurrencySelector.value
    toCurrency.value = temp1
    toCurrencySelector.value = temp2
})

//TRACK IF THE INPUT IS CHANGED
fromCurrency.addEventListener('input', () => {
    if(isNaN(fromCurrency.value)){
        alertError.classList.add("visible")
    } else {
        alertError.classList.remove("visible")
        calculateValue()
    }
})

//TRACK IF THE CURRENCY IS CHANGED
const onCurrencyChange = () => {
    calculateValue()
}

//CALCULATES THE toCurrency input value
const calculateValue = () => {
    toCurrency.value = ((toCurrencySelector.value / fromCurrencySelector.value) *fromCurrency.value).toFixed(2)
}