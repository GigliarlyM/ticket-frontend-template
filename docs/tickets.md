# Tickets

Aplicação de lista de tickets usada para validar o fluxo real de publicação.

## Funcionalidades

- Criar ticket
- Listar tickets
- Avançar o status do ticket (Aberto -> Em andamento -> Concluído)
- Visualizar detalhes do ticket selecionado

## Regras de negócio

- O título do ticket é obrigatório. Título vazio (ou apenas com espaços) bloqueia a criação.
- O título e a descrição são normalizados com `trim()` antes de serem persistidos.
- Todo ticket nasce com o status `open` (Aberto).
- A lista é exibida do ticket mais recente para o mais antigo.
- Os tickets ficam em memória (`TicketService`); não há persistência entre recarregamentos.

## Critérios de aceite

- É possível criar um ticket informando apenas um título.
- A lista mostra todos os tickets criados com título, status e data de criação.
- O contador de tickets é atualizado a cada criação.

## Fora de escopo

- Login / autenticação
- Backend e persistência real
- Edição e exclusão de tickets pela interface

## Arquitetura

| Arquivo | Responsabilidade |
| --- | --- |
| `src/app/models/ticket.model.ts` | Tipos `Ticket`, `TicketStatus`, labels e transição de status |
| `src/app/services/ticket.service.ts` | Estado em memória, criação e atualização de tickets |
| `src/app/components/ticket-list/*` | Tela de lista, formulário de criação e contador |
| `src/app/components/ticket-card/*` | Componente de apresentação de um ticket |

## Integração

Os componentes são `standalone`. A tela de lista expõe o seletor `app-ticket-list` e o card expõe
`app-ticket-card`.

Exemplo de uso no template raiz:

```html
<app-ticket-list></app-ticket-list>
```

E no componente raiz:

```ts
import { TicketListComponent } from './components/ticket-list/ticket-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TicketListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

## API do serviço

```ts
const ticket = ticketService.create({ title: 'Erro no login', description: 'Opcional' });
ticketService.updateStatus(ticket.id, 'done');
ticketService.tickets$.subscribe((tickets) => console.log(tickets));
```
