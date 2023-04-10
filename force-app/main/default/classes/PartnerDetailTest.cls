@isTEst
public class PartnerDetailTest {
    public static testMethod  void testMethod1(){
        Account acc= new Account();
        acc.Name='cube84';
        insert acc;
        
        Account acc1= new Account();
        acc1.Name='cube84';
        acc1.BillingCountryCode='NA';
        insert acc1;
        
        contact con = new contact();
        con.LastName='test';
        con.AccountId=acc.Id;
        con.LeadSource='CUNA';
        con.email='cube85@gmail.com';
        insert con;
        
        Profile p = [SELECT Id FROM Profile WHERE Name='HPF Partner Admin'];
        User u2 = new User(Alias = 'newUser', Email='newuser@testorg.com',
                           EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                           LocaleSidKey='en_US', ProfileId = p.Id,
                           TimeZoneSidKey='America/Los_Angeles', UserName='newuser@testorg.com',ContactId=con.Id);
        System.runAs(u2) {
            PartnerDetail partDetail= new PartnerDetail();
            PartnerDetail.partnerDetailRecord();
            PartnerDetail.userInfo();
            PartnerDetail.userInfo();
          
            try{
                  PartnerDetail.updatePartnerDetails(acc);
                PartnerDetail.updatePartnerDetails(acc1);
            }
            catch (AuraHandledException  ex) {
                System.assertEquals('Script-thrown exception', ex.getMessage());
            }  
        }
    }
    
}