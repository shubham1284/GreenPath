({    
    invoke: function(component, event, helper) {
      var record = component.get("v.recordId");
    console.log('record----'+record);
    
    var urlNav= 'https://greenpath--cube84.sandbox.lightning.force.com/lightning/r/Account/'+record+'/view';
       window.open(urlNav,"_self");
      $A.get('e.force:refreshView').fire(); 
    }
})