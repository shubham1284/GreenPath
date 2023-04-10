import { LightningElement , wire, track  } from 'lwc';
import internalUserDetails from '@salesforce/apex/CommunityHomePageLWC.internalUserDetails';
import IntroImg from "@salesforce/resourceUrl/intro_content_image";
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import AccountId from '@salesforce/schema/User.AccountId';

export default class InternalUserDetails extends LightningElement {
    intro_img=IntroImg;
    userId = Id;
    accountid;

    userDetails=''
    internaluserCoImage
    internalCousername
    internalCouserTitle
    internalCouserCompanyName
    internalCouserEmail
    internalCouserPhone
    internalCouseruserName

    internaluserImage
    internalusername
    internaluserTitle
    internaluserCompanyName
    internaluserEmail
    internaluserPhone
    internaluseruserName

    showInternalcoowner;


   @wire(getRecord, { recordId: Id, fields: [AccountId ]}) 
   currentUserInfo({error, data}) {
       if (data) {
           this.accountid = data.fields.AccountId.value;
         console.log('AccountIds----'+this.accountid);
      
          
       } else if (error) {
           this.error = error ;
       }
   } 

   get navToAccount() {
    let urlname="https://greenpath--cube84.sandbox.my.site.com/Partner/s/account/"+this.accountid
    return urlname;
 }

    @wire(internalUserDetails) 
    internalUserDetails({ error, data }) {
        if (data) {
        this.userDetails=JSON.parse(JSON.stringify(data)); 
        //Internal Co- Owner Data
        if(this.userDetails.Internal_Co_Owner__c!=undefined){
            this.showInternalcoowner=true;
        this.internaluserCoImage=this.userDetails.Internal_Co_Owner__r.MediumPhotoUrl;
        this.internalCousername=this.userDetails.Internal_Co_Owner__r.Name
        this.internalCouserTitle=this.userDetails.Internal_Co_Owner__r.Title
        this.internalCouserCompanyName=this.userDetails.Internal_Co_Owner__r.CompanyName
        this.internalCouserEmail=this.userDetails.Internal_Co_Owner__r.Email
        this.internalCouseruserName=this.userDetails.Internal_Co_Owner__r.Username
        this.internalCouserPhone=this.userDetails.Internal_Co_Owner__r.Phone
        }
     /*console.log('email----'+this.userDetails.Internal_Co_Owner__r.Email + 'alll rec--'+ JSON.stringify(this.userDetails));
        console.log('user--'+this.userDetails.Internal_Co_Owner__r.Username)*/
        

        // Internal Owner Data
        if(this.userDetails.Partner_Experience_Manager__c!=undefined){
         
       this.internaluserImage=this.userDetails.Partner_Experience_Manager__r.MediumPhotoUrl;
        this.internalusername=this.userDetails.Partner_Experience_Manager__r.Name
        this.internaluserTitle=this.userDetails.Partner_Experience_Manager__r.Title
        this.internaluserCompanyName=this.userDetails.Partner_Experience_Manager__r.CompanyName
        this.internaluserEmail=this.userDetails.Partner_Experience_Manager__r.Email
        this.internaluseruserName=this.userDetails.Partner_Experience_Manager__r.Username
        this.internaluserPhone=this.userDetails.Partner_Experience_Manager__r.Phone
        }
       // console.log('email----'+this.userDetails.Partner_Experience_Manager__r.Email + 'alll rec--'+ JSON.stringify(this.userDetails));
      //  console.log('user--'+this.userDetails.Partner_Experience_Manager__r.Username)
        
        } else if (error) {     
        console.log('error in check json global emal'+ JSON.stringify(error));
        }
    }



}