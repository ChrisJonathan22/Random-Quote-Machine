// Once the page has finished loading, begin.
$(document).ready( () => {

    // Saving the font awesome quote Icon as a variable. Classes return an array and because I only have one element with the class 0 is where the element is.
    let bigIcon = document.getElementsByClassName("big-icon")[0];
    
    // Saving the body element as a variable.
    let body = document.body;
    
    // Saving the social icons as a variable.
    let icons = document.getElementsByClassName("social-icons");
    
    // Saving the button element as a variable.
    let button = document.getElementsByTagName("button")[0];
    
    // Saving the new quote paragraph element as a variable.
    let para = document.getElementById("quote-para");
    
    
    // An array of colours used in this application at random.
    let colors = ["red", "lightblue", "yellow", "dodgerblue", "green", "purple", "pink","orange", "violet", "grey", "black",'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    
    // Variable which will hold new quotes and its authors if it has one.
    var quote;
    var author;
    
    // A function called everytime the New quote button is clicked.
    function changeBG(){
    
    
    // Ajax call to the api below to gain access to its quotes.
    $.ajax({
      url: 'http://api.forismatic.com/api/1.0/',
      // Without the property jsonp: jsonp, the dataType: 'jsonp, format: 'jsonp' I was getting an error called access control allow origin can't be null/ HTTP access control(CORS) which is why I had to use jsonp which is a workaround.
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success: (res) => {
        quote = res.quoteText;
        author = res.quoteAuthor;
        console.log(quote);
        if(!author){
          author = "- unknown";
        }
        // para.innerText = res.quoteText + "<br/>" + res.quoteAuthor;
          para.innerHTML = quote + "<br/>" + "<br/>" + "said by " + author;
        
      }
    
    });
    
    
    
      // Creating a random number between 0 and the total amount of colors. 
      let rand = Math.floor(Math.random() * colors.length) + 1;
      
      // Change the body's bg color.
      body.style.backgroundColor = colors[rand];
      body.style.transition = "3s";
      
      // Change the quotation icon color.
      bigIcon.style.color = colors[rand];
      bigIcon.style.transition = "3s";

      // Change the button color.
      button.style.backgroundColor = colors[rand];
      button.style.transition = "3s";

      // If the quotation icon the animation class 'blink_me' then it should be removed.
      if(bigIcon.classList.contains("blink_me")){
        bigIcon.classList.remove("blink_me");
      }
      
      // If the quotation icon doesn't have the animation class 'blink_me' then it should be added.
      else {
        bigIcon.classList.add("blink_me");
      }
      
    
      // icon is the class given to both social media icons and since a saved class is an array of items in order to use both items a for loop is required though there are otherways of doing this.
      for(let i = 0; i < icons.length; i++){
        icons[i].style.color = colors[rand];
        icons[i].style.transition = "3s";
      }
      
      // A random number generator with some information regarding that number.
    //   let number = Math.floor(Math.random() * 1000 + 1);
    //     fetch('http://numbersapi.com/' + number)
    //     .then(response => response.text())
    //     .then(data => {
    //     console.log(data);
    //     para.innerText = data;
    //   })
    //   .catch(err => console.log(err));
      
    
    
    }
    
    
    
    
    
    
    // The button event listener which allows us to add a feature to the button which when clicks triggers the function 'changeBG' to run.
    button.addEventListener('click', changeBG, false);
    
    
    // Targeting the twitter icon and adding a click event to it. When clicked the user will be taken to twitter's create a new tweet/ what's happening?. 
    icons[0].addEventListener("click", () =>{
      event.preventDefault();
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote));
      console.log(quote);
    }, false);
    
    icons[1].addEventListener('click', () => {
      event.preventDefault();
      window.open('https://www.tumblr.com/new/text' + encodeURIComponent(quote));
    },false);
    
    
    // When the page loads up run the function so that a new quote is generated.
    changeBG();
  
    
    });
    
    
    
    
    