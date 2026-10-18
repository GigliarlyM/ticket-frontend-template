import { TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render the title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector("h1") as HTMLElement;
    expect(heading.textContent).toContain("Boilerplate");
  });
});
