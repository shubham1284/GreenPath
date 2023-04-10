public without sharing class ProductSerivcesDetails {
  public ProductSerivcesDetails(){}
    @auraEnabled(cacheable=true)
    public static string partnerProServices()
    {
         Id userId =UserInfo.getUserId(); 
          User Loggeduser = [SELECT id,name,accountid,Account.Name,FirstName FROM User WHERE Id =: userId];

        list<Partner_Product_and_Service__c> proSerList=[SELECT Id, Name,  Partner_Account__c, Type_of_Product__c, Partner_Account__r.Name,
                                              Description__c, Status__c, URL_Website__c, Phone_Number__c,
                                              If_Others_Please_Specify__c FROM Partner_Product_and_Service__c where Partner_Account__c=:Loggeduser.accountid ];
         List<wrapper> wrap = new List<wrapper> ();
         for(Partner_Product_and_Service__c p : proSerList) {
            wrapper w = new wrapper(p);
          //  w.accoutname=p.Partner_Account__r.name;
           // w.name=p.Name;
            wrap.add(w);
        }
        system.debug('wrap-----+'+ wrap);
          return JSON.serialize(wrap);
      //  return proSerList;
    }



   @AuraEnabled
    public static string saveon(string  updatedPriceEntry1){
        
        List<wrapper> hh=(List<wrapper>)Json.deserialize(updatedPriceEntry1, list<wrapper>.class);
        
        system.debug('opp save:'+hh.size());
       // system.debug('rid save:'+rid);
        
        
        List<Partner_Product_and_Service__c> PricebookEntryList=new List<Partner_Product_and_Service__c>();
        
        for(wrapper ww:hh){
            PricebookEntryList.add(ww.li);
        }
        
        
        

        update PricebookEntryList;
        return 'Sucessfully updated records!!!!';

        
    }    
    
     public class wrapper {
        public Partner_Product_and_Service__c li;
        
       // public string accoutname{get;set;}
       // public string name{get;set;}
        
     //   public Boolean isSelected; //indicate snag is selected or no for approval
        
        public wrapper(Partner_Product_and_Service__c item) {
            li = new Partner_Product_and_Service__c();
            li=item;
            
          //  isSelected = false;
            
        }
    }
    
}