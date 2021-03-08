const fs = require('fs')        // enables file save abilities
const chalk = require('chalk')  // makes CLI output 'pretty'


// Adding a new note
const addNote = (title, body) => {
    const notes = loadNotes()                                           // loading list of active notes
                                                                         
    const duplicateNote = notes.find((note) => note.title === title) 
        if (!duplicateNote) {                                           // if array is empty, ok to add new note
        notes.push({                                                    // pushing the new note as an object to the array
            title: title,
            body: body
        })
        saveNotes(notes)                                   // saving the notes array
        console.log(chalk.green.bold('New note added!'))   // confirming save to user
    } else {
        console.log(chalk.red.bold('Note title taken..'))  // notifying user name is taken
    }
}

// Removing an existing note
const removeNote = (title) => {
    const notes = loadNotes()                                           // loading list of active notes
    const notesToKeep = notes.filter((note) => note.title !== title)    // filtering notes keeping all that DON'T match delete request
        if (notes.length > notesToKeep.length) {                        // confirming new array is smaller than original
            saveNotes(notesToKeep)                                      // saving all notes except the one to delete
            console.log(chalk.green.bold('Note deleted!'))              // confirming save to user
        } else {
            console.log(chalk.red.bold('No note deleted!'))             // advising no note deleted since array size didn't change
        }
    } 

// Saving notes to file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)          // turns data into string for saving
    fs.writeFileSync('notes.json', dataJSON)        // saves data to notes.json file
}

// Listing Note Titles
const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

// Loading list of notes
const loadNotes = () => {
    try {                                                   // error handling
        const dataBuffer = fs.readFileSync('notes.json')    // loading data from file, illegible
        const dataJSON = dataBuffer.toString()              // converting illegible data to string
        return JSON.parse(dataJSON)                         // converting data to JSON format
    } catch (e) {                                           // catches the error
        return []                                           // returns an empty string if there is no data/file to load
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title) // checking to see if note name exists
    if (note) {
        console.log(chalk.rgb(255, 136, 0).bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

// exporting list of functions to use in other areas of the app
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    loadNotes: loadNotes,
    listNotes: listNotes,
    readNote: readNote
}
