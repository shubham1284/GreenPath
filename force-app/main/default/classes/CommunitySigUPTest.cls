@isTEst
public class CommunitySigUPTest {
    public static testMethod  void testMethod1(){
        
       Account acc= new Account();
        acc.Name='cube84';
        insert acc;
        
       list<contact> conList = new list <contact>();
        contact con = new contact();
        con.LastName='test';
        con.AccountId=acc.Id;
        con.LeadSource='CUNA';
        con.email='cube85@gmail.com';
        conList.add(con);
        
        contact con2 = new contact();
        con2.LastName='test';
        con2.AccountId=acc.Id;
          con.email='cube859@gmail.com';
        con2.LeadSource='CUNA';
        
        contact con1 = new contact();
        con1.LastName='testA';
        con1.AccountId=acc.Id;
        con1.LeadSource='CUNA';
        conList.add(con1);
        
        insert conList;
        CommunitySigUP signUp = new CommunitySigUP();
        CommunitySigUP.checkEmailExist('cube84@gmail.com');
        CommunitySigUP.getInternalUserEmailForNonPortal('cube84');
        CommunitySigUP.AccountsForDomail('cube84');
        CommunitySigUP.CheckDomainWithAccountName('cube84@gmail.com');
        CommunitySigUP.nonPortalaccount('cube844@gmail.com');
        CommunitySigUP.sendAllEmail('cube84All@gmail.com');
        CommunitySigUP.insertcontactMethod(con2,acc.Id,'cube84E@gmail.com','cube84');
        CommunitySigUP.inserUser(con.Id);
        CommunitySigUP.createUSerForExistingContact(con2.Id);
        CommunitySigUP.GetNotPortalUserDetails(con.Id);
        CommunitySigUP.updateNonPortalUser(con,'cube84');
        
        
    }

}