const chalk = require('chalk')  // makes CLI output 'pretty'
const yargs = require('yargs')  // parses CLI input for easy manipulation
const notes = require('./notes.js')  // imports functions for the app
yargs.version('1.1.0')  //custom yargs version


//create add command
yargs.command({
    command: 'add',   // command to use on the CLI to initiate
    describe: 'Add a new note',  // description of what it does for the CLI help command
    builder: {  // builds what arguments it will take
        title: {
            describe: 'Note title',  // description of what it does for the CLI help command
            demandOption: true,  // makes it required
            type: 'string'  // sets the data type
        },
        body: {
            describe: 'Note body',  
            demandOption: true, 
            type: 'string'  
        }
    },
    handler: function(argv) {  // handles the input after submit
        notes.addNote(argv.title, argv.body)  // runs add method with input provided
    }
})

// create remove command
yargs.command({
    command: 'remove',   // command to use on the CLI to initiate
    describe: 'Remove a note',   // description of what it does for the CLI help command
    builder: {   
        title: {
            describe: 'Note title',  
            demandOption: true,  
            type: 'string'
        }
    },
    handler: function(argv) {  
        notes.removeNote(argv.title)   // runs the removeNote method with input provided
    }
})

// create list command
yargs.command({
    command: 'list',  // command to use on the CLI to initiate
    describe: 'List the notes',  // description of what it does for the CLI help command
    handler: function() {
       console.log(notes.listNotes())  // displays the list returned by the function
    }
})
// create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Read this note')
    }
})

// add, remove, read, list


//  command to parse the input information into manipulatable data
yargs.parse()




