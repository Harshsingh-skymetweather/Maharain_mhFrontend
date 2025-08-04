import { Component ,OnInit, ViewEncapsulation} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})


export class AppComponent implements OnInit {
  title = 'maharain';
  login: boolean | undefined;

  constructor ( private router: Router){}
  ngOnInit(): void {

  this.router.events.subscribe((event: any) => {
    if (event instanceof NavigationEnd) {
      if (event.url === '/') {
        this.login= true;
      } else {
        this.login= false;
      }
    }
  });
  }


}
