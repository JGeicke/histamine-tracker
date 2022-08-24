import { Component, OnInit } from '@angular/core';
import {EmailComposer} from '@awesome-cordova-plugins/email-composer/ngx';
import {FormBuilder, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  public contactForm;

  validationMessages = {
    subject: [
      { type: 'required', message: this.translateService.instant('PRIVACY.contact-form-validation-subject-required')},
      {type: 'pattern', message: this.translateService.instant('PRIVACY.contact-form-validation-subject-pattern')},
      {type:'minlength', message: this.translateService.instant('PRIVACY.contact-form-validation-subject-minlength')}
    ],
    content: [
      {type: 'required', message: this.translateService.instant('PRIVACY.contact-form-validation-content-required')}
    ]
  };

  public hasAccount = false;
  public hasClient = false;
  public clickedSendMail = false;

  constructor(private email: EmailComposer, public formBuilder: FormBuilder, private translateService: TranslateService) { }

  ngOnInit() {
    // form check
    this.contactForm = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+'), Validators.minLength(2)]],
      content: ['', [Validators.required]]
    });

    this.clickedSendMail = false;
  }

  public async contact(subject: string, body: string){
    if(!this.contactForm.valid){
      return;
    }
    // tried sending mail
    this.clickedSendMail = true;

    // check for client
    await this.checkClient();

    // check for account
    await this.checkAccount();

    if(this.hasAccount && this.hasClient){
      const mail = {
        to: 'jangeicke@yahoo.de',
        subject: 'Histamine-Tracker Contact: '+subject,
        body
      };

      await this.email.open(mail);
    }
  }

  private async checkAccount(){
    this.hasAccount = await this.email.hasAccount();
  }

  private async checkClient(){
    this.hasClient = await this.email.hasClient();
  }
}
