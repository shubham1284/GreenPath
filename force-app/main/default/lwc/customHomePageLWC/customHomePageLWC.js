import { LightningElement } from 'lwc';
import logo from "@salesforce/resourceUrl/Logo";
import Id from '@salesforce/user/Id';
	
import { NavigationMixin } from 'lightning/navigation';


export default class My_lwc extends NavigationMixin(LightningElement) {

    userId = Id;
   logoGP=logo;
  
   
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

      navigateToHomePage(event) {
       
     
            this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'home'
                },
            });

      }

      navigateToAccountHome() {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home',
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

    






}