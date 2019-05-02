import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GrillerService } from "../griller.service";
import { UserService } from "../_services/user.service";
import * as $ from 'jquery'
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';



@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  private userForm:FormGroup
  private updateForm:FormGroup
  private user:any
  public errorMessage:string
  private isSaved:boolean
  private users:any
  private grillers:any[]
  public grillerFile:any=File;
  grill:any
  rentedGrills:any
  byType
  angular: any;
  id:any
  private delConfirm:boolean;
  owner;
  id1
  private renter:any

  constructor(private builder:FormBuilder,private service:GrillerService,private router : Router,
    private httpClient:HttpClient,private authenticationService:AuthenticationService,
    private userService:UserService) { 
    this.buildForm()
  }

  ngOnInit() {
    
    this.currentUserDetails();
   
   
       
  }

  buildForm() {
    this.userForm = this.builder.group({
      grillName: ['',Validators.required],

      grillerType: ['',Validators.required],
      location: ['',Validators.required],
      grillerDescriptions: ['',Validators.required],
      price: ['',Validators.required],
      //grillImage:['',Validators.required],
      grillImage: ['']

    }),
    this.updateForm = this.builder.group({
      grillName: ['',Validators.required],

      grillerType: ['',Validators.required],
      location: ['',Validators.required],
      grillerDescriptions: ['',Validators.required],
      price: ['',Validators.required],
      //grillImage:['',Validators.required],
      grillImage: ['']

    })
  }
  onFileSelect(event) {
   if (event.target.files.length > 0) {
     const file = event.target.files[0];
     this.userForm.get('grillImage').setValue(file);
   }
 }

  save(){
   const formData = new FormData();
   formData.append('file', this.userForm.get('grillImage').value);
   formData.append('grillName',this.userForm.get('grillName').value)
   formData.append('grillerType',this.userForm.get('grillerType').value)
   formData.append('price',this.userForm.get('price').value)
   formData.append('location',this.userForm.get('location').value)
    formData.append('grillerDescriptions',this.userForm.get('grillerDescriptions').value)
    formData.append('ownerId',this.users.id)

   this.httpClient.post<any>('http://localhost:8080/grillAnywhere/griller', formData).subscribe(
     (res) => console.log(res),
     (err) => console.log(err)
   );
    console.log(this.userForm.status)
    if(this.userForm.status !='INVALID'){
   
      this.service.buildAndCreateUser({
        grillName:this.user.grillName,
        grillerType:this.user.grillerType,
        location:this.user.location,
        grillerDescriptions:this.user.grillerDescriptions,
        price:this.user.price,
       image:this.user.image
      },(err)=>{
        if(err! =null){
          console.log('Unable to Process request')

        }else{
          window.location.reload();
          this.onloadFun()

          this.userForm.reset();
          this.errorMessage = 'Grill Added Succesfully'


        }
      })

    }else{
      this.errorMessage = 'Please verify your errors'
    }
  }
  updateGriller(id){
    console.log("hello"+id)
    const formData = new FormData();
    formData.append('file', this.userForm.get('grillImage').value);
    formData.append('grillName',this.userForm.get('grillName').value)
    formData.append('grillerType',this.userForm.get('grillerType').value)
    formData.append('price',this.userForm.get('price').value)
    formData.append('location',this.userForm.get('location').value)
     formData.append('grillerDescriptions',this.userForm.get('grillerDescriptions').value)
     formData.append('ownerId',this.grill.ownerId)
 
    this.httpClient.put<any>('http://localhost:8080/grillAnywhere/griller/'+id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
      
    );
    
    console.log("dfsfsfs");
   window.location.reload()
    
  }
  

 
currentUserDetails(){
this.service.getUserName(response=>{
this.users=response
console.log(this.users)
console.log(this.users.id)
this.id=this.users.id
this.onloadFun()
})

  }



  storeId(grillId){
   this.service.getGrillById(grillId,data=>{
    this.grill=data
    this.id1=this.grill.id
    console.log(data)
    });
  }

  delete(grillId){
    this.delConfirm=confirm("Are You Sure Want to Delete This .... ?");

    if(this.delConfirm==true){
      this.service.deleteUser(grillId,data=>{
      this.onloadFun()
      })
  }
  }

  updateFlag(grillId){
    
    this.delConfirm=confirm("Are You Sure this griller is returned .... ?");

    if(this.delConfirm==true){
    
      this.service.updateFlag(grillId,data=>{
      this.onloadFun()
      window.location.reload();
     
  })
}
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['./'])
  }

  onloadFun(){
  
    this.service.getUser(this.id,success=>{
      this.grillers=success;
    });
    this.grill="";
   
    this.rent();
  }
  
rent(){
  this.service.getUserByFlag(this.id,data=>{
    this.rentedGrills=data;
    console.log(this.rentedGrills)
  })

}

  filterOwnerSection(event){
    this.byType=event;
    this.user={
      grillerType:this.byType
      }
      
      if(event==""){
        console.log("checkkkk")
        this.grillers.values=null
        this.onloadFun()
       
      }else{
        this.service.findAutomatic(this.id,this.byType,success=>{
          this.grillers=success;
        });
      }
  }
  dropDownFilter(event){
    console.log("in dropDown: "+event);
    if(event!='Choose City'){
      this.user={
        location:event
        }
        
        if(1){
          
         this.service.findLocation(this.id,event,success=>{
           this.grillers=success;
         });
    }
    }
    else{
      this.service.getUser(this.id,success=>{
        this.grillers=success;
        console.log("in home "+this.grillers);
   });
    
    }
    
}




  byType1(event){
    this.byType=event;
    if(event!='Choose type'){
  
    
    if(1){
      
     this.service.findAutomatic(this.id,this.byType,success=>{
       this.grillers=success;
     });
    
    }
  }
  else{
    this.service.getUser(this.id,success=>{
      this.grillers=success;
      console.log("in home "+this.grillers);
 });
  
  }
  }

 

  toggleAllGriller(){
    document.location.reload();
  }

  toggleAllProduct(){
    

    this.renter=sessionStorage.getItem('renter');
    this.user={
      grillerType:this.renter
      }
      
      if(1){
        
       this.service.findGrillerByRenter(this.user,success1=>{
         this.grillers=success1;
         console.log(this.grillers);
       });
      }
  }
  
  
 
  
}