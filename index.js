const urlAPI = "https://opentdb.com/api.php?amount=5&category=23&difficulty=medium&type=multiple"

//create a function that gets data using the API and siplays it on the webpage
function getData(){
    fetch(urlAPI)
    .then(response => {
        if (!response.ok){
            throw new Error(`HTTPError: ${response.status}`)
        }
        return response.json() //convert the response to json fromat
    })
    .then(data => {
        let trivia = "" //create an empty variable to store the innerHTML with the data from the API
        data.results.map((values) => {    
            // Insert the data values from the API into the appropriate positions in the HTML elements using "values."
            // the + ensures the code loops through all elements creating the HTML and inserting the values
            trivia += `<div class="question", id>
            <label for="exampleFormControlInput1" class="form-label">${values.question}</label>                
          </div>
          <div class="choices">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="box" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                ${values.incorrect_answers[0]}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="box" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                ${values.incorrect_answers[1]}
                </label>
            </div> 
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="box" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                ${values.incorrect_answers[2]}
                </label>
            </div> 
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="box" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                ${values.correct_answer}
                </label>
            </div>
          </div>`
        })
        // Add the innerHTML to div.card created in index.html to display the questions
        document.querySelector(".card").innerHTML=trivia

        // On clicking the submit button, calculate the score based on the correct answers given        
        let submit = document.querySelector(".submit")
        submit.addEventListener(`click`, (e)=>{
            // get the list of choices from the webpage
            const box = document.querySelectorAll(`.form-check`)
            //get the list of correct answers from the API 
            correct = data.results.map((values) => values.correct_answer)            
            var score = 0 // initialize the variable to store the score
            let selectedValue ="" // initialize the variable to store the selected choices
            // loop through each choice and store the value in selectedValue
            Array.from(box).forEach(ans =>{
                if (ans.firstElementChild.checked){
                    selectedValue = ans.innerText
                // loop through the correct answers and check which selected choices are correct
                correct.forEach(point => {
                    if (selectedValue == point){
                        // Increase the score by 1 if the answer matches the correct answer
                        score = score + 1
                    }
                })            
                    
                }                
                })
                // Display the score to the user
                alert(`Your score is ${score}/5 \nYou can press Start to play again!`) 
            })           
        })

    }


// function to show the hidden elements in the webpage: the card containing the questions
// and the submit button
function show(){    
    document.querySelector('.card').style.display = "block"      
    document.querySelector(`.submit`).style.display = "block"
}

// create a start button and call the 2 functions
// getData() -> fetch data from the API, arrange the questions on the HTML page and evaluate the score 
// show() -> Display the questions and the submit button
const start = document.querySelector('.start')
start.addEventListener('click', (e)=>{    
    getData()
    show()
})
