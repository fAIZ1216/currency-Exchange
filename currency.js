const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdown = document.querySelectorAll(".dropdown select");
  const btn= document.querySelector("form button");
  const fromCurrency=document.querySelector(".from select");
  const toCurrency=document.querySelector(".to select");
  const masg= document.querySelector(".masg")

  for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from " && currCode === "USD"){
            newOption.selected="select"
        } else if(select.name ==="to "&& currCode==="PKR"){
            newOption.selected="select"
        }
        select.appendChild(newOption);
        
    }
    select.addEventListener("change",(evt)=>{
        updateFlage(evt.target)
    })
  }
const updateFlage = (element)=>{
    
    let currCode=element.value;
    let countryCode=countryList[currCode]
    let newSrec=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newSrec;
}
btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let amtVl=amount.value
    
    if(amtVl==="" || amtVl<1){
        amtVl=1
        amount.value="1"
    }
   const URL=`${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`
  let response= await fetch(URL)
  let data= await response.json()
  let rate=data[toCurrency.value.toLowerCase()]

  let finaAmount=amtVl*rate
  masg.innerText =`${amtVl}${fromCurrency.value}=${finaAmount}${toCurrency.value}`
  
})
