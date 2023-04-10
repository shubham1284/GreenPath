public with sharing class PartnerDetail {
     public PartnerDetail(){}
    @auraEnabled(cacheable=true)
    public static account partnerDetailRecord() 
    { 
        Id userId =UserInfo.getUserId();  
        User Loggeduser = [SELECT   id,name,accountid,Account.Name,FirstName FROM User WHERE Id =: userId];
        Account acc=[select id ,GPFW_Unique_Phone_Number__c,Co_Branded_URL__c,RecordTypeId, RecordType.Name,ShippingStreet,	Accounts_Receivable_Payment_Method__c,	Price_Increase_Month__c,Billing_Codes__c,Billing_Customer_Number__c,
                     Pricing_Decision_Notes__c,Program_Notes__c,Billing_Method__c,	Renewal_3__c,Billing_Notes__c,Revenue_stakeholder__c,Frequency__c,
                     Special_Pricing__c,Month_for_Billing__c,Special_Pricing_Notes__c,Original_Contractual_Revenue__c,News_Release__c, ShippingCity, ShippingState, ShippingPostalCode, ShippingCountry,Partner_s_general_website__c,ShippingAddress,Website,name,Partner_AKAs_Previously_Known_As__c,PersonMailingAddress,Number_of_branches__c,Web_Link__c,
                     Routing_Numbers__c,Program_Start_Date__c,Partner_Experience_Manager__c,Partner_Experience_Manager__r.name from Account where id=:Loggeduser.accountid];
        return acc;
    }
    
      @auraEnabled(cacheable=true)
    public static User userInfo()
    {
         Id userId =UserInfo.getUserId(); 
        User Loggeduser = [SELECT id,name,profile.name,accountid,Account.Name,FirstName FROM User WHERE Id =: userId];
    return Loggeduser;
    
    } 
    
    
      @auraEnabled
    public static Account updatePartnerDetails(Account  accRecords ){
        try {
        system.debug('accc rec---'+accRecords);
        update  accRecords;
        return accRecords;
        }
        catch (Exception e) {

            String errorMsg = e.getMessage();
          String pureErrorMsg = errorMsg.substringAfter('_EXCEPTION,');
       //  pureErrorMsg = pureErrorMsg.Substring(0, (pureErrorMsg.length()-4));
             // return ErrorMsg;
            throw new AuraHandledException(errorMsg);
            
        }
        
    }

}