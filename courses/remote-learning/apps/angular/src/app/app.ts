import { Component } from '@angular/core';
import { QuoteBoard } from './drills/quote-board/quote-board';

@Component({
  imports: [QuoteBoard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
