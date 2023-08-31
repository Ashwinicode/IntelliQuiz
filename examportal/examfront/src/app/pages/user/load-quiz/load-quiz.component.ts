import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService
  ){}
  ngOnInit(): void {
      

      this._route.params.subscribe((params)=>{
        this.catId=params['catId'];
       
        if(this.catId==0){
          console.log('Load all the quizzes');
          this._quiz.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data;
            },
            (error)=>{
              Swal.fire('Error','Error in loading quizzes','error');
              console.log(error);
              
            }
          );
  
        }
        else{
          console.log('Load specific quiz');
          // this.quizzes=[];
          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
            (data:any)=>{
              console.log(data);
              
              this.quizzes=data;
            },(error)=>{
              console.log(error);
              
            });
          
        }
      });
      // console.log(this.catId);
      
  }
}
