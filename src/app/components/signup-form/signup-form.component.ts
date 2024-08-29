import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import stateDistrictData from '../../../assets/states.json';
import { SignupdetailService } from '../../services/signupdetail.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

  stateData = stateDistrictData.states;
  cities:any;

  userForm = {
    userName:'',
    email:'',
    phoneNumber:'',
    password:'',
    confirmPassword:'',
    state:'',
    city:''
  }

  constructor(private userService: UsersService, private router: Router, private signUpService: SignupdetailService){

  }

  ngOnInit(){
    this.userService.getUsers().subscribe(res => {
      console.log('res', res);
    })
  }

  onStateChange(state:any){
    const stateData = this.stateData.find(item => item.state == state);
    this.cities = stateData?.districts;
  }


  submitForm(myForm:any){
    console.log(myForm);
    this.signUpService.saveDetails(this.userForm);
    this.router.navigate(['./signUpDetails'])
  }

}
