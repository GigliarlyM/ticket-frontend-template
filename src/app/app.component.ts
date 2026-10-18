import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <main>
      <h1>{{ title }}</h1>
      <p>Boilerplate gerado pelo agente.</p>
    </main>
  `,
  styles: [
    `
      main {
        font-family: sans-serif;
        margin: 2rem;
      }
    `,
  ],
})
export class AppComponent {
  readonly title = "Boilerplate";
}
