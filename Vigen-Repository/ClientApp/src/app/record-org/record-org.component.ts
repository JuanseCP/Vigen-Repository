import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import {latlong} from '../map/map.component';
import { OrganizationService } from '../api/services';
import { Organization, User } from '../api/models';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-record-org',
  templateUrl: './record-org.component.html',
  styleUrls: ['./record-org.component.css']
})
export class RecordOrgComponent implements OnInit {

  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  showEmoji: boolean = false;
  title = 'test 1';
  contentEmoji = '';
  listData: Data[] = [];
  form: FormGroup = new FormGroup({});
  isCheck: any;
  /*constructor(private fb : FormBuilder) { }*/

  showContra() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Las contraseñas no coinciden',
      showConfirmButton: false,
      timer: 2000
    })
  }
  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Faltan algunos campos obligatorios por llenar',
      showConfirmButton: false,
      timer: 2000
    })
  }

  public organization: Organization = {
    name: "",
    nit: "",
    tel: "",
    password: "",
  };
  contra={
    pass : ""
  }

  constructor(private api:OrganizationService) { }

  ngOnInit(): void {
    /*this.form = this.fb.group({
      nomOrg: ['', [Validators.required]],
      nitOrg: ['', [Validators.required]],
      ubiOrg: ['', [Validators.required]],
      telOrg: ['', [Validators.required]],
    })*/
  }
  sendLogin():void{
    this.isCheck = { user:1 }
    console.error(latlong);
  }
  public send(){
    if (this.organization.name === "" || this.organization.nit === ""
    || this.organization.tel === "") 
    {
      this.showModal();
    }else{
      if(this.organization.password==this.contra.pass){
        this.api.apiOrganizationPost$Json({body: this.organization})
        .subscribe(res=>{
      //console.log(res);
     });
      }
      else{
        this.showContra();
      }
    
    }
  }
}
