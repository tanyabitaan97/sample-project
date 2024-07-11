import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControlOptions, Validators } from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../confirm-equal-validator.directive';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  constructor(private settingsService:SettingsService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,) {}

  user:any;
  firstName:any;
  lastName:any;
  dob:any;

  isSettings:any=false;
  isChangePassword:any=false;

  resetPasswordForm = this.formBuilder.group({
    newPassword:['',Validators.required],
    confirmPassword:['',Validators.required]
  },{
    validator: ConfirmEqualValidatorDirective.MatchPassword('newPassword','confirmPassword'),
  } as FormControlOptions)


  ngOnInit(): void {

    this.isSettings=true;

    let emailId = this.route.snapshot.paramMap.get('emailId');

    this.settingsService.getProfiles().subscribe((x:any)=>{

      x.forEach((y:any)=>{
        if(y.email==emailId) {
            this.user=y;
            this.firstName=y.firstName;
            this.lastName=y.lastName;
            this.dob=y.dob;
            
        }
      });

    });
    
  }

  get f1() { return this.resetPasswordForm.controls; }

  resetPassword() {

    let emailId = this.route.snapshot.paramMap.get('emailId');
    let obj = {
      "emailId":emailId,
      "firstName":this.firstName,
      "lastName":this.lastName,
      "dob":this.dob,
      "password":this.resetPasswordForm.value.newPassword

    }
    this.settingsService.updateUserById(obj).subscribe((x:any)=>{
      console.log(x);
    })
  
  }

  settingsValue() {
    this.isSettings=true;
    this.isChangePassword=false;
  }

  changePasswordValue() {
    this.isChangePassword=true;
    this.isSettings=false;
  }

  updateUser() {
    let emailId = this.route.snapshot.paramMap.get('emailId');
    let obj = {
      "emailId":emailId,
      "firstName":this.firstName,
      "lastName":this.lastName,
      "dob":this.dob

    }
    this.settingsService.updateUserById(obj).subscribe((x:any)=>{
      console.log(x);
    })
  }

}
