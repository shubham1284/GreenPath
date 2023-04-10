import { LightningElement , wire, track  } from 'lwc';
import TaskList from '@salesforce/apex/CommunityHomePageLWC.TaskList';
import completedTaskLists from '@salesforce/apex/CommunityHomePageLWC.completedTaskList';
import { NavigationMixin } from 'lightning/navigation';
export default class dailyTasklist extends NavigationMixin (LightningElement) {

    duetasklist;
    pendingTaskListAvailable;
    CompletedTaskListAvailable;
    countTask
    showCompletedList;
    showpendingList=true;

    pendingTaskList;
    CompletedTaskList;
    counter = 1;

    value = 'Your Pending Action Items';


    get options() {
        return [
          
            { label: 'Your Completed Action Items', value: 'Your Completed Action Items' },
            { label: 'Your Pending Action Items', value: 'Your Pending Action Items' },
        ];
    }

    


    @wire(TaskList) 
    TaskList({ error, data }) {

        if (data) {
            console.log('data---'+data) ;  
        this.pendingTaskList= JSON.parse(data);
        console.log('tasklist---',this.pendingTaskList) ;  
      
        if(this.pendingTaskList.length === 0 ){
            this.taskListAvailable=false
            console.log('taskListAvailable---'+this.taskListAvailable) ; 
        }

        if(this.pendingTaskList.length > 0 ){
            this.countTask=this.pendingTaskList.length ;
           this.pendingTaskListAvailable=true
            console.log('taskListAvailable---'+this.taskListAvailable) ; 
        }

        } else if (error) {
        console.log('error intasklist'+ JSON.stringify(error));
        }
    }


    @wire(completedTaskLists) 
    completedTaskLists({ error, data }) {

        if (data) {
            console.log('completed data---'+data) ;  
        this.CompletedTaskList= JSON.parse(data);
        console.log('CompletedTaskList---',this.CompletedTaskList) ;  
      
        if(this.CompletedTaskList.length === 0 ){
            this.CompletedTaskListAvailable=false
            console.log('CompletedTaskListAvailable---'+this.CompletedTaskListAvailable) ; 
        }

        if(this.CompletedTaskList.length > 0 ){
          
           this.CompletedTaskListAvailable=true
            console.log('taskListAvailable---'+this.CompletedTaskListAvailable) ; 
        }

        } else if (error) {
        console.log('error intasklist'+ JSON.stringify(error));
        }
    }

  



    handleChange(event) {
        console.log('handleChange----');
        this.value = event.detail.value;
        console.log('value----'+this.value);
        if(this.value==='Your Pending Action Items'){
            this.showpendingList=true;
            this.showCompletedList=false;
        }
        if(this.value==='Your Completed Action Items'){
            this.showCompletedList=true;
            this.showpendingList=false;

        }
    }

    handleRecordClick(event) {
        const recordId = event.currentTarget.dataset.recordId;
        console.log('recordId----',recordId)
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            }
        });
    }
    

}