const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const commandTitleFlagConfig = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}
const commandBodyFlagConfig = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: commandTitleFlagConfig,
    body: commandBodyFlagConfig
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: commandTitleFlagConfig
  })
  .command('remove', 'Remove a note', {
    title: commandTitleFlagConfig
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add' ) {
  var note = notes.addNote(argv.title, argv.body);

  if (!_.isNil(note)) {
    console.log(`Note created:`);
    notes.logNote(note);
  } else {
    console.log('Note not created.');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();

  console.log(`Printing: ${allNotes.length} notes(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);

  if (note) {
    console.log(`Note found:`)
    notes.logNote(note);
  } else {
    console.log('Note not found.');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);

  noteRemoved ? console.log('Note removed.') : console.log('Note not found.');
} else {
  console.log('Command not recognised');
}
