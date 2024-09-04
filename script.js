const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".drop select")
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

window.addEventListener("load" ,() => {
    updateRate()
})

console.log(countryList);


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode

        if(select.name==="from" && currCode==="INR"){
            newOption.selected="selected"
        }
        else if(select.name==="to" && currCode==="USD"){
            newOption.selected="selected"
        }
        select.append(newOption)
    }


    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })

}

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/24.png`
    let img = element.parentElement.querySelector("img")
    
    img.src = newSrc 
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault()
    updateRate()
    
}) 

const updateRate = async () => {
    let amt = document.querySelector("input")
    let amt_val = amt.value
    //console.log(amt_val)
    if (amt_val==="" && amt_val<1){
        amt_val=1
        amt.value = "1"
    }

    console.log(fromCurr.value,toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL)
    //console.log(response.json());
    let data = await response.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    console.log(rate);
    let final_amt = (amt_val * rate).toFixed(2)
    msg.innerText = `${amt_val} ${fromCurr.value} = ${final_amt} ${toCurr.value}`
}


