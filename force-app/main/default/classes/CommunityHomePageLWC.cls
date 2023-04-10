public without sharing class CommunityHomePageLWC {
    public CommunityHomePageLWC(){}
    
     @auraEnabled(cacheable=true)

    public static user uderDetail( ){
        Id userId =UserInfo.getUserId(); 
        User Loggeduser = [SELECT id,name,Account.Name,FirstName FROM User WHERE Id =: userId];
        return Loggeduser;
    }
    
     @auraEnabled(cacheable=true)
    
    public static string Accountname( ){
        string accountName;
         Id userId =UserInfo.getUserId(); 
        User Loggeduser = [SELECT id,name,Account.Name,FirstName FROM User WHERE Id =: userId];
        if(Loggeduser.Account.Name!=Null || Loggeduser.Account.Name!='' ){
            accountName=Loggeduser.Account.Name;
        }
        else{
            accountName='NA';
        }
        system.debug('accc---'+accountName);
        return accountName;
        
        
    }
    
     @auraEnabled(cacheable=true)
    
    public static list<Task>  TaskList( ){
         Id userId =UserInfo.getUserId(); 
        system.debug('id---'+userId);
        User Loggeduser = [SELECT id,name,accountid,Account.Name,FirstName FROM User WHERE Id =: userId];
         system.debug('Loggeduser---'+Loggeduser);
        list<Task>  taskList = new   list<Task> ();
        
        taskList=[SELECT Id, WhoId, WhatId, Subject, Status, Priority, OwnerId, Type FROM Task where WhatId=:Loggeduser.accountid and Status!='Completed' and OwnerId =:userId ];
        system.debug('taskList---'+taskList);
         
        return  taskList;
        
    }
    
    
     @auraEnabled(cacheable=true)
    
    public static Account  internalUserDetails( ){
          Id userId =UserInfo.getUserId(); 
           User Loggeduser = [SELECT id,name,accountid,Account.Name,FirstName FROM User WHERE Id =: userId];
        
        Account acc= [SELECT Id, Internal_Co_Owner__c ,Internal_Co_Owner__r.name,Internal_Co_Owner__r.Email,Internal_Co_Owner__r.CompanyName,Internal_Co_Owner__r.Title,Internal_Co_Owner__r.MediumPhotoUrl,Internal_Co_Owner__r.Phone,Internal_Co_Owner__r.Username,
                      Partner_Experience_Manager__c,Partner_Experience_Manager__r.Name, Partner_Experience_Manager__r.Email,Partner_Experience_Manager__r.CompanyName,Partner_Experience_Manager__r.Title,Partner_Experience_Manager__r.Phone,Partner_Experience_Manager__r.Username,
                      Partner_Experience_Manager__r.MediumPhotoUrl
                      FROM Account where id=:Loggeduser.accountid];
        
        return acc;
        
        
        
        
        
    }
    
    
}