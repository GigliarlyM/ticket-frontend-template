# Ticket App

This is a simple ticket list application.

## Features
- Create a ticket with title and description
- List all tickets

## Business Rules
- Every ticket must have a title

## Integration

To integrate this into your Angular application:

1. Ensure you have the necessary dependencies (Angular, RxJS).
2. Copy the `src/app/models`, `src/app/services`, and `src/app/components` folders into your project.
3. If you are using standalone components (Angular 14+), you can directly import `TicketListComponent` into your app component or routing.
4. If you are using NgModules, you can create a module that declares `TicketListComponent` and `TicketCardComponent`, and provides `TicketService`. Then import that module into your `AppModule`.
5. Add `<app-ticket-list></app-ticket-list>` to your template where you want the ticket list to appear.

## Components
- `TicketListComponent`: Displays the list of tickets and a form to create new tickets.
- `TicketCardComponent`: Displays a single ticket.

## Service
- `TicketService`: Manages the list of tickets in memory.
