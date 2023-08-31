import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions = [
    {
      quesId:12,
      option1:'sdfs',
      option2:'qwq',
      option3:'asdad',
      option4:'xcvx',
      answer:"qwq",
      content:'dasfasas',
      
    }
  ];
  

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private snack: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // console.log(this.qId);
    // console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  //delete question
  public deleteQuestion(qid): void {
    // alert(qid);
    console.log(qid);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure to Delete the Question?'
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          (data)=>{
            Swal.fire('Success!','Question Deleted Successfully!','success');
            this.questions=this.questions.filter((q)=>{q.quesId!=qid;});
          },
          (error)=>{
            Swal.fire('Error!','Error in deleting Question!','error');
            console.log(error);
          });
      }
    });
  }

}

