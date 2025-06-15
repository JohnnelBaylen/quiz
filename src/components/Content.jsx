import React, { useState } from "react";
import { data } from '@data/data.js'; 
import { useRef } from "react";
 
const Content = () => {

    let [index,setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState (false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let Option1 = useRef(null), Option2 = useRef(null), Option3 = useRef(null), Option4 = useRef(null);

    let optionArray = [Option1, Option2, Option3, Option4];

    const checkanswer = (e,answer) => {

        if (lock === false){

            if(question.answer===answer){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);

            }else{
                e.target.classList.add("wrong");
                setLock(true);
                optionArray[question.answer - 1].current.classList.add("correct")
            }
        }
    }

    const next = () => {

        if(lock=true){

            if(index === data.length - 1){
                setResult(true);
                return 0;
            }

            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            optionArray.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            });
        }
    }

    const reset = () => {

        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);

    }

    return(

        <div className="container">

            <h1>Quiz</h1>
            <hr />

            {result?<></>:<>

                <h2>{index + 1}. {question.question}</h2>

                <ul>
                    <li ref={Option1} onClick={(e)=>{checkanswer(e,1)}}>{question.option1}</li>
                    <li ref={Option2} onClick={(e)=>{checkanswer(e,2)}}>{question.option2}</li>
                    <li ref={Option3} onClick={(e)=>{checkanswer(e,3)}}>{question.option3}</li> 
                    <li ref={Option4} onClick={(e)=>{checkanswer(e,4)}}>{question.option4}</li> 
                </ul>

                <button onClick={next}>Next</button>

                <div className="coverage">{index + 1} of {data.length} Questions</div>

            </>}

            {result?<>
            
                <h2 className="score" >Score : {score} out of {data.length}</h2>
                <button onClick={reset}>Restart</button>

            </>:<></>}   
            
            
        </div>
    );
}

export default Content;