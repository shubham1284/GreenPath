import { LightningElement,wire,api } from 'lwc';
import logo from "@salesforce/resourceUrl/GPNewLogo";
import { getRecord } from 'lightning/uiRecordApi';
import AccountId from '@salesforce/schema/User.AccountId';
import Id from '@salesforce/user/Id';
import getObjectApiname from '@salesforce/apex/ComHomePage.getObjectApiname';
	
	
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';


export default class My_lwc extends NavigationMixin(LightningElement) {
    AccountIds;
    userId = Id;
   logoGP=logo;

   HomeSelected=true;
   chatterSelected=false;

   isHome;
   isChatter;
   isProductSrvices;
   isPartnerDetails
   istask=false

   @api recordId;
   currentPageReference = null; 
   urlStateParameters = null;

   urlId = null;
   @api objectApiName;
  
  

   @wire(getRecord, { recordId: Id, fields: [AccountId ]}) 
   currentUserInfo({error, data}) {
       if (data) {
           this.AccountIds = data.fields.AccountId.value;
         /*   console.log('AccountIds----'+this.AccountIds);
           console.log('objectApiName from wire----'+this.objectApiName); */
          
       } else if (error) {
           this.error = error ;
       }
   }

   @wire(CurrentPageReference)
   getPageReferenceParameters(currentPageReference) {
      if (currentPageReference) {
        console.log(currentPageReference);
         this.recordId = currentPageReference.attributes.recordId ;
         let attributes = currentPageReference.attributes;
         let objectApiName =currentPageReference.attributes.objectApiName;
         this.urlId = currentPageReference.state?.type;
        /*  console.log(' this.urlId--'+ this.urlId);
         console.log('objectApiName--',objectApiName)
         console.log('recordId--', this.recordId)
         console.log('attributes--',attributes) */
         let state = currentPageReference.state;
         /*let type = currentPageReference.type;
         console.log('states--'+states);
         console.log('type--'+type);*/
         if(attributes.name==='Home'){
            this.isHome=true;
            this.isChatter=false;
            this.istask=false;
            this.isProductSrvices=false;
            this.isPartnerDetails=false;
          //  console.log('isHome',this.isHome);

         }
         else if(attributes.name==='Chatter__c'){
            this.isChatter=true;
            this.isHome=false;
            this.istask=false;
            this.isProductSrvices=false;
            this.isPartnerDetails=false;
            console.log('isChatter',this.isChatter);
         }
         else if(attributes.objectApiName==='Partner_Product_and_Service__c'){
            this.isChatter=false;
            this.isHome=false;
            this.istask=false;
            this.isProductSrvices=true;
            this.isPartnerDetails=false;
            console.log('isChatter',this.isChatter);
         }
        /*  else if(this.recordId !=this.AccountIds){
            this.isChatter=false;
            this.isHome=false;
            this.isProductSrvices=true;
            this.isPartnerDetails=false;
            console.log('isChatter',this.isChatter);
         }
         else{
            this.isPartnerDetails=true;
            this.isChatter=false;
            this.isHome=false;
            this.isProductSrvices=false;
         }
         let states = currentPageReference.state;
         let type = currentPageReference.type; */
      }
   }

   renderedCallback() {
  //  console.log('recordId render call back '+this.recordId)
   
    getObjectApiname({
      recId:this.recordId     })
      .then(result=>{
         // console.log('result---------'+result);
          if(result==='Partner_Product_and_Service__c'){
         
          this.isChatter=false;
          this.istask=false;
          this.isHome=false;
          this.isProductSrvices=true;
          this.isPartnerDetails=false;
          }

          else if(result==='Account'){
            this.isChatter=false;
            this.isHome=false;
            this.istask=false;
            this.isProductSrvices=false;
            this.isPartnerDetails=true;

          }
          else if(result==='Task'){
            this.isChatter=false;
            this.isHome=false;
            this.isProductSrvices=false;
            this.isPartnerDetails=false;
            this.istask=true;

          }
          else if(result==='User'){
            this.isChatter=false;
            this.isHome=false;
            this.isProductSrvices=false;
            this.isPartnerDetails=false;
            this.istask=true;

          }
      
    })
  }
  
   
    // JS functions start 
    handleActive(event) {
     this.activeTab = event.target.value;
    }
    
  
    navigateToProfile(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.userId,
                pageName: 'profile',
                recordId:this.userId
            },
        });
  
    } 

    handleMenuItem(event) {
        console.log("selected menu => " + event.detail.value);
        switch (event.detail.value) {
          case "My Profle":
            console.log('prof');
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/profile/' + this.userId,
                    
                   
                },
            });
    
            break;
          case "Log Out":
           console.log('log out');
          this[NavigationMixin.Navigate]({
            type: 'comm__loginPage',
            attributes: {
                actionName: 'logout'
            }
        });

   

            break;
         
        }
      }

      navigateToHomePage() {     
      //  this.template.querySelector('.yesBtn').classList.add('dynamicCSS'); this.template.querySelector('.noBtn').classList.remove('dynamicCSS');
     
           this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'home'
                },
            });
  

      }

      navigateToAccountHome() {
      this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url: '/account/' + this.AccountIds,
            
           
        },
    });
      }

    navigateToContactHome() {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'home',
            },
        });
    }

    navigateToChatterGroupe() {
      let accountid="0018I00000LupCQQAZ";
      
   this.HomeSelected=false;
   this.chatterSelected=true;


        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/chatter'
            }
        });
    }

    

    navigatePartnerProduct() {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Partner_Product_and_Service__c',
                actionName: 'home',
            },
        });
    }



    




}