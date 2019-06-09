
$(document).ready(function() 
{
    var timer = 30;
    var question = $("#question");
    var qHolder = $("#qHolder");
    var questionsArray  =
    [
        {q:"Make your life more", a:"Trolli"},
        {q:"You're not you when you're hungry", a:"Snickers"},
        {q:"There's no wrong way to eat a ", a:"Reese's"},
        {q:"The Original Gourmet", a:"Jelly Bean"},
        {q:"Big on Chocolate", a:"3 Musketeers"},
        {q:"Two for me, none for you!", a:"Twix"},
        {q:"Makes Mouths Happy", a:"Twizzlers"},
        {q:"Have a break", a:"KitKat"},
        {q:"Everlasting", a:"Gobstopper"},
        {q:"Taste the Rainbow", a:"Skittles"}

    ];

    var fillerArray = ["Hershey's" ,"Trolli", "Snickers", "Reese's", "Jelly Bean", "3 Musketeers", "Twix", "Twizzlers", "KitKat", "Gobstopper", "Skittles"];

    var myMap = new Map();
    var answer = "";
   // setInterval(countdown, 1000);

    //start
    $("#start").click(function()
    {
        start();
        reset();
    });


    function reset()//what happens on reset basically has turned into a controller
    {   
        timer = 30;
        qHolder.text("");
        myMap.clear();

        var picker = Math.floor(Math.random() * questionsArray.length);
        var slot = Math.floor(Math.random() * 5);

        question.text(questionsArray[picker].q);
        myMap.set(questionsArray[picker].a, 1);
        answer = questionsArray[picker].a;

        
        for (let i = 0; i < 5; i++) {
            
            if(i === slot)
            {
                qHolder.prepend("<span class = answer>"+ questionsArray[picker].a + "</span> <br>")
            }
            else
            {
                qFiller(myMap)
            }
        }

        clickManager();
        
    }

    function start()// variables when start button is clicked
    {
        setInterval(countdown, 1000);
        $("#top").css("visibility", "visible");
        $("#qHolder").css("visibility", "visible");
        $("#start").css("display", "none").off("click");
    }
    function clickManager()//manages user input click
    {

        $(qHolder).on("click", ".answer", function()
        {
             timer = 5;
             question.text("Correct the answer was: " + answer);
             $(this).css("background-color", "limegreen")
             $(qHolder).off("click");
        });
        $(qHolder).on("click", ".filler", function()
        {
             timer = 5;
             question.text("Wrong the answer was: " + answer);
             $(this).css("background-color", "red")
             $(qHolder).off("click");
        });
    }

    function qFiller(stored)//fill the other question slots with different answers
    {
        let random = Math.floor(Math.random() * fillerArray.length);
        while(stored.has(fillerArray[random]))
        {
            random = Math.floor(Math.random() * fillerArray.length); 

        }
        myMap.set(fillerArray[random], 1);
        qHolder.prepend("<span class = filler>"+ fillerArray[random] + "</span> <br>");
    }

    function countdown()//reset when timer hits 0
    {
        timer--;
        $("#timer").text("Time Remaining: " + timer);

        if(timer <= 0)
        {
            reset();
            console.log("reset");
        }   
    }
});