import { Component ,OnInit} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  
  categories=[
    {
      cid:7,
      title:'programming',
      description:'this testing category',
    },
    {
      cid:7,
      title:'C++',
      description:'this testing category',
    },
    {
      cid:7,
      title:'Java',
      description:'this testing category',
    },
    {
      cid:7,
      title:'Kotline',
      description:'this testing category',
    },
  ]


  constructor(private _category:CategoryService){}
  ngOnInit():void{
    this._category.categories().subscribe((data:any)=>{
      //css
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error","Loading Error","error");
    }
    );
  }
}
