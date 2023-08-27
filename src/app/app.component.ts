import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newNote: Note = { id: 0, title: '', text: '' }; // Make sure newNote adheres to the Note interface
  notes: Note[] = [];
  errMessage = '';
  isAuthenticated: boolean = false;

  constructor(
    private notesService: NotesService,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isUserAuthenticated();
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
        this.newNote = { id: 0, title: '', text: '' }; // Reset newNote
      },
      (error) => (this.errMessage = 'Error adding note.')
    );
  }
}
