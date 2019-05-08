import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
 
import './body.html';
 
Template.body.helpers({
tasks(){
    return Tasks.find({}, {sort: {createdAt:-1} });
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
});