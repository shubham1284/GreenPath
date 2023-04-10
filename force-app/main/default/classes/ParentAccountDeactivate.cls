public class ParentAccountDeactivate {
 @future(callout=true)
    public static void BringAccount(Set<Id> accountIdset2)
    {
        //https://api.postalpincode.in/pincode/+pincode
        //String endpoint='https://api.postalpincode.in';
        Http p = new Http();
        HttpRequest request = new HttpRequest();
       // request.setEndpoint(endpoint);
        request.setHeader('Authorization', 'OAuth '+UserInfo.getSessionId());
        request.setMethod('post');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        // Set the body as a JSON object
       // request.setBody('{"name":"savage crocodile"}');
       system.JSONGenerator js= Json.createGenerator(true);
        js.writeStartObject();
        try
        {
            List<Account> ac = [Select Name,Phone,Move_to_FIQUEST__c from Account where Move_to_FIQUEST__c=true and Id IN:accountIdset2];
            //why iam using foir loop only expected filed values are send to another system.
            for(Account ea : ac)
            {
                js.writeStringField('AccountName', ea.Name);
                js.writeStringField('Phone', ea.Phone);
                js.writeStringField('Statsus', 'Success');
                js.writeNumberField('Code', 200);
            }
            
        }
        catch(Exception e)
        {
          js.writeStringField('Statsus', e.getMessage());
          js.writeNumberField('Code', 204);  
        }
        js.writeEndObject();
        String Op= js.getAsString();
        request.setBody(Op);
        system.debug('request>>'+request);
       //HttpResponse response = p.send(request);
        system.debug(op);
        
    }
}