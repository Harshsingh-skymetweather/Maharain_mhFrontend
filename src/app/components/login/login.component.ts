import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  form: any = UntypedFormGroup;
  formval: any;
  log: any;
  constructor(private FormBuilder: UntypedFormBuilder, private service: CommonService, private route: Router) {

  }

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      Username: new UntypedFormControl(null, [Validators.minLength(5), Validators.required]),
      Password: new UntypedFormControl()
    })

  }
  submit() {
    this.service.login(this.form.value).subscribe(res => {
      if (res.Status_Code = 200) {
        var token = res.token;
        var user = this.form.value.Username;
        this.setToken(token).then(() => {
          this.route.navigate(['/home']);
        })
        this.setuser(user)
      }

    })

  }
  async setToken(token: any) {
    return new Promise((resolve: any, reject: any) => {
      resolve(localStorage.setItem('Maharain-Token', token))
    })
  }

  async setuser(user: any) {
    return new Promise((resolve: any, reject: any) => {
      resolve(localStorage.setItem('Maharain-user', user))
    })
  }

  
}
