import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = ['Mounthly', 'Quarterly', 'Yearly'];
  public genders: string[] = ['Male', 'Female'];
  public trainer: string[] = ['Yes', 'No'];
  public importantList: string[] = [
    'Toxic Fat Reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];

  public registerForm!: FormGroup;
  public userIdTOUpdate !:number;
  public isUpdateActive:boolean=false;

  constructor(private fb: FormBuilder,
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private api:ApiService,
    private toastrService:NgToastService) {}
  ngOnInit(): void {
    this.createForm();

    this.registerForm.controls['height'].valueChanges.subscribe(res=>{
      this.calculateBmi(res);
    })

    this.activatedRoute.params.subscribe(val=>{
      this.userIdTOUpdate=val['id'];
      this.api.getRegisteredUserId(this.userIdTOUpdate)
      .subscribe(res=>{
        this.isUpdateActive=true;
        this.fillFormToUpdate(res);
      })
    })
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      trainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: ['']
    });
  }

  submit() {
    this.api.postRegistration(this.registerForm.value)
    .subscribe(res=>{
      this.toastrService.success({detail:"Success",summary:"Enquiry Added",duration:3000});
      this.registerForm.reset();
    })
  }

  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;
      case bmi >= 25 && bmi < 30:
        this.registerForm.controls['bmiResult'].patchValue('Overweight');
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }

  fillFormToUpdate(user:User){
    this.registerForm.setValue({
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      mobile:user.mobile,
      weight:user.weight,
      height:user.height,
      bmi:user.bmi,
      bmiResult:user.bmiResult,
      gender:user.gender,
      trainer:user.trainer,
      package:user.package,
      important:user.important,
      haveGymBefore:user.haveGymBefore,
      enquiryDate:user.enquiryDate
    })
  }

  update(){
    this.api.updateRegisterUser(this.registerForm.value,this.userIdTOUpdate)
    .subscribe(res=>{
      this.toastrService.success({detail:"Success",summary:"Enquiry Updated",duration:3000});
      this.registerForm.reset();
      this.route.navigate(['list'])
    })
  }
}
