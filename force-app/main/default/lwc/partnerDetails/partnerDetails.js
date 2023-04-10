import { LightningElement , wire, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import partnerDetailRecord from '@salesforce/apex/PartnerDetail.partnerDetailRecord';
import userInfo from '@salesforce/apex/PartnerDetail.userInfo';
import updatePartnerDetails from '@salesforce/apex/PartnerDetail.updatePartnerDetails';
import { refreshApex } from '@salesforce/apex';


import Id from '@salesforce/schema/Account.Id';
import Name from '@salesforce/schema/Account.Name';
import partnerGeneralWebsite from '@salesforce/schema/Account.Partner_s_general_website__c';
import PartnerAkas from '@salesforce/schema/Account.Previously_Known_As__c';
import gpPhone from '@salesforce/schema/Account.GPFW_Unique_Phone_Number__c';
import startDate from '@salesforce/schema/Account.Program_Start_Date__c';
import coBrandedUrl from '@salesforce/schema/Account.Co_Branded_URL__c';
import noBranches from '@salesforce/schema/Account.Number_of_branches__c';
import routingnumber from '@salesforce/schema/Account.Routing_Numbers__c';
import newRelease from '@salesforce/schema/Account.News_Release__c';
import paymentMethod from '@salesforce/schema/Account.Accounts_Receivable_Payment_Method__c';
import priceIncreaseMonth from '@salesforce/schema/Account.Price_Increase_Month__c';
import billingCustomerNumber from '@salesforce/schema/Account.Billing_Customer_Number__c';
import billingHistory from '@salesforce/schema/Account.Program_Notes__c';
import PriDesNote from '@salesforce/schema/Account.Pricing_Decision_Notes__c';
import billingMethod from '@salesforce/schema/Account.Billing_Method__c';
import street from '@salesforce/schema/Account.ShippingStreet';
import city from '@salesforce/schema/Account.ShippingCity';
import country from '@salesforce/schema/Account.ShippingCountryCode';
import state from '@salesforce/schema/Account.ShippingStateCode';
import postalCode from '@salesforce/schema/Account.ShippingPostalCode';
import billingCode from '@salesforce/schema/Account.Billing_Codes__c';
import billingnote from '@salesforce/schema/Account.Billing_Notes__c';
import frequency from '@salesforce/schema/Account.Frequency__c';
import renewal from '@salesforce/schema/Account.Renewal_3__c';
import billingMonth from '@salesforce/schema/Account.Month_for_Billing__c';
import specialPricing from '@salesforce/schema/Account.Special_Pricing__c';
import pricingNote from '@salesforce/schema/Account.Special_Pricing_Notes__c';
import revenue from '@salesforce/schema/Account.Monthly_Program_Cost__c';
import frequencyNote from '@salesforce/schema/Account.Billing_Frequency_Notes__c';
export default class PartnerDetails extends LightningElement {

@track partnerDetails={};
@track resetpartnerDetails={};

profileName
username
isPartnerAdminUser=false;
showtoolTip=false;


isLoading = false;
PartnerName;
PartnerWebsite;
partnerAKAS
PartnerPhone
ProgrammStartDate
coBrandedUrl
noOfBranches
routingMembers
newRelease
accountsReceivablePaymentMethod
PriceIncreaseMonth
billingCustomerNumber
billingHistorys
programNotes
pricingDecisionNotes
billingMethod
ShippingStreet
ShippingCity
ShippingCountry
ShippingState
ShippingPostalCode
billingCodes
billingNotes
frequency
renewal_3
monthforBilling
specialPricingNotes
specialpricing
originalContractualRevenue
otherFrequencyNote
showcEditButton=true;

getId;
recordtypeID;
RecordTypeName;
showRoutingMember=true
showPartnershipStartDate=true
showDMPConsessionReceived=true
isReadOnly = true;
error
showAddressCompleteAddress=false
showTextAddress=true;
showTextPickFields=true;
showPickAllCodes=false;
showSubmitButton=false;
showcancelButton=false;
showRevenue=false;
isFrequencySelectedOther=false;



@wire(partnerDetailRecord) 
partnerInfo( response ) {
    if (response && response.data) {
    this.partnerDetails= response.data; 
    this.resetpartnerDetails== response.data; 
    this.getId=response.data.Id
   // console.log('ShippingAddress----',response.data.ShippingAddress)
    this.recordtypeID=response.data.RecordTypeId
    this.RecordTypeName=response.data.RecordType.Name
    if(this.RecordTypeName==='Fin Tech' ||this.RecordTypeName==='Employer'||this.RecordTypeName==='Grant Administrator/Non-Profit'||this.RecordTypeName==='GSE'||this.RecordTypeName==='Insurance/Retirement'||this.RecordTypeName==='Mortgage Lender'||this.RecordTypeName==='Mortgage Servicer'){
   // console.log('fintech is rec typ')
    this.showRoutingMember=false;
    }

    if(this.RecordTypeName==='Card Issuer' ){
    this.showPartnershipStartDate=false;
    }

    if(this.RecordTypeName==='Credit Union' || this.RecordTypeName==='Employer' ||this.RecordTypeName==='Insurance/Retirement' ){
        this.showRevenue=true;
        }

    if(this.RecordTypeName==='Fin Tech' ||this.RecordTypeName==='Grant Administrator/Non-Profit'||this.RecordTypeName==='GSE'||this.RecordTypeName==='Insurance/Retirement'||this.RecordTypeName==='Mortgage Lender'||this.RecordTypeName==='Mortgage Servicer'){
    this.showDMPConsessionReceived=false;
    }

    if(response.data.Frequency__c==='Other'){
        this.isFrequencySelectedOther=true;

    }
    
  /*   console.log('RecordTypeName ---'+  this.RecordTypeName);
    console.log('this.data  ---id',response.data);
    console.log('this.Frequency__c  ---id',response.data.Frequency__c); */
    refreshApex(this.partnerDetails)
    } 
}


@wire(userInfo) 
userDetails(response) {
    if (response && response.data) {
        this.profileName = response.data.Profile.Name;
    //   if(this.profileName==='HPF Partner Admin' ||this.profileName==='Partner custom profile'){
    if(this.profileName==='HPF Partner Admin'|| this.profileName==='Partner Admin'|| this.profileName==='Partner LL Admin'){
      //  console.log('im Admin');
    this.isPartnerAdminUser = true;
    }
        this.username =response.data.Name;
     //   console.log('user details----', this.username +', '+   this.profileName)
    } 
}

showToast(title, message, variant) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    });
    this.dispatchEvent(event);
}


handleEditField(event) {
    event.preventDefault();
    this.isLoading = true;
    this.showcancelButton=true;
    window.setTimeout(() => { this.isLoading = false;}, 1000);
    console.log('>> handleEditField');
    //  if(this.profileName==='HPF Partner Admin'||this.profileName==='Partner custom profile'){
    if(this.profileName==='HPF Partner Admin'|| this.profileName==='Partner Admin'|| this.profileName==='Partner LL Admin'){
   //     console.log('im Admin');
    this.isReadOnly = false;
    this.showTextAddress=false;
    this.showAddressCompleteAddress=true;

    this.showTextPickFields=false;
    this.showPickAllCodes=true;
    this.showSubmitButton=true;
    }
}


handleChange(e) {
    
    console.log('handle change---'+e.target.name)
        if (e.target.name === "name") {
        
        this.PartnerName = e.target.value;
        
        console.log('firstname--'+this.PartnerName);
        } else if (e.target.name === "website") {
        this.PartnerWebsite = e.target.value;
        //this is industry input textbox
        
        //   console.log('lastname--'+this.npuLastName);
        } else if (e.target.name === "aka") {
        
        this.partnerAKAS = e.target.value;
        
        //   console.log('title=='+this.npuTitle);
        }
        else if (e.target.name === "phone") {
        
        this.PartnerPhone = e.target.value;
            
        
        }
        else if (e.target.name === "startdate") {
        
            this.ProgrammStartDate = e.target.value;
            
            
            }
            else if (e.target.name === "url") {
        
            this.coBrandedUrl = e.target.value;
            
            
            }
            else if (e.target.name === "branch") {
        
            this.noOfBranches = e.target.value;
            
            
            }
            else if (e.target.name === "routing") {
        
            this.routingMembers = e.target.value;
            
            
            }
            else if (e.target.name === "relese") {
        
            this.newRelease = e.target.value;
            
            
            }
            else if (e.target.name === "payMethod") {
        
            this.accountsReceivablePaymentMethod = e.target.value;
            
            
            }
            else if (e.target.name === "monthIncrease") {
        
            this.PriceIncreaseMonth = e.target.value;
            
            
            }
            else if (e.target.name === "customerNumber") {
        
            this.billingCustomerNumber = e.target.value;
            
            
            }
            else if (e.target.name === "decision") {
        
            this.pricingDecisionNotes = e.target.value;
            
            
            }
            else if (e.target.name === "programNote") {
        
            this.programNotes = e.target.value;
            
            
            }
            else if (e.target.name === "billMethod") {
        
            this.billingMethod = e.target.value;
            
            
            }
            else if (e.target.name === "address") {
        
            this.npuFirstName = e.target.value;
            
            
            }
            else if (e.target.name === "billingcode") {
        
            this.billingCodes = e.target.value;
            
            
            }
            else if (e.target.name === "billingnote") {
        
            this.billingNotes = e.target.value;
            
            
            }
            else if (e.target.name === "frequency") {
                console.log('otherNote---'+e.target.value);
                if(e.target.value ==='Other'){
                   
                    this.isFrequencySelectedOther=true;
            
                }
                else{
                    this.isFrequencySelectedOther=false;
                }
        
            this.frequency = e.target.value;
            }
            else if (e.target.name === "renewal") {
        
            this.renewal_3 = e.target.value;
            }
            else if (e.target.name === "bilmonth") {
        
            this.monthforBilling = e.target.value;
            }
            else if (e.target.name === "specialPrice") {
        
            this.specialPricing = e.target.value;
            }
            else if (e.target.name === "specialPricenote") {
        
            this.specialPricingNotes = e.target.value;
            }

            else if (e.target.name === "ogRevenue") {
        
                this.originalContractualRevenue = e.target.value;
                }

            else if (e.target.name === "shipStreet") {
        
                    this.ShippingStreet = e.target.value;
                    }

            else if (e.target.name === "shipCountry") {
                console.log('shipCountry---'+e.target.value);
                    this.ShippingCountry = e.target.value;                        
            }

            else if (e.target.name === "shipstate") {
                console.log('state---'+e.target.value);

                        this.ShippingState = e.target.value;
                                      
            }

            else if (e.target.name === "shipcity") {

                        this.ShippingCity = e.target.value;
                                
                                
            }
            else if (e.target.name === "postalCode") {

                                    this.ShippingPostalCode = e.target.value;        
            }
            else if (e.target.name ==="otherNote") {
                

                this.otherFrequencyNote = e.target.value;        
}
            
    } 

 /*    addressInputChange(event){
        console.log('adress-----');
       
        this.ShippingStreet =event.target.street;
        console.log('adress----- new', this.ShippingStreet);
        this.ShippingCity = event.target.city;
        console.log('adress----- new', this.ShippingCity);
        this.ShippingCountry =event.target.country;
        console.log('adress----- new', this.ShippingCountry);
        this.ShippingState =event.target.province;
        console.log('adress----- new', this.ShippingState);
        this.ShippingPostalCode =event.target.postalCode;
        console.log('postal----- new', this.ShippingPostalCode);
        
        
        

    } */

    saveRecords(event){
        this.isLoading = true;
        this.showcEditButton = true;
        this.showcancelButton=false;
        this.isReadOnly = true;
        this.showTextAddress=true;
        this.showAddressCompleteAddress=false;
        this.showTextPickFields=true;
        this.showPickAllCodes=false;
        this.showSubmitButton=false;
        window.setTimeout(() => { this.isLoading = false;}, 1000);
    const fields = {};
    
    fields[Id.fieldApiName] = this.getId;
    fields[Name.fieldApiName] = this.PartnerName;
    fields[partnerGeneralWebsite.fieldApiName] = this.PartnerWebsite;
    fields[PartnerAkas.fieldApiName] = this.partnerAKAS;
    fields[gpPhone.fieldApiName] = this.PartnerPhone;
    fields[startDate.fieldApiName] = this.ProgrammStartDate;
    fields[coBrandedUrl.fieldApiName] = this.coBrandedUrl;
    fields[noBranches.fieldApiName] = this.noOfBranches;
    fields[routingnumber.fieldApiName] = this.routingMembers;

    fields[newRelease.fieldApiName] = this.newRelease;
    fields[paymentMethod.fieldApiName] = this.accountsReceivablePaymentMethod;
    fields[priceIncreaseMonth.fieldApiName] = this.PriceIncreaseMonth;
    fields[billingCustomerNumber.fieldApiName] = this.billingCustomerNumber;

    fields[billingHistory.fieldApiName] = this.billingHistorys;
    fields[PriDesNote.fieldApiName] = this.pricingDecisionNotes;

    fields[billingMethod.fieldApiName] = this.billingMethod;
    fields[street.fieldApiName] = this.ShippingStreet;
    fields[city.fieldApiName] = this.ShippingCity;
    fields[country.fieldApiName] = this.ShippingCountry;
    fields[state.fieldApiName] = this.ShippingState;

    fields[postalCode.fieldApiName] = this.ShippingPostalCode;
    fields[billingCode.fieldApiName] = this.billingCodes;
    fields[billingnote.fieldApiName] = this.billingNotes;
    fields[frequency.fieldApiName] = this.frequency;

    fields[renewal.fieldApiName] = this.renewal_3;
    fields[billingMonth.fieldApiName] = this.monthforBilling;
    fields[specialPricing.fieldApiName] = this.specialPricing;
    fields[pricingNote.fieldApiName] = this.specialPricingNotes;
    fields[revenue.fieldApiName] = this.originalContractualRevenue;
    fields[frequencyNote.fieldApiName] = this.otherFrequencyNote;

    
        
    
        updatePartnerDetails({accRecords:fields})
        .then((record) => {
            refreshApex(this.partnerDetails)
        this.showToast('Success', 'Record updated SuccessFully', 'success');
        
        console.log('record id----',record);
        console.log("return from remote call");
        
    })
    .catch((error) => {
        this.showToast('Something went wrong', error.body.message, 'error');
        console.log("some error in code:", error);
    });
    
}

clereValues(event){
    this.isLoading = true;
    this.showcEditButton=true;
    window.setTimeout(() => { this.isLoading = false;}, 1000);
    const inputFields = this.template.querySelectorAll(
        'lightning-input-field'
    );
    if (inputFields) {
        inputFields.forEach(field => {
            field.reset();
        });
    }
    this.isReadOnly = true;
    this.showcancelButton=false;
    this.showTextAddress=true;
    this.showAddressCompleteAddress=false;
    this.showTextPickFields=true;
    this.showPickAllCodes=false;
    this.showSubmitButton=false;
    window.location.reload();
}

editValues(event){
    this.isLoading = true;
    this.showcEditButton=false;
    window.setTimeout(() => { this.isLoading = false;}, 1000);
    // if(this.profileName==='HPF Partner Admin'||this.profileName==='Partner custom profile'){
    //  if(this.profileName==='HPF Partner Admin'){
        console.log('im Admin');
    this.isReadOnly = false;
    this.showcancelButton=true;
    this.showTextAddress=false;
    this.showAddressCompleteAddress=true;

    this.showTextPickFields=false;
    this.showPickAllCodes=true;
    this.showSubmitButton=true;
    //  }
}





    




}