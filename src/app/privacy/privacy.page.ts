import { Component, OnInit } from '@angular/core';
import {EmailComposer} from '@awesome-cordova-plugins/email-composer/ngx';
import {FormBuilder, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})

/**
 * Privacy policy module.
 */
export class PrivacyPage implements OnInit {

  /**
   * Reference to the contact form group.
   */
  public contactForm;

  /**
   * Validation error messages displayed to the user.
   */
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

  /**
   * Whether a client is installed on the device.
   *
   * @type boolean
   */
  public hasClient = false;

  /**
   * Whether the user tried to send the mail
   *
   * @type boolean
   */
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

  /**
   * Checks the form data and sends email.
   *
   * @param subject -  subject of email
   * @param body - body of email
   */
  public async contact(subject: string, body: string){
    if(!this.contactForm.valid){
      return;
    }
    // tried sending mail
    this.clickedSendMail = true;

    // check for email client
    await this.checkClient();

    if(this.hasClient){
      const mail = {
        to: 'jangeicke@yahoo.de',
        subject: 'Histamine-Tracker Contact: '+subject,
        body
      };

      await this.email.open(mail);
    }
  }

  /**
   * Checks if an email client is installed on the device.
   *
   * @private
   */
  private async checkClient(){
    this.hasClient = await this.email.hasClient();
  }
}
