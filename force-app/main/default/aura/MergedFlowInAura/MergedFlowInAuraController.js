({
	doInit : function(component, event, helper) {
       component.set('v.isOpen', true);
       var flow = component.find('flow');
       flow.startFlow('Test_merge_screen');
    },

closeFlowModal : function(component, event, helper) {
        component.set("v.isOpen", false);
    },

closeModalOnFinish : function(component, event, helper) {
    var status=event.getParam('status');
    console.log('status---'+status);
        if(event.getParam('status') === "FINISHED") {
            component.set("v.isOpen", false);
        }
    }
})