import lookUp from '@salesforce/apex/FlowMergeScreen.search';
import { api, LightningElement, track, wire } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';


export default class customLookUp extends LightningElement {

    @api recordIdB
    @api recordIdA
    @api allid

    @api passEnityAId;
    @api passEnitybId;
    @api partnerAId
    @api partnerBId

    showErrormassage;

    @api availableActions = [];


    @api objName;
    @api iconName;
    @api filter = '';
    @api searchPlaceholder='Search';
    @track selectedName;
    @track selectedName1;
    @track records;
    @track records1;
    @track isValueSelected;
    @track isValueSelected1;
    @track blurTimeout;
    searchTerm='';
    searchTerm1='';
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track boxClass1 = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';
    @track inputClass1 = '';
    @wire(lookUp, {searchTerm : '$searchTerm', myObject : 'Account', filter : '$filter'})
    wiredRecords({ error, data }) {
        if (data) {
            this.error = undefined;
            this.records = data;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }

    @wire(lookUp, {searchTerm : '$searchTerm1', myObject : 'Account', filter : '$filter'})
    wiredRecords1({ error, data }) {
        if (data) {
            this.error = undefined;
            this.records1 = data;
        } else if (error) {
            this.error = error;
            this.records1 = undefined;
        }
    }


    connectedCallback(){
        this.passEnitybId=this.partnerBId
        this.passEnityAId=this.partnerAId

        console.log('passEnitybId'+this.passEnitybId);
        console.log('passEnityAId'+this.passEnityAId);


        console.log('is value-----'+this.isValueSelected);

        console.log('selected name-----'+this.recordIdA+'-----'+this.recordIdB)
        this.searchTerm= this.recordIdA
       
    
        this.searchTerm1=this.recordIdB 
   }  


    renderedCallback() {
     
    }

    handleClick() {
      //  this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }

    onBlur1() {
        this.blurTimeout = setTimeout(() =>  {this.boxClass1 = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }

    onSelect(event) {

        this.passEnityAId=event.currentTarget.dataset.id;

        const attributeChangeEvent = new FlowAttributeChangeEvent('partnerA',  this.passEnityAId);
        this.dispatchEvent(attributeChangeEvent);


        console.log('this.passEnityAId--'+this.passEnityAId)
        let selectedId = event.currentTarget.dataset.id;
        let selectedName = event.currentTarget.dataset.name;
        const valueSelectedEvent = new CustomEvent('lookupselected', {detail:  selectedId });
        this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected = true;
        this.selectedName = selectedName;
        this.searchTerm = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
      this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    handleRemovePill() {
        this.isValueSelected = false;
    }

    onChange(event) {
        this.searchTerm = event.target.value;
        console.log('on change---'+this.searchTerm );
       
    }

    onChange1(event) {
        this.searchTerm1 = event.target.value;
    // console.log('searchTerm1---'+searchTerm1);
    }

    removeEntity1Name(event){
        this.selectedName=''
        this.searchTerm=''
       
        this.isValueSelected = false;

        console.log('searchTerm---'+  this.searchTerm );

    }

    removeEntity1Name1(event){
        this.selectedName1=''
        this.searchTerm1=''
        this.isValueSelected1 = false;
        console.log('searchTerm1---'+  this.searchTerm1 );

        console.log('selectedName1---'+  this.selectedName1 +   this.isValueSelected1);

    }

    handleClick1() {
       // this.searchTerm1 = '';
        this.inputClass1 = 'slds-has-focus';
        this.boxClass1 = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }
    onSelect1(event) {
        let selectedId = event.currentTarget.dataset.id;

        this.passEnitybId=event.currentTarget.dataset.id;

        const attributeChangeEvent = new FlowAttributeChangeEvent('partnerb',  this.passEnitybId);
        this.dispatchEvent(attributeChangeEvent);

        console.log('this.passEnitybId--'+this.passEnitybId)

        let selectedName = event.currentTarget.dataset.name;
        const valueSelectedEvent = new CustomEvent('lookupselected', {detail:  selectedId });
        this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected1 = true;
        this.selectedName1 = selectedName;
        this.searchTerm1 = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
      this.boxClass1 = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }


    
    handleNext() {
        console.log('available----'+this.availableActions)
        console.log('searchTerm1----'+this.searchTerm1)
        console.log('searchTerm----'+this.searchTerm)
        if((this.searchTerm1=='' || this.searchTerm=='' )){
            this.showErrormassage=true;


        }
        else if((this.searchTerm1==undefined || this.searchTerm==undefined)){
            this.showErrormassage= true;
        }
        else{
            this.showErrormassage= false;
        }
        console.log('showErrormassage----'+this.showErrormassage)
      if (this.availableActions.find((action) => action === "NEXT") && (this.showErrormassage== false)) {
        console.log('in In Loop');
        const navigateNextEvent = new FlowNavigationNextEvent();
        console.log('in after nect');
        this.dispatchEvent(navigateNextEvent);
      }
    }

}