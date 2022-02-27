const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) => note.title === title)
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        console.log(notes)
        saveNotes(notes)
    } else {
        console.log('Note title taken')
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title != title )

    if (notes.length === notesToKeep.length){
        console.log(chalk.red.inverse('No note found'))
        return
    } else {
        console.log(chalk.green.inverse('note removed'))
    }
    
    console.log(notesToKeep)
    saveNotes(notesToKeep)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
    console.log('saving notes')
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        console.log('error loading file or file not exist')
        return []
    }
}

const listNotes = () => {
    console.log(chalk.blue.inverse('Your notes'))
    const notes = loadNotes()
    notes.forEach( (a) => {
        console.log(a.title)
        console.log(a.body)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find( (a) => a.title === title)

    if (noteFound) {
        console.log(noteFound.title)
        console.log(noteFound.body)
    } else {
        console.log(chalk.inverse('Note not found'))
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};