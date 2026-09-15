import { TestBed } from "@angular/core/testing";
import { QuoteBoard } from "./quote-board";

describe("QuoteBoard", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteBoard],
    }).compileComponents();
  });

  it("renders the shared EURUSD sample quote", async () => {
    const fixture = TestBed.createComponent(QuoteBoard);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const symbolCell = compiled.querySelector("th[scope='row']");
    expect(symbolCell?.textContent).toContain("EURUSD");
    expect(compiled.textContent).toContain("1.08421");
  });
});
