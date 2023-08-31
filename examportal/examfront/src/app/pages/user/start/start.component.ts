// import { LocationStrategy } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { QuestionService } from 'src/app/services/question.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-start',
//   templateUrl: './start.component.html',
//   styleUrls: ['./start.component.css']
// })
// export class StartComponent implements OnInit {
//   qid;
//   questions;


//   marksGot = 0;
//   correctAnswers = 0;
//   attempted = 0;

//   isSubmitted = false;

//   timer: any;

//   constructor(
//     private locationSt: LocationStrategy,
//     private _route: ActivatedRoute,
//     private _question: QuestionService,

//   ) { }
//   ngOnInit(): void {
//     this.preventBackButton();
//     this.qid = this._route.snapshot.params['qid'];
//     console.log(this.qid);
//     this.loadQuestions();

//   }
//   loadQuestions() {
//     this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
//       (data: any) => {
//         // console.log(data);
//         this.questions = data;
//         // this.timer=this.questions.length*2*60;
//         this.questions.forEach((q)=> {
//           q['givenAsnwer'] = '';

//         });
//         console.log(this.questions);


//       },
//       (error) => {
//         console.log(error);
//         Swal.fire('Error', 'Error in loading questions', 'error');

//       }
//     );
//   }

//   //preventing from going back when he quiz has been started
//   preventBackButton() {
//     history.pushState(null, null, location.href);
//     this.locationSt.onPopState(() => {
//       history.pushState(null, null, location.href);
//     });
//   }


//   submitQuiz() {
//     Swal.fire({
//       title: 'Do you want to submit the Quiz?',
//       showCancelButton: true,
//       confirmButtonText: 'Submit',
//       denyButtonText: "Don't save",
//       icon: 'info'
//     }).then((e) => {
//       if (e.isConfirmed) {
//         //calculation of marks
//         this.questions.forEach((q) => {
//           if (q.givenAsnwer == q.answer) {
//             this.correctAnswers++;
//             let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
//             this.marksGot += marksSingle;
//           }
//           console.log(this.correctAnswers);
//           console.log(this.marksGot);


//         })
//       }
//     })
//   }

// }
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private _rout: ActivatedRoute,
    private _locationSta: LocationStrategy,
    private _questions: QuestionService) { }

  qid = 0;
  question;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  len = 0;

  isSubmit = false;
  timer: any;
  ngOnInit(): void {

    this.qid = this._rout.snapshot.params['qid'];
    this.blockBackButton();
    this.loadQuestions();

  }

  /**
   * loadQuestions
   */
  public loadQuestions() {
    this._questions.getQuestionsOfQuizForTest(this.qid).subscribe((data) => {

      this.question = data;
      console.log(data);
      // this.len=this.question.length;
      //time calculate
      this.timer = this.question.length * 2 * 60;
      this.startTimer();

    },
      (error) => {
        console.log(error)
      })

  }

  blockBackButton() {
    history.pushState(null, '', location.href);

    this._locationSta.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit ?',
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    });

  }





  // calculateSubmitForBackend() {
  //   this._questions.submitExam(this.question).subscribe(
  //     (data: any) => {
  //       console.log(data);

  //       this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
  //       this.correctAnswer = data.correctAnswers;
  //       this.attempted = data.attempted;
  //       this.isSubmit = true;
  //     },
  //     (error) => {
  //       console.log(error)
  //     }
  //   )
  // }

  // calculateSubmitForFrontEnd() {
  //   this.isSubmit = true;
  //   this.question.forEach((q: any) => {
  //     if (q.givenAnswer == q.answer) {
  //       this.correctAnswer++;
  //       let marksCurrent = this.question[0].quiz.maxMax / this.question.length;
  //       this.marksGot += marksCurrent;
  //     }

  //     if (q.givenAnswer.trim() != '') {
  //       this.attempted++;
  //     }
  //   });
  // }







  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        // this.submitQuiz();
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }


  getFormatedTime() {
    let m = Math.floor(this.timer / 60);

    let s = this.timer - m * 60;
    return `${m} min : ${s} sec.`
  }


  public evalQuiz() {

    //call server to check questions
    // 
    this._questions.evalQuiz(this.question).subscribe((data:any) => {
      console.log(data);
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer=data.correctAnswers;
      this.attempted=data.attempted;
      this.isSubmit = true;

    },
      (error) => {
        console.log(error);

      });

    // this.calculateSubmitForBackend();
    // console.log(this.question);
    //         this.isSubmit=true;
    //         this.question.forEach((q: any) => {
    //           if (q.givenAnswer == q.answer) {
    //             this.correctAnswer++;
    //             let marksCurrent = this.question[0].quiz.maxMarks / this.question.length;
    //             this.marksGot += marksCurrent;
    //           }
    //           if(q.givenAnswer.trim()!=''){
    //             this.attempted++;

    //           } 
    //           console.log(this.attempted);

    //           console.log("Correct Answers:"+this.correctAnswer);
    //           console.log("Marks Got:"+this.marksGot);
    //           //console.log(typeof(this.marksGot));
    // });
  }

  printPage() {
    window.print();
  }
}