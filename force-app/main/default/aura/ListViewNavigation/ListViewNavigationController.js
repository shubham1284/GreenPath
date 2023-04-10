({    
    invoke: function(component, event, helper) {
    var urlNav= 'https://greenpath--cube84.sandbox.lightning.force.com/lightning/o/Account/list?filterName=Recent';
       window.open(urlNav,"_self");
      //$A.get('e.force:refreshView').fire(); 
    } 
    
})