import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '../_services';

@Component({ templateUrl: 'register.component.html',
styleUrls: ['register.component.css']})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
          
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            isSameAddress:[false],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthDay: ['', Validators.required],
            middleName: [''],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            permanentAddress: [''],
            permanentCity: [''],
            permanentZip: [''],
            permanentState: [''],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
            checked(value:boolean){
                if(value){
                  this.registerForm.controls.permanentAddress.setValue(this.registerForm.value.address);
                  this.registerForm.controls.permanentCity.setValue(this.registerForm.value.city)
                  this.registerForm.controls.permanentZip.setValue(this.registerForm.value.zip)
                  this.registerForm.controls.permanentState.setValue(this.registerForm.value.state)
                }else{
                  this.registerForm.controls.permanentAddress.setValue(undefined);
                  this.registerForm.controls.permanentCity.setValue(undefined)
                  this.registerForm.controls.permanentZip.setValue(undefined)
                  this.registerForm.controls.permanentState.setValue(undefined)
                }
              }
            
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();


        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

            }
}