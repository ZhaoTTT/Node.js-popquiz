var prompt = require('prompt');
const request = require('request');

const API_URL = "http://localhost:1337/";
const QUIZ_API_URL = `${API_URL}quiz`;
const CHECK_ANSWER_API_URL = `${API_URL}check-answer`;

// Start prompt operation
prompt.start();

request(QUIZ_API_URL, function(error,response,body){
    //console.log("\n"+'error: ', error);//Print the error if one occured
    var popQuiz = JSON.parse(body);
    console.log("\n");
    //console.log(popQuiz);
    console.log(popQuiz.question + "\n");
    popQuiz.answers.forEach(element => {
        console.log(element.selection + ". " + element.value + "\n");
    });
});


setTimeout(() => {

    //Get two properties from the user; username and password
    prompt.get(['answer'],function(err,result){
        //Log the results to commandline console
        console.log('  answer  ---' + result.answer);
        var inputAnswer={
            //answer:"a"
            answer:result.answer
        }
        request({
            url:CHECK_ANSWER_API_URL,
            //body:inputAnswer,
            method: "POST",
            json: inputAnswer
        },function(error,response,body){
            console.log(body); //{ result: true/false }
            //console.log(body.answer); //undefined, wrong property
            console.log(typeof(body.result));

            if(body.answer===true){
                console.log("BINGE !")
            }else{
                console.log("TRY AGAIN!");
            }
            process.exit(1);
        });
    });
}, (2000));


