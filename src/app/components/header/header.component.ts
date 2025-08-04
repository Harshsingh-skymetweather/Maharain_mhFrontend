import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }
user:any;
  ngOnInit(): void {
   this.user = localStorage.getItem('Maharain-user')

  }
  logout(){
    this.route.navigate(['']).then(() => {
      localStorage.removeItem('Maharain-Token')
      localStorage.removeItem('Maharain-user');
    })
    }

    menuToggle() {

    }
}
