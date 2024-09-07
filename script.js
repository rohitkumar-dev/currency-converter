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
        newOption.innerText = `${currCode}`
        newOption.value = `${currCode}`

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


function swap(){
  
  const from_select = document.querySelector(".from-box select")
  const from_option = from_select.options[from_select.selectedIndex]
  
  const from_curr = from_option.innerText
  const from_curr_val = from_option.value
  const from_img = document.querySelector(".from-box img").src

  
  const to_select = document.querySelector(".to-box select")
  const to_option = to_select.options[to_select.selectedIndex]
  
  const to_curr = to_option.innerText
  const to_curr_val = to_option.value
  const to_img = document.querySelector(".to-box img").src
  
  //swaping
  from_option.innerText = to_curr;
  from_option.value = to_curr_val;
  document.querySelector(".from-box img").src = to_img;
  
  to_option.innerText = from_curr;
  to_option.value = from_curr_val;
  document.querySelector(".to-box img").src = from_img;

  console.log(from_img, from_curr, from_curr_val, to_img, to_curr, to_curr_val)
}

const swaper = document.querySelector("#swaper")
swaper.addEventListener("click", (evt) => {
  evt.preventDefault()
  swap()
  updateRate()
})


