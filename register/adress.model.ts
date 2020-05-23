import {prop } from "@rxweb/reactive-form-validators"

export class Address{
   _isSameAddress:boolean

  @prop()
  address:string;

  @prop()
  city:string;

  @prop()
  zip:string;

  @prop()
  state:string;
  
  @prop()
  permanentAddress:string;

  @prop()
  permanentCity:string;

  @prop()
  permanentZip:string;

  @prop()
  permanentState:string;

  @prop()
  set isSameAddress(value:boolean){
    this._isSameAddress = value;
    if(value)
    {
      this.permanentCity = this.city;
      this.permanentAddress = this.address;
      this.permanentZip = this.zip;
      this.permanentState = this.state;
    }else {
      this.permanentCity = ''
      this.permanentAddress = ''
      this.permanentZip = ''
      this.permanentState = '';

    }
  }
  
  get isSameAddress(){
        console.log('test')
    return this._isSameAddress;
  }
}
