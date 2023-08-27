import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notesUrl = 'http://localhost:3000/notes'; // Adjust this URL to match your JSON server endpoint

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl).pipe(
      catchError((error) => {
        console.error('Error loading notes:', error);
        return [];
      })
    );
  }

  addNote(note: Note): Observable<any> {
    return this.http.post(this.notesUrl, note).pipe(
      catchError((error) => {
        console.error('Error adding note:', error);
        throw error;
      })
    );
  }
}
