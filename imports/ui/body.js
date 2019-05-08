import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
 
import './body.html';
import './task.js';


Template.body.onCreated(function bodyOnCreated(){
    this.state = new ReactiveDict();
})
 
Template.body.helpers({
tasks(){
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
        //if hide completed is checked, filter tasks
        return Tasks.find( {checked: {$ne:true } }, {sort: {createdAt:-1} });
    }
    //else return all tasks
    return Tasks.find({}, {sort: {createdAt:-1} });
    },
    incompleteCount(){
        return Tasks.find({ checked: { $ne:true } }).count();
    },
});

Template.body.events({
    'submit .new-task'(event){
        //prevent default broswer form submmit
        event.preventDefault();

        // console.log(event);

        //get value from form
        const target = event.target;
        const text = target.text.value;

        //insert a task into the colelction
        Tasks.insert({
            text,
            createdAt: new Date(),
        });

        //clear form
        target.text.value = '';
    },
    "change .hide-completed input"(event, instance) {
        instance.state.set('hideCompleted', event.target.checked)
    },
});