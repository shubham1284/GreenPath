import { LightningElement, wire, track  } from 'lwc';

import uderDetail from '@salesforce/apex/CommunityHomePageLWC.uderDetail';
import Accountname from '@salesforce/apex/CommunityHomePageLWC.Accountname';
import { getRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import FirstName from '@salesforce/schema/User.FirstName'; 
import accountName from '@salesforce/schema/User.Account.Name'; 
import Id from '@salesforce/user/Id';
import userEmailFIELD from '@salesforce/schema/User.Email';
export default class My_lwc extends NavigationMixin(LightningElement) {
    loggedInuserName;
    userId = Id;
    accountName;
    userInfo;

    image="https://partners.greenpath.com/images/backgrounds/auth-bottom.png"





   @wire(getRecord, { recordId: Id, fields: [FirstName,userEmailFIELD,accountName] })
    userDetails({ error, data }) {
      //  console.log('account--'+data.fields.FirstName.value);
        if (error) {
            this.error = error;
        } else if (data) {
            if (data.fields.FirstName.value != null) {
                this.loggedInuserName = data.fields.FirstName.value;
            }   
        }
    }





    @wire(uderDetail) 
    uderDetail({ error, data }) {
        if (data) {
        this.userInfo= data;                    
        } else if (error) {
        console.log('error in check json global emal'+ JSON.stringify(error));
        }
    }

    @wire(Accountname) 
    Accountname({ error, data }) {
        if (data) {
        this.accountName= data;   
        console.log('acc name--'+ this.accountName);                 
        } else if (error) {
        console.log('error in check json global emal'+ JSON.stringify(error));
        }
    }


  
}