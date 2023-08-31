import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  categories;
  constructor(
    private _cat:CategoryService,
    // private _snack:MatSnackBar
  ){}
  ngOnInit(): void {
      this._cat.categories().subscribe(
        (data:any)=>{
          this.categories=data;
        },
        (error)=>{
          Swal.fire('Error','Error in loading Categories from Server','error');
        });
  }

}
