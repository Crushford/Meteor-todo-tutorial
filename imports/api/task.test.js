/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer){
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(()=> {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });
            });

            it("can delete owned task", () => {
                //find the internal implementation of the task method so we ca
                //test it in isolation
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];

                //set up a fake method invocation that looks like what the methos expects
                const invocation = { userId };

                //Run the method with 'this'set to the fake innovocation
                deleteTask.apply(invocation, [taskId]);

                //Verify that the methos does what we expect
                assert.equal(Tasks.find().count(), 0);
            });
        });
    });
}