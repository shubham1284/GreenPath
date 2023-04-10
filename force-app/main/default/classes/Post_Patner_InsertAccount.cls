@RestResource(urlMapping = '/PatnerInsertAccount/*')
global with sharing class Post_Patner_InsertAccount{
    @HttpPost
    global static void InsertLeadRequest(){
        
        List<NODWrapper> LeadsList = new List<NODWrapper>();
        List<Account> leadList = new List<Account>();
        RestRequest Req = RestContext.request;
        RestResponse res = RestContext.response;
        String body = Req.requestBody.toString().trim();
        
        if (body != null && body != ''){
            try{
                LeadsList = (List<NODWrapper>)JSON.deserialize(body, List<NODWrapper>.class);
                System.debug('LeadsList>>' + LeadsList);
                
                for (NODWrapper we : LeadsList){
                    Account l = new Account();
                    
                    if (we.Partner_Name != null && we.Partner_Name != ''){
                        l.Name = we.Partner_Name;
                    }
                    if (we.Partner_ID != null && we.Partner_ID != ''){
                        l.Credit_Union_ID__c = we.Partner_ID;
                    }
                   // if (we.Account_ID != null && we.Account_ID != ''){
                      //  l.Account_ID__c = we.Account_ID;
                    //}
                    if (we.SalesStage != null && we.SalesStage != ''){
                        l.Status__c = we.SalesStage;
                    }
                    if(we.ExternalFiled !=null && we.ExternalFiled!=''){
                        l.ExternalFiled__c = we.ExternalFiled;
                    }
                   
                    
                    LeadList.add(l);
                    System.debug('SizeofList' + LeadList.size());
                    System.debug('LeadList>>>>' + LeadList);
                    
                }
                
               // Schema.SObjectField ftoken = Account.Fields.ExternalFiled__c;
                Database.UpsertResult[] srList = Database.upsert (LeadList, false);
                System.debug('srlist>>' + srlist);
                res.statusCode = 200;
                res.responseBody = Blob.valueOf(String.valueof(LeadList));
                System.debug('res.responseBody>>' + res.responseBody);
                
            } catch (Exception e){
                
               // CommonUtilitiesHandler.handleExceptions(e);
                res.statusCode = 500;
                res.responseBody = Blob.valueOf(e.getMessage());
                System.debug('res.responseBody>>' + res.responseBody);
            }
        } else{
            res.statusCode = 500;
            res.responseBody = Blob.valueOf('Invalid Request');
        }
    }
    
    public class NODWrapper{
        public String Partner_Name  {get; set;}
        public String Partner_ID    {get; set;}
        public String Account_ID    {get; set;}
        public String SalesStage    {get; set;}
        public String ExternalFiled {get;set;}
    }
    
}