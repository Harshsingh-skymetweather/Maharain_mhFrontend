import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-claimpayout',
  templateUrl: './claimpayout.component.html',
  styleUrls: ['./claimpayout.component.scss']
})
export class ClaimpayoutComponent implements OnInit {

  constructor(private http: HttpClient) { }

  iframeContent: string='';

  ngOnInit(): void {

    this.http.get('http://weathermine.skymetweather.com/weathermine/Pricing/ARMSPayout.aspx', { responseType: 'text' })
      .subscribe(content => {
        this.iframeContent = content;
      });

  }

}
