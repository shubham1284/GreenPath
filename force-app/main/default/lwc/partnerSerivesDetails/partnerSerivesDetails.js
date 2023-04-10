import { LightningElement , wire, track } from 'lwc';
    import partnerProServices from '@salesforce/apex/ProductSerivcesDetails.partnerProServices';
    import saveon from '@salesforce/apex/ProductSerivcesDetails.saveon';
    export default class PartnerSerivesDetails extends LightningElement {

    name;
    partnerAccount;
    phoneNumber;
    prductList;
    newEntryUpdated

    @ track accountName

    @wire(partnerProServices) 
        partnerInfo({ error, data }) {
        if (data) {
        this.prductList= JSON.parse(data); 
        console.log('records----',data) 
        } else if (error) {
            console.log('error in partnerInfo'+ JSON.stringify(error));
        }
    }

    handleSectionToggle(event){
        console.log(event.detail.openSections);
    }


    handleAccountchange(event){
        let lltp=this.prductList;
        let index=event.target.name;
        this.accountName=event.target.value;
        //console.log('index:'+index);
        //console.log('lltp:'+lltp.length);
        let currentPartner=lltp[index].li.Partner_Account__c;
        lltp[index].li.Partner_Account__c=this.accountName; 
        this.prductList=lltp;

    }

    handleNamechange(event){
        var namechange
        console.log('Account :');
        let lltp=this.prductList;
        let index=event.target.name;
        namechange=event.target.value;
        let ProductName=lltp[index].li.Name;
        lltp[index].li.Name=namechange;
        this.prductList=lltp;
        console.log('price updated succesfully');
        // return refreshApex(this.newEntryUpdated);

    }




    saveon(event){

console.log('im in save----');
    saveon({
        updatedPriceEntry1:JSON.stringify(this.prductList)     })
        .then(result=>{
            console.log('result---------'+result);
            if(result=='Sucessfully updated records!!!!')
            {
              this.template.querySelector('c-common-toast').showToast('success',result,'utility:success',10000);
            }
            
          
        
      })
          .catch(error => {
            this.template.querySelector('c-common-toast').showToast('error',error.message,'utility:warning',10000)
          })
        

    console.log('price updated succesfully'+this.recordId);



    // console.log('price save:'+JSON.stringify(this.PricebookEntryList));



    }



    }