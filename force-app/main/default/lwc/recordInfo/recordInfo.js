import { LightningElement, api } from 'lwc';
import getObjectApiname from '@salesforce/apex/ComHomePage.getObjectApiname';

export default class MiscRecord extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api flexipageRegionWidth;

    renderedCallback() {
      console.log('recordId'+this.recordId)
      console.log('objectApiName----'+this.objectApiName)
      console.log('flexipageRegionWidth----'+this.flexipageRegionWidth)
      getObjectApiname({
        recId:this.recordId     })
        .then(result=>{
            console.log('result---------'+result);
           
            
          
        
      })
    }

    connectedCallback() {
        console.log('recordId  conn' + this.recordId); // this works
        console.log('objectApiName  conn' + this.objectApiName); // this does not WORK ??
     
      }
}