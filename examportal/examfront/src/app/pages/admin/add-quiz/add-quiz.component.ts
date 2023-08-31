import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    },

  };
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService){}
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        //categories data load
        this.categories=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error in loading data form server','error');
      }
    )
  }
  //
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this._snack.open("Title required !",'',{
        duration:3000,
      });
      return;
    }
    //validation

    if(this.quizData.description.trim()=='' || this.quizData.description==null){
      this._snack.open("Description required !",'',{
        duration:3000,
      });
      return;
    }
    // if(this.quizData.maxMarks.trim()=='' || this.quizData.maxMarks==null){
    //   this._snack.open("Max Marks required !",'',{
    //     duration:3000,
    //   });
    // return;
    // }
    // if(this.quizData.numberOfQuestion.trim()=='' || this.quizData.numberOfQuestion==null){
    //   this._snack.open("Number Of Question required !",'',{
    //     duration:3000,
    //   });
    //   return;
    // }

    
    //call server to add quiz
    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz added Successfully!','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:''
          },
        };
      }),
      (error)=>{
        Swal.fire('Error','Error while adding the Quiz!','error');
        console.log(error);
      }
  }
}