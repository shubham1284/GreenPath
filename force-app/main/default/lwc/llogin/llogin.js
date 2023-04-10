import { LightningElement,track } from 'lwc';
import createpartner from '@salesforce/apex/selfregapex.createpartner';
export default class Ilogin extends LightningElement {
    @track firstName=undefined; 
    @track Email=undefined;
    @track Lastname=undefined;
    
   
    handleClick(event)
    {
      console.log('error');
      
      createpartner({fname:this.firstName,lname:this.Lastname,email:this.Email})
      .then(result => {
        console.log(result);
        if(result=='Contact with email is not found')
        {
          this.template.querySelector('c-common-toast').showToast('error',result,'utility:warning',10000);
        }
        
      
      else if(result=='User already exists try login with password')
      {
        this.template.querySelector('c-common-toast').showToast('error',result,'utility:warning',10000);
      }
    else if(result=='Profile with Name Partner Community not exist')
    {
      this.template.querySelector('c-common-toast').showToast('error',result,'utility:warning',10000);
    }
     else 
     {
      this.template.querySelector('c-common-toast').showToast('success','Detail matched and email will be sent with credential soon','utility:success',10000);
    }
  })
      .catch(error => {
        this.template.querySelector('c-common-toast').showToast('error',error.message,'utility:warning',10000)
      });
    }
    updateEmpId(event)
    {
      this.firstName=event.target.value;
      console.log(this.firstName);

    } 
    updateEmail(event)
    {
      this.Email=event.target.value;
      console.log(this.Email);
      
    } 
    updateNum(event)
    {
        this.Lastname=event.target.value;
    }
}