@isTEst
// Combine Test Class for   CommunityHomePageLWC and ComHomePage
public class CommunityHomePageLWCTest {
    public static testMethod  void testMethod1(){
        Account acc= new Account();
        acc.Name='cube84';
        insert acc;
        
        contact con = new contact();
        con.LastName='test';
        con.AccountId=acc.Id;
        con.LeadSource='CUNA';
        con.email='cube85@gmail.com';
        insert con;
        
          Profile p1 = [SELECT Id FROM Profile WHERE Name='System Administrator'];
        Profile p = [SELECT Id FROM Profile WHERE Name='HPF Partner Admin'];
        User u2 = new User(Alias = 'newUser', Email='newuser@testorg.com',
                           EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                           LocaleSidKey='en_US', ProfileId = p.Id,
                           TimeZoneSidKey='America/Los_Angeles', UserName='newuser@testorg.com',ContactId=con.Id);
         User u3 = new User(Alias = 'newUser', Email='newuse1r@testorg.com',
                           EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                           LocaleSidKey='en_US', ProfileId = p1.Id,
                           TimeZoneSidKey='America/Los_Angeles', UserName='newuser1@testorg.com');
        
        
        System.runAs(u2) {
            CommunityHomePageLWC homeLwc = new CommunityHomePageLWC();
            CommunityHomePageLWC.uderDetail();
           CommunityHomePageLWC.Accountname();
            CommunityHomePageLWC.TaskList();
            CommunityHomePageLWC.internalUserDetails();
            // This test class id for  ComHomePage also
            ComHomePage classs= new ComHomePage();
            ComHomePage.getObjectApiname(acc.id);
        }
        System.runAs(u3) {
             CommunityHomePageLWC.Accountname();

        }
    }
}