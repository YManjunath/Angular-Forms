import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupdetailService {

  public signUpDetails = new BehaviorSubject<any>(null);
  public signUpData = this.signUpDetails.asObservable();

  constructor() { }

  saveDetails(data: any){
    this.signUpDetails.next(data);
  }

}
