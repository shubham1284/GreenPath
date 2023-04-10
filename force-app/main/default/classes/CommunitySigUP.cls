public without sharing class CommunitySigUP {
    public CommunitySigUP(){}
    @auraEnabled(cacheable=true)
    
    public static list<contact> checkEmailExist(string email)
    {
        list<contact> conlist = new list<contact>();
        conlist=[select id ,name,email,AccountId ,Account.Name,Account.IsPartner,Portal_User__c from contact where email!=null];
        system.debug('conlist---'+conlist);
        
        return conlist;
        
    }
      @auraEnabled(cacheable=true)
    
    public static string getInternalUserEmailForNonPortal(string PartnerName)
    {
        Account accName= new Account();
         AccName=[SELECT id, name,Partner_Experience_Manager__r.Email FROM Account WHERE name=:PartnerName];
        return AccName.Partner_Experience_Manager__r.Email;
    }
    
    @auraEnabled(cacheable=true)
    
    public static list<string> AccountsForDomail( string searchName)
    {
        
        list<string> accountname= new list<string>();
        list<Account> AccName = new list<Account>();
        AccName=[SELECT id, name FROM Account WHERE name LIKE : searchName + '%' And 	Status__c!='Inactive'];
        system.debug('conlist---'+AccName);
        for(account ac:AccName){
            accountname.add(ac.name);
        }
        
        system.debug('accountname---'+accountname);
        
        return accountname;
        
    }
    
    @auraEnabled(cacheable=true)
    
    public static list<Account> CheckDomainWithAccountName(string email)
    {
        list<Account> Acc = new list<Account>();
        Acc=[select id ,name,IsPartner from Account ];
        system.debug('Acc---'+Acc);
        
        return Acc; 
    }
      @auraEnabled(cacheable=true)
      public static list<Account> nonPortalaccount(string email)
    {
        list<Account> Acc = new list<Account>();
        Acc=[select id ,name,IsPartner from Account where IsPartner=true];
        system.debug('Acc non---'+Acc);
        
        return Acc; 
    }
    
    @auraEnabled(cacheable=true)
    
    public static list<string> sendAllEmail(string email)
    {
        
        list<string> emaillist= new list<string>();
        list<contact> conlist = new list<contact>();
        conlist=[select id ,name,email,Portal_User__c from contact];
        for(contact con:conlist){
            
            emaillist.add(con.email);
        }
        
        return emaillist ;
        
        
    }
    
    
    
    @AuraEnabled
    
    public static contact insertcontactMethod(contact contactObj,string AccountID,string Email,string accName){
        try {
            account acc=[select id ,name from account where name=: AccName];
            
            system.Debug('accName----'+accName);
            system.Debug('contactObj----'+contactObj);
            system.Debug('AccountID----'+AccountID);
            contactObj.accountid=acc.id;
            contactObj.Email=Email;
            
           insert contactObj;
            system.debug('after inswr---'+contactObj);
            
            
            
            return contactObj;
        } catch (Exception exp) {
            system.debug('massage'+ exp.getMessage());
            throw new AuraHandledException(exp.getMessage());
            
        }
    }
    
    
    @AuraEnabled
    
    public static void inserUser(string contactId){
        
        system.Debug('inserUser contactId ----'+contactId);
        
        contact contactObj =[select id , Firstname ,Account.Contract_Organization__c, Lastname,email from contact where id=:contactId];
        system.debug('after inswr---'+contactObj);
        
        UserRole portalRole = [Select Id ,name From UserRole Where PortalType = 'None' Limit 1];
        
      //  Profile profile1 =[Select Id ,name  from Profile where name='Partner custom profile'];
        
        list<Profile> profile1=[Select Id ,name  from Profile];
        map<string,id> proInfo = new map<string,id>();
        for(profile p:profile1){
            proInfo.put(p.name,p.id);
        }
        
        system.debug('proInfo----'+ proInfo);
        string x = proInfo.get('Partner custom profile') ;
        system.debug('x----'+ x);
        
        User portalAccountOwner1 = new User();
        //  portalAccountOwner1.UserRoleId = portalRole.Id;
        if(contactObj.Account.Contract_Organization__c=='HPF'){
            portalAccountOwner1.ProfileId = proInfo.get('HPF Partner User') ;
        }
        else{
            portalAccountOwner1.ProfileId = proInfo.get('Partner User') ;
        }
       
        portalAccountOwner1.Username = contactObj.Email ;
        portalAccountOwner1.Alias = 'sfdc';
        portalAccountOwner1.Email=contactObj.Email;
        portalAccountOwner1.EmailEncodingKey='UTF-8';
        portalAccountOwner1.Firstname=contactObj.FirstName;
        portalAccountOwner1.Lastname=contactObj.LastName;
        portalAccountOwner1.LanguageLocaleKey='en_US';
        portalAccountOwner1.LocaleSidKey='en_US';
        portalAccountOwner1.TimeZoneSidKey='America/Chicago';
        portalAccountOwner1.ContactId=contactObj.Id;
      
        
       Database.insert(portalAccountOwner1);
        system.debug('portalAccountOwner1---'+portalAccountOwner1);
        
        
    }
    
    
    @AuraEnabled
    
    public static void createUSerForExistingContact(string contactId){
        
        system.Debug('inserUser contactId ----'+contactId);
        
        contact contactObj =[select id , Firstname ,Account.Contract_Organization__c, Lastname,email from contact where id=:contactId];
      //  system.debug('after inswr---'+contactObj);
        
        UserRole portalRole = [Select Id ,name From UserRole Where PortalType = 'None' Limit 1];
        
     //   Profile profile1 =[Select Id ,name  from Profile where name='Partner custom profile'];
     list<Profile> profile1=[Select Id ,name  from Profile];
        map<string,id> proInfo = new map<string,id>();
        for(profile p:profile1){
            proInfo.put(p.name,p.id);
        }
        
        system.debug('proInfo----'+ proInfo);
        string x = proInfo.get('Partner custom profile') ;
        system.debug('x----'+ x);
        
        User portalAccountOwner1 = new User();
        //  portalAccountOwner1.UserRoleId = portalRole.Id;
       if(contactObj.Account.Contract_Organization__c=='HPF'){
            portalAccountOwner1.ProfileId = proInfo.get('HPF Partner User') ;
        }
        else{
            portalAccountOwner1.ProfileId = proInfo.get('Partner User') ;
        }
        portalAccountOwner1.Username = contactObj.Email ;
        portalAccountOwner1.Alias = 'sfdc';
        portalAccountOwner1.Email=contactObj.Email;
        portalAccountOwner1.EmailEncodingKey='UTF-8';
        portalAccountOwner1.Firstname=contactObj.FirstName;
        portalAccountOwner1.Lastname=contactObj.LastName;
        portalAccountOwner1.LanguageLocaleKey='en_US';
        portalAccountOwner1.LocaleSidKey='en_US';
        portalAccountOwner1.TimeZoneSidKey='America/Chicago';
        portalAccountOwner1.ContactId=contactObj.Id;
        //  portalAccountOwner1.Accountid=contactObj.Accountid;
        
       Database.insert(portalAccountOwner1);
        system.debug('portalAccountOwner1---'+portalAccountOwner1);
        
        
    }
    
    @auraEnabled(cacheable=true)
    public static contact GetNotPortalUserDetails(string contactId){
        
        system.Debug('inserUser contactId ----'+contactId);
        
        contact contactObj =[select id , Firstname ,phone,title, Lastname,email from contact where id=:contactId];
        system.debug('after newwww---'+contactObj);
        return contactObj;
        
        
    }
    
       @auraEnabled
    public static contact updateNonPortalUser(contact contactobj , string accName){
        
        system.Debug('NPu nut up ----'+contactobj);
        system.Debug('NPu accname ----'+accName);
        try{
            If( !String.isBlank(accName) ){
                 account acc=[select id ,name from account where name=: accName];
        system.Debug('acc.id ----'+acc.id);
           contactobj.accountid=acc.id;  
                system.Debug('yes black');
}
 
            
        
             system.Debug('NPu contactId updat ----'+contactobj);
        update contactobj;
       
       
        }
        catch (Exception exp) {
            system.debug('line---'+exp.getLineNumber());
            throw new AuraHandledException(exp.getMessage());
        }
        
        
              
        return contactObj;
        
        
    }
    
    
    
    
}