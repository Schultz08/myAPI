const baseLink = "https://ghibliapi.herokuapp.com";
let url;


const movieBtn = document.querySelector(".movieBtn");
const theBody = document.querySelector("section");

document.addEventListener("click", Expand);


movieBtn.addEventListener("click", GetMovie);


function Expand(e)
{
    console.log(e)
    if(e.target.className =="showMore" )
     {
         let textShow = e.path[2].childNodes[0];
         textShow.classList.remove("hideText");

         let textHide = e.path[2].childNodes[1];
         textHide.classList.add("hideText");
    }
    if(e.target.className =="showLess")
    {
        let textShow = e.path[2].childNodes[0];
        textShow.classList.add("hideText");
        
        let textHide = e.path[2].childNodes[1];
        textHide.classList.remove("hideText");
    }
}

function GetMovie()
{
    url = baseLink + "/films"
    fetch(url)
    .then(function(response)  {
        return response.json();
    }).then(json => displayResults(json))
}


function displayResults(json)
{
    //work in progress. random img but only one of each.
    // let numberArray = GetCardBackgroundNumbers(json.length);

    // function GetCardBackgroundNumbers(size)
    // {
    //     let s = [];
    //     for(let i=0; i < size; i++){s.push(i)}
    //     console.log(s);

    //     for(let j, x, i = s.length; i; 
    //         j = Math.floor(Math.random())*i, 
    //         x = s[i--],
    //         s[i] = s[j], 
    //         s[j] = x);
    //     console.log(s);
    //     return s;
    // }

    for(let i = 0; i < json.length; i++)
    {
       let cardWrap = document.createElement("div");
       let cardContent = document.createElement("div");
       let cardFront = document.createElement("div");
       let cardBack = document.createElement("div");
       let movieName = document.createElement("h2");
       let about = document.createElement("p");
       let current = json[i];
        

       //work in progress
       //let number = numberArray.shift();


       //gets "random" number
       let number = Math.floor(Math.random()* 23);
    
       cardFront.style.background = `url(assets/cardBackGround/CardBackground${number}.jpg) no-repeat`;
       cardFront.style.backgroundSize = "100% 100%";

       movieName.textContent = current.title;
       
       // if less than 200 char return string. If bigger splits string adds ellpis and creats new hidden element with full text.
       if(turncate(current.description, 200) == true)
        {

        about.textContent = current.description;
        cardWrap.classList.add("cardWrap");
        cardContent.classList.add("cardContent");
        cardFront.classList.add("cardFront");
        cardBack.classList.add("cardBack");
        cardWrap.classList.add("col");

            
        cardFront.appendChild(movieName);
        cardBack.appendChild(about);
        cardContent.appendChild(cardFront);
        cardContent.appendChild(cardBack);
        cardWrap.appendChild(cardContent);


        }
        else
        {   
            about.innerHTML = turncate(current.description, 200);
            let newBtn = document.createElement("img");
            let allText = document.createElement("p");

            allText.innerText = current.description;
            
            allText.innerHTML += " <span class = showLess > &#171&#171</span>";
            
            newBtn.classList.add("showMore");
            allText.classList.add("hideText");
            cardWrap.classList.add("cardWrap");
            cardContent.classList.add("cardContent");
            cardFront.classList.add("cardFront");
            cardBack.classList.add("cardBack");
            cardWrap.classList.add("col");

            cardBack.appendChild(allText);
            cardBack.appendChild(about);
            cardBack.appendChild(newBtn);
            cardFront.appendChild(movieName);
            cardContent.appendChild(cardFront);
            cardContent.appendChild(cardBack);
            cardWrap.appendChild(cardContent);
            
        }
        

      
        theBody.appendChild(cardWrap);
    }
    
    function turncate(str, length)
    {
        
        let strSplit =  str.slice(0, length);

        if(strSplit.length < length){ return true;}
        else
        {   
          return strSplit.slice(0, strSplit.lastIndexOf(" ")) + " <span class = showMore >&hellip;&#187&#187</span>";

          //work in progress changing expand button to a icon
         // return strSplit.slice(0, strSplit.lastIndexOf(" ")) + "&hellip;&hellip;<button class='btn'></button>"
        }
    }

    
}