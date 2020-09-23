import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export interface CaptchaResponse {
	captcha_key: string;
	captcha_image: string;
	image_type: string;
	image_decode: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'captcha';
  formData ={
    name : '',
    comment : '',
    captcha_key : '',
    captcha_value : '',
  }

  constructor(private http: HttpClient) { }

  response : CaptchaResponse;

  captchaSubmitted : boolean;
  ngOnInit() {
    this.http.post('http://127.0.0.1:8000/api/captcha/',{}).subscribe((next:CaptchaResponse) => {
      this.response = next;
      this.formData.captcha_key = next.captcha_key;
    });
  }

  postData(form:FormGroup) {
    console.log(form.value);
    this.http.post('http://127.0.0.1:8000/api/home/comment',form.value).subscribe((next:{submitted:boolean}) => {
      this.captchaSubmitted = next.submitted;
    });
  }

}
