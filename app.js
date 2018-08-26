const express = require('express');
const bodyParser = require('body-parser');
const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');

const mongodb_url='mongodb://ds121982.mlab.com:21982';
const dbName='safsfdb-ken';



// initialize the express app object
var app = express();
// init router
var router = express.Router();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

// load the router into the express object
app.use('/', router);

var popQuiz = {
    question: "What is my name?",
    answers: [ 
        {selection: "a", value: "Kenneth"},
        {selection: "b", value: "Lisa"},
        {selection: "c", value: "Samuel"},
        {selection: "d", value: "Alex"}
    ],
    correctAnswer: "a"
}

// MongoClient.connect(url,function(err, client){
//     assert.equal(null,err);
//     console.log("Connecting to mongodb ...");
//     const db=client.db(dbName);
// });



router.get('/quiz', function(req,res,next){

    //delete popQuiz.correctAnswer;
    //res.json(popQuiz); /*only response once, because it will set HTTPresponse headers and body, after that, you cannot set again*/

    /*User copy, then delete will not influence the original array */
    var acopyPopQuiz = Object.assign({}, popQuiz);
    //Object.assign(-target-,-source-)
    delete acopyPopQuiz.correctAnswer;
    res.json(acopyPopQuiz);


});
/*If "get" first, then "post", then the popQuiz will be undenied.(Because already delete K-V correctAnswer)*/
/*If restart server and directly "post", then the popQuiz will be "a".*/
/*If write in POSTMAN, Body--raw--JSON(application/json)--
    {
        "answer":"a"
    }
    then post,
    then terminal will show:
    //Server is running at localhost:1337
    //answer:[object Object]
    //answer.answer:a
    //popQuiz.correctAnswer:a
    //CORRECT !
*/
router.post('/check-answer',function(req,res,next){
    var answer=req.body;
    var isCorrect=false;
    //console.log("answer:"+answer);
    console.log("answer.answer:"+answer.answer);
    console.log("popQuiz.correctAnswer:"+popQuiz.correctAnswer);
    if(popQuiz.correctAnswer === answer.answer){
        console.log("CORRECT !");
        isCorrect=true;
    }else{
        console.log("NOT CORRECT !");
    }
    res.json({result:isCorrect});
});

app.listen(1337, function(){
    console.log("Server is running at localhost:1337");
})