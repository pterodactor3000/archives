import { Component } from "@angular/core";
import { getQuoteRows } from "@remote-learning/domain";

@Component({
  selector: "app-quote-board",
  styleUrl: "./quote-board.css",
  templateUrl: "./quote-board.html",
})
export class QuoteBoard {
  protected readonly rows = getQuoteRows();
}
