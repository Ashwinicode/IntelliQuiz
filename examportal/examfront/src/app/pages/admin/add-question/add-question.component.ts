import { Component ,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit{

  public Editor = ClassicEditor;

  qId;
  qTitle;
  question={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    // quesId:'',

  }
  constructor(
    private  _route:ActivatedRoute,
    private _question:QuestionService
  ){}
  ngOnInit(): void {
      this.qId=this._route.snapshot.params['qid'];
      // console.log(this.qId);
      this.question.quiz['qId']=this.qId;
      this.qTitle=this._route.snapshot.params['title']
      
  }

  formSubmit(){
    // alert('testing')
    if(this.question.content.trim()=='' || this.question.content==null)
    {
      Swal.fire('Content required!','Write the content of Question','info');
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null||this.question.option2.trim()=='' || this.question.option2==null)
    {
      Swal.fire('Options Required!','Give atleast Two Options','info');
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null)
    {
      Swal.fire('Answer Required!','Select the Answer','info');
      return;
    }

    //from submit
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question Added Successfully!','success');
        this.question.content=''
        this.question.option1=''
        this.question.option2=''
        this.question.option3=''
        this.question.option4=''
        this.question.answer=''
      },
      (error)=>{
        Swal.fire('Error','Error in adding Question','error');
      }
    )

  }

}
