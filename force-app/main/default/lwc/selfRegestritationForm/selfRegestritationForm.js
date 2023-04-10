import { LightningElement,api, track, wire} from 'lwc';
    import checkEmailExist from '@salesforce/apex/CommunitySigUP.checkEmailExist';
    import getInternalUserEmailForNonPortal from '@salesforce/apex/CommunitySigUP.getInternalUserEmailForNonPortal';
    import CheckDomainWithAccountName from '@salesforce/apex/CommunitySigUP.CheckDomainWithAccountName';
    import nonPortalaccount from '@salesforce/apex/CommunitySigUP.nonPortalaccount';
    import insertcontactMethod from '@salesforce/apex/CommunitySigUP.insertcontactMethod';
    import inserUser from '@salesforce/apex/CommunitySigUP.inserUser';
    import createUSerForExistingContact from '@salesforce/apex/CommunitySigUP.createUSerForExistingContact';
    import GetNotPortalUserDetails from '@salesforce/apex/CommunitySigUP.GetNotPortalUserDetails';
    import updateNonPortalUser from '@salesforce/apex/CommunitySigUP.updateNonPortalUser';
    
    import AccountsForDomail from '@salesforce/apex/CommunitySigUP.AccountsForDomail';
    import id from '@salesforce/schema/Contact.Id';
    import conFirstName from '@salesforce/schema/Contact.FirstName';
    import conLastName from '@salesforce/schema/Contact.LastName';
    import conPhone from '@salesforce/schema/Contact.Phone';
    import conTitle from '@salesforce/schema/Contact.Title';
    import { NavigationMixin } from 'lightning/navigation';


    export default class SelfRegestritationForm extends NavigationMixin (LightningElement) {
    allConatList;
    nonPortalUserID
   @track notPortalUserDetails;
    getDomainFromEmail;
    domainMatchingAccountName;
    inputFieldErrorMessage='';
    isLoadingErrorMassage=false;
    isnonPortalUser=false;
    PrescriberEmail;
    inputEmail;
    allAccountList;
    isNewContactForPortalUser=false;
    AccountNameDropDown;
    emailList=[];
    accountNameList=[];
    isFirstLoginPage=true;
    isSeondFFormRegistrationPage=false;
    isThirdRegistrationConfirmationPage=false;
    isErrorPresent=true;
    selectedAccountfromdropdown='';
    isNextContactDetailFormPage=false
    isLoading = false;
    isRequiredError=false;
    ErrorMassage
    isPresentPartner=true;
    ErrorMassagetodisplayed=''
    contactId;
    accountId;
    error;
    phonechange;
    npuphonechange
    partnerNotSelected
    npupartnerNotSelected
    showRedBox=false;
    nonPartner;
    isnonPartner;
    domainName;
    nonParteraccountNameList=[];
    isNonPortalPartner=false;
    internalOwnerEmail


    getContactRecord={
    FirstName:conFirstName,
    LastName:conLastName,
    Phone:conPhone,
    Title:conTitle,
    acName:this.domainMatchingAccountName,
    Email:this.PrescriberEmail 
    };

    npuFirstName
    npuLastName
    npuPhone
    npuTitle
    npuAcName
    npuEmail
    npuConId
    myclass

    @wire(checkEmailExist) 
    AllContacts({ error, data }) {
        if (data) {
        this.allConatList= data;  
        } else if (error) {
        }
    }

    

 /*   @wire(GetNotPortalUserDetails,{contactId: this.nonPortalUserID} ) 
    GetNotPortalUserDet({ error, data }) {
        console.log('otside data--');
        if (data) {
            console.log('notPortalUserDetails otside data--'+JSON.stringify(data));
        this.notPortalUserDetails =data;
        console.log('notPortalUserDetails--'+this.notPortalUserDetails);
        } else if (error) {
        }
    }*/

    @wire(CheckDomainWithAccountName) 
    allAccount({ error, data }) {
        if (data) {
        this.allAccountList= data;
        } else if (error) {
        }
    }

    @wire(nonPortalaccount) 
    allAccountss({ error, data }) {
        if (data) {
        this.nonPartner= data;
        } else if (error) {
        }
    }

    @wire(AccountsForDomail) 
    AccNamePickVal({ error, data }) {
        if (data) {
        //console.log('this.AccountNameDropDown'+ this.AccountNameDropDown);
        } else if (error) {
        console.log('error'+ error);
        }
    }

   /* get myclass() {
        console.log('this.showRedBox---'+this.showRedBox)
        return this.showRedBox ? 'selectionHandler_req' : 'selectionHandler_Non_req';
       
     }*/

     get mailToLink() {
        let urlname="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+this.internalOwnerEmail
        return urlname;
     }

 

    closAlertPopup(event) {
        this.isLoadingErrorMassage=false;
        this.isFirstLoginPage=true;
    }

    handleRegister(event){
        this.isLoading = true;
        window.setTimeout(() => { this.isLoading = false;}, 2000);
     /*   if( this.PrescriberEmail=='' ||  this.PrescriberEmail==undefined){
            this.inputFieldErrorMessage='Please Enter Value in the Email Adress Field.';
        }
        console.log('error msg on submit--'+ this.PrescriberEmail=='');
        if(this.isErrorPresent!=true){
            this.isFirstLoginPage=false;
            this.isSeondFFormRegistrationPage=true;
        }*/

        this.inputFieldErrorMessage='';
        const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = this.template.querySelector('[data-id="inputEmail"]');
        let emailVal = email.value;
        this.PrescriberEmail =emailVal.toUpperCase();
        this.inputEmail=emailVal;
        console.log('onEmailBlur inputEmail '+this.inputEmail);

        if(emailVal == null || emailVal=='' || emailVal==undefined || emailVal.lenth==0){
            this.inputFieldErrorMessage='Please Enter Value In The Email Adress Field.';
            this.isPresentPartner=true;
            this.isNonPortalPartner=false;
            this.isLoadingErrorMassage=true;
            this.isErrorPresent=true
        }
        else if(!emailVal.match(emailRegex)){
            this.inputFieldErrorMessage='Please Enter A Valid Email Address.';
            this.isNonPortalPartner=false;
            this.isNewContactForPortalUser=false;
            this.isPresentPartner=true;
            this.isLoadingErrorMassage=true;
            this.isErrorPresent=true;
        }
        else{
            this.isLoadingErrorMassage=false;
            this.isNewContactForPortalUser=false;
        }
        
        if(emailVal.match(emailRegex)){
            let smallDomain=emailVal.split('@')[1];
            let ecactSmallDomain=smallDomain.split(".")[0];
            this.domainName=ecactSmallDomain;


            let domainname =this.PrescriberEmail.split('@')[1];
            let exactDomainname = domainname.split(".")[0];
           
            let CapitalisedDomain=exactDomainname.toUpperCase()
            this.getDomainFromEmail=CapitalisedDomain;
        }


        this.allConatList.forEach(con =>{
            let conname = con.Email;
            let connameNew = conname.toUpperCase();
            this.emailList.push(connameNew);

        });

        let emailAvailable;

        if(this.emailList.includes(this.PrescriberEmail)){
            emailAvailable=true;
        }
        else{
            emailAvailable=false
        }


        this.allAccountList.forEach(acc =>{
            var accname=acc.Name;
            var capacc =accname.toUpperCase()
            this.accountNameList.push(capacc);
        });

       

        let isPartnerPresent;
        if(this.accountNameList.includes(this.getDomainFromEmail)){
            isPartnerPresent=true;
        }
        else{
            isPartnerPresent=false
        }
        console.log(' domainName '+this.domainName);
        console.log(' isPartnerPresent '+isPartnerPresent);

        this.nonPartner.forEach(acc =>{
            var accname=acc.Name;
            var capacc =accname.toUpperCase()
            this.nonParteraccountNameList.push(capacc);
        });

        if(this.nonParteraccountNameList.includes(this.getDomainFromEmail)){
            this.isnonPartner=true;
        }
        else{
            this.isnonPartner=false;
        }
        console.log('   this.isnonPartner '+  this.isnonPartner);

            let emailexist=true;

            this.allConatList.forEach(con =>{
                this.allAccountList.forEach(acc =>{
                var upperemail=con.Email.toUpperCase() ;

                if(this.isnonPartner!=false && this.PrescriberEmail==upperemail && con.Account.IsPartner!=false && con.Portal_User__c!=false){
                    this.inputFieldErrorMessage='Warning This Email Is Already A Register Please Verify Your Email Address.';
                    emailexist=false;
                    this.isNonPortalPartner=false;
                    console.log('account---'+con.Account.Name);
                    this.isPresentPartner=true;
                    this.isLoadingErrorMassage=true;
                    this.isNewContactForPortalUser=false;
                    this.isErrorPresent=true
                }

                else if(this.PrescriberEmail==upperemail && con.Portal_User__c!=true && con.Account.IsPartner==true){
               //  console.log('not active');
                    this.isSeondFFormRegistrationPage=false;
                    this.isFirstLoginPage=false;
                    this.isThirdRegistrationConfirmationPage=false;
                    this.isnonPortalUser=true;
                    this.npuConId=con.Id;
                  //  createUSerForExistingContact({contactId:con.Id }) 
                    this.nonPortalUserID=con.Id;
                   GetNotPortalUserDetails({contactId:con.Id }) 
                   .then(result=>{
                    this.notPortalUserDetails=result;
                    this.isNonPortalPartner=false;

                    this.npuFirstName=this.notPortalUserDetails.FirstName;
                    this.npuLastName=this.notPortalUserDetails.LastName;
                    this.npuPhone=this.notPortalUserDetails.Phone;
                    this.npuTitle=this.notPortalUserDetails.Title;
                    this.npuAcName=this.selectedAccountfromdropdown;
                    this.npuEmail=this.notPortalUserDetails.Email;

                    console.log('npuEmail---'+  this.npuEmail);
                    

                   console.log('notPortalUserDetails otside data--'+JSON.stringify(this.notPortalUserDetails));
                    console.log('contact inserted id---'+this.notPortalUserDetails);
                    console.log('contact Name---'+this.notPortalUserDetails.FirstName);
                   
                })
                   // console.log('GetNotPortalUserDetails'+con.Id)
                }


         /*       else if(isPartnerPresent!=true && emailVal.match(emailRegex)  ){
                    this.inputFieldErrorMessage='We apologize for being unable to locate the partner information. To sign up as a GreenPath partner, kindly click the link ';
                    emailexist=false;
                    this.isNonPortalPartner=false;
                    this.isPresentPartner=false;
                    this.isLoadingErrorMassage=true;
                    this.isNewContactForPortalUser=false;
                    this.isErrorPresent=true
                } */
              /*  else if(this.isnonPartner!=true && emailVal!='' &&  emailVal.match(emailRegex) ){
                var internalUserEmail;
               console.log('emai match--'+ emailVal.match(emailRegex))
               console.log('emai --'+ emailVal)
               GetNotPortalUserDetails({PartnerName: this.getDomainFromEmail }) 
                   .then(result=>{
                    internalUserEmail=result;
                })
                console.log('internalUserEmail --'+ internalUserEmail)
                    this.inputFieldErrorMessage='In order to set up your account for access, please contact your GreenPath account owner via email' + internalUserEmail;
                    emailexist=false;
                    this.isPresentPartner=true;
                    this.isLoadingErrorMassage=true;
                    this.isNewContactForPortalUser=false;
                    this.isErrorPresent=true
                }  */

                else 
                if(emailAvailable!=true  && this.PrescriberEmail!=con.Email &&  this.getDomainFromEmail==acc.Name.toUpperCase() && acc.IsPartner==true){
                 console.log('in Else Block --')
                 this.isNonPortalPartner=false;
                    this.isNewContactForPortalUser=true;
                    this.isErrorPresent=false;
                    this.domainMatchingAccountName=acc.Name;
                    this.accountId=acc.Id;
                    this.isFirstLoginPage=false;
                    this.isSeondFFormRegistrationPage=true;
                    
                } 
            });
        });

        if(isPartnerPresent!=true && emailVal.match(emailRegex)  ){
            this.inputFieldErrorMessage='We Apologize For Being Unable To Locate The Partner Information. To Sign Up As A Greenpath Partner, Kindly Click The Link ';
            emailexist=false;
            console.log('emai match  prtner--')
            this.isNonPortalPartner=false;
            this.isPresentPartner=false;
            this.isLoadingErrorMassage=true;
            this.isNewContactForPortalUser=false;
            this.isErrorPresent=true
        }

       else if(this.isnonPartner!=true && emailVal!='' &&  emailVal.match(emailRegex) ){
            var customerEmail = "someone@email.com";


           
            this.isNonPortalPartner=true;
           console.log('emai match non prtner--'+ emailVal.match(emailRegex))
           console.log('emai --'+ emailVal)
           getInternalUserEmailForNonPortal({PartnerName: this.getDomainFromEmail }) 
               .then(result=>{
                this.internalOwnerEmail=result ;
                console.log('result --'+ result)
           
                console.log('internalOwnerEmail --'+ this.internalOwnerEmail)
            console.log('isNonPortalPartner --'+ this.isNonPortalPartner)
                this.inputFieldErrorMessage='In Order To Set Up Your Account For Access, Please Contact Your Greenpath Account Owner Via Email  '
                emailexist=false;
                this.isPresentPartner=true;
                this.isLoadingErrorMassage=true;
                this.isNewContactForPortalUser=false;
                this.isErrorPresent=true
            })
            } 


        AccountsForDomail({searchName:this.getDomainFromEmail })    
        .then(result=>{
                this.AccountNameDropDown=result;
            })
            .catch(error=>{
                this.error=error.message;
                window.console.log(this.error);
            });
    }

    selectionChangeHandler(event) {
        this.selectedAccountfromdropdown=event.target.value;
       
        this.dispatchEvent(new CustomEvent('selected', {
            detail: event.target.value 
        }));
    }

    FirstNameameInpChange(event){
        this.getContactRecord.FirstName = event.target.value;
    }

    LastNameInpChange(event){
        this.getContactRecord.LastName = event.target.value;
    }

    titlInpChange(event){
        this.getContactRecord.Title = event.target.value;
    }
    emailInpChange(event){
        this.getContactRecord.Email = event.target.value;
    }
    phoneInpChange(event){
        this.getContactRecord.Phone = event.target.value;
         this.phonechange=event.target.value;
        console.log('phonechange---'+this.phonechange);
    }
    accNameChange(event){
    this.getContactRecord.acName = event.target.value;
    }

    handleChange(e) {
      //  console.log('handle change---'+e.target.name)
        if (e.target.name === "First Name") {
        
          //this is name input textbox
          this.npuFirstName = e.target.value;
        //  console.log('firstname--'+this.npuFirstName);
        } else if (e.target.name === "Last Name") {
        
          //this is industry input textbox
          this.npuLastName = e.target.value;
       //   console.log('lastname--'+this.npuLastName);
        } else if (e.target.name === "Title") {
        
          //this is rating input textbox
          this.npuTitle = e.target.value;
       //   console.log('title=='+this.npuTitle);
        }
        else if (e.target.name === "Phone") {
        
            //this is rating input textbox
            this.npuPhone = e.target.value;
            this.npuphonechange=e.target.value;
          //  console.log('npu phone--'+this.npuPhone);
          }
    } 
      

    createNonPortalUser() {
        //4. map the data to the fields
        
        this.isLoading = true;
      const fields = {};
      window.setTimeout(() => { this.isLoading = false;}, 2000);
  
      fields[id.fieldApiName] = this.npuConId;
      fields[conFirstName.fieldApiName] = this.npuFirstName;
      fields[conLastName.fieldApiName] = this.npuLastName;
      fields[conPhone.fieldApiName] = this.npuPhone;
      fields[conTitle.fieldApiName] = this.npuTitle;
          
          //5. Create a config object that had info about fields. 
          //Quick heads up here we are not providing Object API Name
      const recordInput = {
        fields: fields
      };

      console.log('recordInput----'+recordInput)
      console.log('recordInput----'+JSON.stringify(recordInput))

      const isInputsCorrect = [
        ...this.template.querySelectorAll("lightning-input")
        ].reduce((validSoFar, inputField) => {
        inputField.reportValidity();
        return validSoFar && inputField.checkValidity();
        }, true);

        
        console.log('selectedAccountfromdropdown np outside====='+this.selectedAccountfromdropdown)

        if(this.selectedAccountfromdropdown=='' || this.selectedAccountfromdropdown=='Select'  ){
            console.log('selectedAccountfromdropdown np====='+this.selectedAccountfromdropdown)
            this.isRequiredError=true
            this.isFirstLoginPage=false
            this.partnerNotSelected=true
            this.showRedBox=true
            this.ErrorMassagetodisplayed='Please Fill All Mandatory Fields : Partner Name';
          //  this.isThirdRegistrationConfirmationPage=false;

        }

        else{
            this.partnerNotSelected=false;
        }

      


        let str='Please Fill All Mandatory Fields : ';
        if (!isInputsCorrect ) {
            this.template.querySelectorAll('lightning-input').forEach(element => {
                if(element.value=='' || element.value==undefined ){
                    this.isRequiredError=true
                    this.isFirstLoginPage=false
                    this.ErrorMassage=str;
                    if( this.ErrorMassagetodisplayed===''){
                        this.ErrorMassagetodisplayed=str+' '+element.name;
                    }
                    else{
                    this.ErrorMassagetodisplayed+=' , '+' ' + element.name;
                    }
                }
            });
        }

        var isPhoneCorrect;


        if(this.npuphonechange!=undefined){
        this.template.querySelectorAll('lightning-input').forEach(element => {
            if(element.name=='Phone'  ){
                if(element.value.match(/^[0-9]+$/)!= null){
                    console.log('phone value only number---');
                   // this.ErrorMassagetodisplayed='';

                }
                else
                {
                    
                    this.ErrorMassagetodisplayed='Please Enter Valid Phone Number'
                    console.log("String does not contain only numbers") 
                    isPhoneCorrect=false
                }
               
            }
        });
    }
  
          //6. Invoke the method updateRecord()
          if (isInputsCorrect  && this.selectedAccountfromdropdown!='' && this.selectedAccountfromdropdown!='Select' && isPhoneCorrect!=false ) {
            this.isFirstLoginPage=false;
        this.isThirdRegistrationConfirmationPage=true;
        this.isnonPortalUser=false;
        window.setTimeout(() => { this.isLoading = false;}, 2000);
          updateNonPortalUser({contactobj:fields,accName:this.selectedAccountfromdropdown})
          .then((record) => {
            console.log('record id----'+record.Id);
            createUSerForExistingContact({contactId:record.Id })
        console.log('record----'+JSON.stringify(record));
      });
    }
    }



    createPartnerContact(){
        this.ErrorMassagetodisplayed=''
        this.isLoading = true;
        window.setTimeout(() => { this.isLoading = false;}, 2000);

        const isInputsCorrect = [
        ...this.template.querySelectorAll("lightning-input")
        ].reduce((validSoFar, inputField) => {
        inputField.reportValidity();
        return validSoFar && inputField.checkValidity();
        }, true);

        console.log('selectedAccountfromdropdown outside====='+this.selectedAccountfromdropdown)

        if(this.selectedAccountfromdropdown=='' || this.selectedAccountfromdropdown=='Select'  ){
            console.log('selectedAccountfromdropdown====='+this.selectedAccountfromdropdown)
            this.isRequiredError=true
            this.isFirstLoginPage=false
            this.partnerNotSelected=true
            this.ErrorMassagetodisplayed='Please Fill All Mandatory Fields : Partner Name';
          //  this.isThirdRegistrationConfirmationPage=false;

        }
        else{
            this.partnerNotSelected=false;
        }

        let str='Please Fill All Mandatory Fields : ';
        if (!isInputsCorrect ) {
            this.template.querySelectorAll('lightning-input').forEach(element => {
                if(element.value=='' || element.value==undefined ){
                    this.isRequiredError=true
                    this.isFirstLoginPage=false
                    this.ErrorMassage=str;
                    if( this.ErrorMassagetodisplayed===''){
                        this.ErrorMassagetodisplayed=str+' '+element.name;
                    }
                    else{
                    this.ErrorMassagetodisplayed+=' , '+' ' + element.name;
                    }
                }
            });
        }
        console.log('phonechange---'+this.phonechange);
var isPhoneCorrect;
        if(this.phonechange!=undefined){
        this.template.querySelectorAll('lightning-input').forEach(element => {
         if(element.name=='Phone'){
                if(element.value.match(/^[0-9]+$/)== null){
                  //  console.log('phone value only number---');
                    this.ErrorMassagetodisplayed='Please Enter Valid Phone Number'
                    isPhoneCorrect=false;
                    console.log("String does not contain only numbers") 
                   // this.ErrorMassagetodisplayed='';

                }
              
               
            }
        });
    }
        if (isInputsCorrect  && this.selectedAccountfromdropdown!='' && this.selectedAccountfromdropdown!='Select' && isPhoneCorrect!=false ) {
            this.isRequiredError=false
            this.isSeondFFormRegistrationPage=false;
            this.isFirstLoginPage=false;
            this.isThirdRegistrationConfirmationPage=true;

            insertcontactMethod({contactObj:this.getContactRecord,AccountID:this.accountId,Email:this.inputEmail ,accName:this.selectedAccountfromdropdown})
                .then(result=>{
                    this.getContactRecord={};
                    this.contactId=result.Id;
                    console.log('contact inserted id---'+ this.contactId);
                    inserUser({contactId:this.contactId })
                })
                    .catch(error=>{
                    this.error=error.message;
                    window.console.log(this.error);
                });
            }
        }


        NavigateToRegistration(event){
            console.log('navigate')
        this[NavigationMixin.Navigate]({
            
            type: 'standard__webPage',
         //   type: 'comm__loginPage',
            attributes: {
               // actionName: 'logout'
               
               url: 'https://greenpath--cube84.sandbox.my.site.com/Partner/s/login/?ec=302&startURL=%2FPartner%2Fs%2F' 
            }
        });
    }

    }