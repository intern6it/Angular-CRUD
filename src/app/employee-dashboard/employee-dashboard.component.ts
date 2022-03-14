import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { EmployeeModel } from './employee-dash board.model';
import { ApiService } from '../shared/api.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
  
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  model: NgbDateStruct;
  employeeModel: EmployeeModel = new EmployeeModel();
  employeeModelObj: EmployeeModel = new EmployeeModel()
  employeeData : any;


  constructor(private formBuilder: FormBuilder, private api: ApiService ) {}
  showDate(event:any){
    console.log(event.value)
  }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      lastName: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['',[Validators.required]],
      salary: ['',[Validators.required]],
      gender: [''],
      date :[''],
      standard:['']

    })
    this.getAllEmployee();
  }
  


  postEmployeeDetails() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.mobile = this.formValue.value.mobile;
    this.employeeModel.salary = this.formValue.value.salary;
    this.employeeModel.gender = this.formValue.value.gender;
    this.employeeModel.date = this.formValue.value.date;
    this.employeeModel.standard = this.formValue.value.standard;
console.log(this.formValue.value.date)

    this.api.postEmployee(this.employeeModel).subscribe(res => {
      console.log(res);
     
      let ref = document.getElementById('cancel') 
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      alert("Employee Added Successfully");
    })

  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['standard'].setValue(row.standard);
  //  this.formValue.controls['date'].setValue(row.date);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.date = this.formValue.value.date;
    this.employeeModelObj.standard = this.formValue.value.standard;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res => {
     
      let ref = document.getElementById('cancel')
     
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      alert("Updated Successfully");
    })
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

