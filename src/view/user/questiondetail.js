import React from 'react';
import NavBar from './../../components/NavBar/NavBar';
import Question1 from './questions/question1';
import Question2 from './questions/question2';
import Question3 from './questions/question3';
import Question4 from './questions/question4';
import Question5 from './questions/question5';
import Question6 from './questions/question6';
export default function (props) {
    let {location:{search}}=props;
    let id=search.substr(4);
    let Question;
    if(id==='1'){
        Question=Question1;
    }else if(id==='2'){
        Question=Question2;
    }else if(id==='3'){
        Question=Question3;
    }else if(id==='4'){
        Question=Question4;
    }else if(id==='5'){
        Question=Question5;
    }else if(id==='6'){
        Question=Question6;
    }
    return(
        <NavBar title={'常见问题'}>
            <div className={'article'}>
                <Question/>
            </div>
        </NavBar>
    )
}
