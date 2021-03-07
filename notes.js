const fs = require('fs')  // enables file save abilities
const chalk = require('chalk')  // makes CLI output 'pretty'


// Adding a new note
const addNote = function (title, body) {
    const notes = loadNotes()   // loading list of active notes
    const duplicateNotes = notes.filter(function(note){  // checking to see if note name exists
        return note.title === title  // if it matches, it adds to the array
    })
    if (duplicateNotes.length === 0) {  // if array is empty, ok to add new note
        notes.push({  // pushing the new note as an object to the array
            title: title,
            body: body
        })
        saveNotes(notes)  // saving the notes array
        console.log(chalk.green.bold('New note added!'))  // confirming save to user

    } else {
        console.log(chalk.red.bold('Note title taken..'))  // notifying user name is taken
    }
}

// Removing an existing note
const removeNote = function (title) {
    const notes = loadNotes()  // loading list of active notes
    const notesToKeep = notes.filter(function(note){ // filtering through current notes
        return note.title !== title  // keeping all notes that DON'T match the title to delete
    })

        if (notes.length > notesToKeep.lenght) {
            console.log(chalk.green.bold('Note deleted!'))  // confirming save to user
        } else {
            console.log(chalk.red.bold('No note deleted!'))  // confirming save to user

        }
        saveNotes(notesToKeep)  // saving all notes except the one to delete 

    } 

// Saving notes to file
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes) // turns data into string for saving
    fs.writeFileSync('notes.json', dataJSON)  // saves data to notes.json file

}

// Listing Note Titles

const listNotes = function () {
    const notes = loadNotes()

}

// Loading list of notes
const loadNotes = function() {
    try {  // error handling
        const dataBuffer = fs.readFileSync('notes.json')  // loading data from file, illegible
        const dataJSON = dataBuffer.toString()  // converting illegible data to string
        return JSON.parse(dataJSON)  // converting data to JSON format
    } catch (e) {  // catches the error
        return []  // returns an empty string if there is no data/file to load
    }
}

// exporting list of functions to use in other areas of the app
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    loadNotes: loadNotes,
    listNotes: listNotes
}
