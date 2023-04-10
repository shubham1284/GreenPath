public class ComHomePage {
    public ComHomePage(){}
      @auraEnabled(cacheable=true)
    public static string getObjectApiname(string recId) 
    { 
        id myRecordId = recId;
        string sObjName = myRecordId.getSObjectType().getDescribe().getName();
        system.debug('sObjName  conn' +sObjName); // this works
        return sObjName;
    }
}