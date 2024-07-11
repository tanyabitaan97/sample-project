import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlOptions, Validators } from '@angular/forms';
import { RegisterService } from './registerpage.service';
import { ConfirmEqualValidatorDirective } from '../confirm-equal-validator.directive';
import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit{

  isRegister:boolean=false;
  isLogin:boolean=false;
  isForgotPassword:boolean=false;
  isReset:boolean=false;

  registerUserList:any[]=[];

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]

});

loginForm = this.formBuilder.group({
  email: ['', Validators.required],
  password:['',Validators.required]

});

forgotPasswordForm = this.formBuilder.group({
  email: ['', Validators.required],
  dob:['',Validators.required]

});

resetPasswordForm = this.formBuilder.group({
  newPassword:['',Validators.required],
  confirmPassword:['',Validators.required]
},{
  validator: ConfirmEqualValidatorDirective.MatchPassword('newPassword','confirmPassword'),
} as FormControlOptions)
 
  constructor(private formBuilder: FormBuilder,
    private registerService:RegisterService,
  private authenticationService:AuthenticationService,
private router:Router,
private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.isRegister=true;
  }

  get f() { return this.registerForm.controls; }

  get f1() { return this.resetPasswordForm.controls; }

  onSubmit() {

    let user = this.registerForm.value;
    if (this.registerUserList.length>0 && this.registerUserList.find((x:any) => x.email == user.email)) {  //search for user in localstorage on usernmae
     window.alert('username already taken');
  }

    this.registerService.registerUser(user).subscribe((x:any)=>{
        console.log(x);
        this.registerUserList.push(user);
        window.alert('Registration is successful');
    });

  }

  register() {
    this.isRegister=true;
    this.isLogin=false;
    this.onSubmit();
  }


  loginSet() {
    this.isLogin=true;
    this.isRegister=false;
    this.isForgotPassword=false;
    this.isReset=false;
  }

  registerSet() {
    this.isLogin=false;
    this.isRegister=true;
    this.isForgotPassword=false;
    this.isReset=false;
  }

  forgotPassword() {
    this.isLogin=false;
    this.isRegister=false;
    this.isForgotPassword=true;

    this.registerUserList.forEach((x:any)=>{
      console.log('forgot is '+JSON.stringify(x));
      console.log(this.forgotPasswordForm.value);
      if(x.email==this.forgotPasswordForm.value.email &&
         x.dob==this.forgotPasswordForm.value.dob) {
            this.isReset=true;
            this.isForgotPassword=false;
      }
    })
  }

  forgotPasswordValue() {
    this.isLogin=false;
    this.isRegister=false;
    this.isForgotPassword=true;
    this.isReset=false;
  }

  resetPassword() {
    this.registerUserList.forEach((x:any)=>{
      if(x.email==this.forgotPasswordForm.value.email &&
         x.dob==this.forgotPasswordForm.value.dob) {
            x.password=this.resetPasswordForm.value.newPassword;
            console.log('after reset value is '+JSON.stringify(this.registerUserList));
      }
    })
  }

  login() {
    this.isLogin=true;
    this.isRegister=false;
    let user = this.loginForm.value;

    this.authenticationService.login(user.email,user.password).subscribe((x:any)=>{
      window.alert('Login is successful');
      this.router.navigate(["home",user.email]);
    });

  }

}
