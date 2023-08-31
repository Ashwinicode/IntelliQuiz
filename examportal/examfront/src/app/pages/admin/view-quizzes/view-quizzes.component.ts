import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [
    {
      qId: 23,
      title: 'Basic of java',
      description: 'This contains the basic questions based on Java',
      maxMarks: '100',
      active: '',
      category:
      {
        title: 'Programming'
      },
      numberOfQuestions: '20',
    },
    {
      qId: 23,
      title: 'Basic of java',
      description: 'This contains the basic questions based on Java',
      maxMarks: '100',
      active: '',
      category:
      {
        title: 'Programming'
      },
    }

  ]
  constructor(private _quiz: QuizService) { }
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data !', 'error');
      }
    );
  }

  //deleting the quiz
  deleteQuiz(qId) {
    // alert(qId);
    Swal.fire({
      icon:'info',
      title:'Are you sure to delete this Quiz ?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId)
            Swal.fire('Success', 'Quiz Deleted Successfully!', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error in deleting Quiz', 'error');
          }
        );
      }
    });
  }
}
