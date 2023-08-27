// dashboard.component.ts
import { Note } from '../note.model';

import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  newNote: Note = { id: 0, title: '', text: '' };
  notes: Note[] = [];
  errMessage = '';

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getNotes().subscribe(
      (notes) => (this.notes = notes),
      (error) => (this.errMessage = 'Error loading notes.')
    );
  }

  addNote() {
    this.notesService.addNote(this.newNote).subscribe(
      () => {
        this.loadNotes();
        this.newNote = { id: 0, title: '', text: '' };
      },
      (error) => (this.errMessage = 'Error adding note.')
    );
  }
}
