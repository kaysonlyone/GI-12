// Import the 'fs' module for file system operations
const fs = require('fs')

// Import the 'chalk' library for coloring terminal output
const chalk = require('chalk')

// Function to add a new note
const addNote = (title, body) => {
    // Load existing notes
    const notes = loadNotes()
    // Check for duplicate note titles
    const duplicateNote = notes.find((note) => note.title === title)

    // If no duplicate, add the new note
    if (!duplicateNote) {
        notes.push({
            title: title, // Note title
            body: body   // Note body
        })
        // Save the updated notes list
        saveNotes(notes)
        // Log success message
        console.log(chalk.green.inverse('New note added!'))
    } else {
        // Log error message if title is taken
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Function to remove a note
const removeNote = (title) => {
    // Load existing notes
    const notes = loadNotes()
    // Filter out the note to be removed
    const notesToKeep = notes.filter((note) => note.title !== title)

    // If note was removed, save updated list and log success message
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        // Log error message if no note was found
        console.log(chalk.red.inverse('No note found!'))
    }    
}

// Function to list all notes
const listNotes = () => {
    // Load existing notes
    const notes = loadNotes()

    // Log header
    console.log(chalk.inverse('Your notes'))

    // Log each note title
    notes.forEach((note) => {
        console.log(note.title)
    })
}

// Function to read a specific note
const readNote = (title) => {
    // Load existing notes
    const notes = loadNotes()
    // Find the note with the given title
    const note = notes.find((note) => note.title === title)

    // If note is found, log its title and body
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        // Log error message if note is not found
        console.log(chalk.red.inverse('Note not found!'))
    }
}

// Function to save notes to a file
const saveNotes = (notes) => { 
    // Convert notes array to JSON string
    const dataJSON = JSON.stringify(notes)
    // Write JSON string to 'notes.json' file
    fs.writeFileSync('notes.json', dataJSON)
}

// Function to load notes from a file
const loadNotes = () => {
    try {
        // Read the 'notes.json' file
        const dataBuffer = fs.readFileSync('notes.json')
        // Convert buffer to string
        const dataJSON = dataBuffer.toString()
        // Parse JSON string to object and return
        return JSON.parse(dataJSON)
    } catch (e) {
        // Return empty array if file does not exist or error occurs
        return []
    }
}

// Export functions for use in other modules
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}