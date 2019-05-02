import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GrillerService } from "../griller.service";
import { ActivatedRoute,Router, RouterLink } from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service"

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private userForm:FormGroup
  private user:any
  public errorMessage:string
  private isSaved:boolean
  private users:any[]
  grillId
  renter
  price
  private totalAmount
  private showAmount:boolean
  msg;
  showSuccess;
  userOwner;
   ownerdata;
   data;
   ownerDetails;

  constructor(private builder:FormBuilder,private service:GrillerService,private router : Router,private authenticationService:AuthenticationService ) {
    this.buildForm()
   }

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

    this.msg=sessionStorage.getItem('renter');
    this.ownerdata=sessionStorage.getItem('ownerId');
    this.getOwnerDetails()
  }


  buildForm() {
    this.userForm = this.builder.group({
      name: ['',Validators.required],
      
      address: ['',Validators.required],
      phn_no: ['',Validators.required]
      
    })
  }
 
  save(){
    //this.submitted = true;
    console.log(this.userForm)
    if(this.userForm.status !='INVALID'){
      //alert(JSON.stringify(this.userForm.value))
      this.grillId=sessionStorage.getItem('grillId');
      this.renter=sessionStorage.getItem('renter');

      this.user={
        grillId:this.grillId,
        renter:this.renter,
        name: this.userForm.controls['name'].value,
        
        address: this.userForm.controls['address'].value,
        phn_no: this.userForm.controls['phn_no'].value,
        amount: this.totalAmount
        
      }
      // Add a new User 
      this.service.buildAndCreatePurchase({ 
        name:this.user.name,
        grillId:this.grillId,
        renter:this.renter,
        address:this.user.address,
        phn_no:this.user.phn_no,
        amount:this.totalAmount
        
      },(err)=>{
        if(err! =null){
          console.log('Unable to Process request')
         
        }else{
       // this.userForm.reset();
       this.user={
        grillId:this.grillId
        }

       this.service.fetchOwner(this.user,success=>{
        this.userOwner=success;
        console.log(this.userOwner)
      });
        // alert("Payments success.  Griller Rent Successfully");
       
        // this.showSuccess=false;
        // this.showSuccess=!this.showSuccess;
        //   console.log("success"+this.showSuccess);
        // this.router.navigate(['./renter-dashboard']);
        }
      })
      
    }else{
      this.errorMessage = 'Please verify your errors'
    }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['./']);
  }

  periodDropDown(event){
    console.log(event);
    this.price=sessionStorage.getItem('grillerPrice');
    this.totalAmount=0;
    this.totalAmount=this.price*event;
    console.log(this.totalAmount);

    this.showAmount=false;
    this.showAmount=!this.showAmount;
  }

  getOwnerDetails(){
  this.service.getOwnerDetails(this.ownerdata,result=>{
this.data=result;
console.log("Hello"+this.data);
  })

  }

  showOwner(){
    this.getOwnerDetails()
    console.log("in showOwner");
    this.ownerDetails=false;
    this.ownerDetails=!this.ownerDetails;
   this.save()
   
  }


}
