import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent  {

  companyId:any;
  
  constructor(private route: ActivatedRoute,private router:Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const queryParams = new URLSearchParams(this.router.url.split('?')[1]);
        this.companyId = queryParams.get('company_id');
      }
    })
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.companyId = params['company_id']; // Get company_id from query parameters
    //   console.log(this.companyId,'ghs')
    // });
  }


}
