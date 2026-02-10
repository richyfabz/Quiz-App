// selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit_btn");
const continue_btn = info_box.querySelector(".buttons .restart_btn");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart_btn");
const quit_quiz = result_box.querySelector(".buttons .quit_btn");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + escapeHtml(questions[index].question) +'</span>';
    let option_tag = '<div class="option"><span>'+ escapeHtml(questions[index].options[0]) +'</span></div>'
    + '<div class="option"><span>'+ escapeHtml(questions[index].options[1]) +'</span></div>'
    + '<div class="option"><span>'+ escapeHtml(questions[index].options[2]) +'</span></div>'
    + '<div class="option"><span>'+ escapeHtml(questions[index].options[3]) +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 40){ // if user scored more than 40
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 25){ // if user scored more than 25
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 25
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

// creating an array and passing the number, questions, options, and answers
let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinking Text Marking Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
  {
    numb: 6,
    question: "Which company developed JavaScript?",
    answer: "Netscape",
    options: [
      "Microsoft",
      "Netscape",
      "Sun Microsystems",
      "Oracle"
    ]
  },
  {
    numb: 7,
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    answer: "<script src='script.js'>",
    options: [
      "<script href='script.js'>",
      "<script name='script.js'>",
      "<script src='script.js'>",
      "<script file='script.js'>"
    ]
  },
  {
    numb: 8,
    question: "How do you write 'Hello World' in an alert box?",
    answer: "alert('Hello World');",
    options: [
      "msgBox('Hello World');",
      "alertBox('Hello World');",
      "msg('Hello World');",
      "alert('Hello World');"
    ]
  },
  {
    numb: 9,
    question: "How do you create a function in JavaScript?",
    answer: "function myFunction()",
    options: [
      "function:myFunction()",
      "function = myFunction()",
      "function myFunction()",
      "create myFunction()"
    ]
  },
  {
    numb: 10,
    question: "How do you call a function named 'myFunction'?",
    answer: "myFunction()",
    options: [
      "call myFunction()",
      "call function myFunction()",
      "myFunction()",
      "execute myFunction()"
    ]
  },
  {
    numb: 11,
    question: "Which HTML tag is used to define an internal style sheet?",
    answer: "<style>",
    options: [
      "<script>",
      "<css>",
      "<style>",
      "<link>"
    ]
  },
  {
    numb: 12,
    question: "Which property is used to change the background color in CSS?",
    answer: "background-color",
    options: [
      "color",
      "bgcolor",
      "background-color",
      "bg-color"
    ]
  },
  {
    numb: 13,
    question: "How do you add a comment in CSS?",
    answer: "/* this is a comment */",
    options: [
      "// this is a comment //",
      "// this is a comment",
      "/* this is a comment */",
      "<!-- this is a comment -->"
    ]
  },
  {
    numb: 14,
    question: "Which CSS property controls the text size?",
    answer: "font-size",
    options: [
      "text-style",
      "font-size",
      "text-size",
      "font-style"
    ]
  },
  {
    numb: 15,
    question: "What is the correct HTML for creating a hyperlink?",
    answer: "<a href='url'>",
    options: [
      "<a url='url'>",
      "<a href='url'>",
      "<a>url</a>",
      "<link>url</link>"
    ]
  },
  {
    numb: 16,
    question: "Which HTML attribute specifies an alternate text for an image?",
    answer: "alt",
    options: [
      "title",
      "src",
      "alt",
      "longdesc"
    ]
  },
  {
    numb: 17,
    question: "How can you make a numbered list in HTML?",
    answer: "<ol>",
    options: [
      "<ul>",
      "<ol>",
      "<dl>",
      "<list>"
    ]
  },
  {
    numb: 18,
    question: "What is the correct HTML for making a text input field?",
    answer: "<input type='text'>",
    options: [
      "<textfield>",
      "<input type='textfield'>",
      "<input type='text'>",
      "<textinput type='text'>"
    ]
  },
  {
    numb: 19,
    question: "Which HTML tag is used to define an unordered list?",
    answer: "<ul>",
    options: [
      "<ol>",
      "<ul>",
      "<li>",
      "<list>"
    ]
  },
  {
    numb: 20,
    question: "What does the 'typeof' operator return in JavaScript?",
    answer: "The data type of a variable",
    options: [
      "The value of a variable",
      "The data type of a variable",
      "The name of a variable",
      "The memory address"
    ]
  },
  {
    numb: 21,
    question: "Which method is used to add an element at the end of an array in JavaScript?",
    answer: "push()",
    options: [
      "append()",
      "push()",
      "add()",
      "insert()"
    ]
  },
  {
    numb: 22,
    question: "What is the correct way to write a JavaScript array?",
    answer: "var colors = ['red', 'green', 'blue']",
    options: [
      "var colors = 'red', 'green', 'blue'",
      "var colors = (1:'red', 2:'green', 3:'blue')",
      "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
      "var colors = ['red', 'green', 'blue']"
    ]
  },
  {
    numb: 23,
    question: "How do you round the number 7.25 to the nearest integer in JavaScript?",
    answer: "Math.round(7.25)",
    options: [
      "rnd(7.25)",
      "Math.rnd(7.25)",
      "round(7.25)",
      "Math.round(7.25)"
    ]
  },
  {
    numb: 24,
    question: "Which event occurs when the user clicks on an HTML element?",
    answer: "onclick",
    options: [
      "onchange",
      "onclick",
      "onmouseclick",
      "onmouseover"
    ]
  },
  {
    numb: 25,
    question: "How do you declare a JavaScript variable?",
    answer: "var carName;",
    options: [
      "variable carName;",
      "v carName;",
      "var carName;",
      "declare carName;"
    ]
  },
  {
    numb: 26,
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    answer: "=",
    options: [
      "*",
      "=",
      "-",
      "x"
    ]
  },
  {
    numb: 27,
    question: "What will the following code return: Boolean(10 > 9)?",
    answer: "true",
    options: [
      "false",
      "true",
      "NaN",
      "undefined"
    ]
  },
  {
    numb: 28,
    question: "Which method converts JSON data to a JavaScript object?",
    answer: "JSON.parse()",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()"
    ]
  },
  {
    numb: 29,
    question: "How do you select an element with id 'demo' in CSS?",
    answer: "#demo",
    options: [
      ".demo",
      "#demo",
      "*demo",
      "demo"
    ]
  },
  {
    numb: 30,
    question: "How do you select elements with class name 'test' in CSS?",
    answer: ".test",
    options: [
      ".test",
      "#test",
      "*test",
      "test"
    ]
  },
  {
    numb: 31,
    question: "Which CSS property is used to change the font of an element?",
    answer: "font-family",
    options: [
      "font-weight",
      "font-style",
      "font-family",
      "text-style"
    ]
  },
  {
    numb: 32,
    question: "How do you make each word in a text start with a capital letter in CSS?",
    answer: "text-transform: capitalize",
    options: [
      "text-transform: capitalize",
      "text-transform: uppercase",
      "text-style: capitalize",
      "transform: capitalize"
    ]
  },
  {
    numb: 33,
    question: "Which CSS property controls the text alignment?",
    answer: "text-align",
    options: [
      "text-align",
      "font-align",
      "text-style",
      "align"
    ]
  },
  {
    numb: 34,
    question: "What is the default value of the position property in CSS?",
    answer: "static",
    options: [
      "relative",
      "fixed",
      "absolute",
      "static"
    ]
  },
  {
    numb: 35,
    question: "Which HTML element defines the title of a document?",
    answer: "<title>",
    options: [
      "<meta>",
      "<title>",
      "<head>",
      "<header>"
    ]
  },
  {
    numb: 36,
    question: "Which HTML attribute is used to define inline styles?",
    answer: "style",
    options: [
      "class",
      "styles",
      "style",
      "font"
    ]
  },
  {
    numb: 37,
    question: "Which is the correct way to comment out code in HTML?",
    answer: "<!-- This is a comment -->",
    options: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "# This is a comment"
    ]
  },
  {
    numb: 38,
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    options: [
      "Document Object Model",
      "Display Object Management",
      "Digital Ordinance Model",
      "Desktop Operating Mode"
    ]
  },
  {
    numb: 39,
    question: "Which method is used to remove the last element from an array in JavaScript?",
    answer: "pop()",
    options: [
      "remove()",
      "pop()",
      "delete()",
      "shift()"
    ]
  },
  {
    numb: 40,
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    answer: "Refers to the current object",
    options: [
      "Refers to the previous object",
      "Refers to the current object",
      "Refers to the parent object",
      "Creates a new object"
    ]
  },
  {
    numb: 41,
    question: "Which symbol is used for comments in JavaScript?",
    answer: "//",
    options: [
      "#",
      "//",
      "/*",
      "<!--"
    ]
  },
  {
    numb: 42,
    question: "What is the correct way to write an IF statement in JavaScript?",
    answer: "if (i == 5)",
    options: [
      "if i = 5 then",
      "if (i == 5)",
      "if i == 5",
      "if i = 5"
    ]
  },
  {
    numb: 43,
    question: "How do you write a WHILE loop in JavaScript?",
    answer: "while (i <= 10)",
    options: [
      "while (i <= 10; i++)",
      "while i = 1 to 10",
      "while (i <= 10)",
      "while (i <= 10; i++; i--)"
    ]
  },
  {
    numb: 44,
    question: "Which CSS property is used to make text bold?",
    answer: "font-weight",
    options: [
      "font-weight",
      "text-weight",
      "font-bold",
      "text-style"
    ]
  },
  {
    numb: 45,
    question: "What is the correct HTML element for the largest heading?",
    answer: "<h1>",
    options: [
      "<heading>",
      "<h6>",
      "<head>",
      "<h1>"
    ]
  },
  {
    numb: 46,
    question: "Which JavaScript method is used to write to the HTML output?",
    answer: "document.write()",
    options: [
      "document.write()",
      "console.log()",
      "document.output()",
      "window.print()"
    ]
  },
  {
    numb: 47,
    question: "How do you create a function that returns a value in JavaScript?",
    answer: "return value;",
    options: [
      "return value;",
      "send value;",
      "output value;",
      "give value;"
    ]
  },
  {
    numb: 48,
    question: "What is the correct way to link an external CSS file in HTML?",
    answer: "<link rel='stylesheet' href='style.css'>",
    options: [
      "<style src='style.css'>",
      "<stylesheet>style.css</stylesheet>",
      "<link rel='stylesheet' href='style.css'>",
      "<css>style.css</css>"
    ]
  },
  {
    numb: 49,
    question: "Which method is used to find the length of a string in JavaScript?",
    answer: "length",
    options: [
      "len()",
      "length",
      "size()",
      "count()"
    ]
  },
  {
    numb: 50,
    question: "What does API stand for?",
    answer: "Application Programming Interface",
    options: [
      "Advanced Programming Instruction",
      "Application Programming Interface",
      "Automated Program Integration",
      "Applied Programming Intelligence"
    ]
  }
];