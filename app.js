// Import the 'chalk' library for coloring terminal output
const chalk = require('chalk')

// Import the 'yargs' library for command-line argument parsing
const yargs = require('yargs')

// Import custom 'notes' module for note operations
const notes = require('./notes.js')

// Customize yargs version to '1.1.0'
yargs.version('1.1.0')

// Define the 'add' command for adding a new note
yargs.command({
    // Command keyword
    command: 'add',
    // Description of the command
    describe: 'Add a new note',
    // Define options (arguments) for the command
    builder: {
        // 'title' option with description and type
        title: {
            describe: 'Note title',
            demandOption: true, // Required option
            type: 'string' // Must be a string
        },
        // 'body' option with description and type
        body: {
            describe: 'Note body',
            demandOption: true, // Required option
            type: 'string' // Must be a string
        }
    },
    // Function to execute when the command is run
    handler(argv) {
        // Call 'addNote' function from 'notes' module with title and body
        notes.addNote(argv.title, argv.body)
    }
})

// Define the 'remove' command for removing a note
yargs.command({
    // Command keyword
    command: 'remove',
    // Description of the command
    describe: 'Remove a note',
    // Define options (arguments) for the command
    builder: {
        // 'title' option with description and type
        title: {
            describe: 'Note title',
            demandOption: true, // Required option
            type: 'string' // Must be a string
        }
    },
    // Function to execute when the command is run
    handler(argv) {
        // Call 'removeNote' function from 'notes' module with title
        notes.removeNote(argv.title)
    }
})

// Define the 'list' command for listing all notes
yargs.command({
    // Command keyword
    command: 'list',
    // Description of the command
    describe: 'List your notes',
    // Function to execute when the command is run
    handler() {
        // Call 'listNotes' function from 'notes' module
        notes.listNotes()
    }
})

// Define the 'read' command for reading a specific note
yargs.command({
    // Command keyword
    command: 'read',
    // Description of the command
    describe: 'Read a note',
    // Define options (arguments) for the command
    builder: {
        // 'title' option with description and type
        title: {
            describe: 'Note title',
            demandOption: true, // Required option
            type: 'string' // Must be a string
        }
    },
    // Function to execute when the command is run
    handler(argv) {
        // Call 'readNote' function from 'notes' module with title
        notes.readNote(argv.title)
    }
})

// Parse and process the command-line arguments
yargs.parse()