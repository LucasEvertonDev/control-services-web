import { DateHelper } from './../../../../core/helpers/date-helper';
import { AvisoService } from './../../../../shared/services/snackbar.service';
import { Component , signal, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventChangeArg, EventInput, EventMountArg, EventDropArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent {
  private atendimentos: EventInput[] = [];
  public calendarVisible = signal(true);
  public calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    themeSystem: "sandstone",
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    businessHours: {
      startTime: '7:00', // a start time (10am in this example)
      endTime: '19:00', // an end time (6pm in this example),
      daysOfWeek: [ 1, 2, 3, 4, 5,6 ],
    },
    events: this.carregarEventos.bind(this),
    dayHeaderClassNames: 'header_novo',
    locale:'pt-br',
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    initialView: 'dayGridMonth', // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    slotMinTime: '7:00',
    slotMaxTime: '19:00',
    buttonText: {
      today:    'HOJE',
      month:    'MÊS',
      week:     'SEMANA',
      day:      'DIA',
      list:     'LISTA',
      next: '>',
      prev: '<',

    },
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
      }
    },
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventChange: ((arg: EventChangeArg) => {
      this.remarcarAgendamento(arg.event.id, arg.event.start, arg.event.end, arg.oldEvent._context.calendarApi.view.type, arg);
    }),
    eventDrop: (arg: EventDropArg) => {
      console.log(arg);
    }
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  public currentEvents = signal<EventApi[]>([]);

  public constructor(private changeDetector: ChangeDetectorRef, 
    private router: Router,
    private atendimentosApiService: AtendimentoApiService,
    private avisoService: AvisoService,
    private renderer: Renderer2) {
  }

  public carregarEventos(info: any, successCallback: any, failureCallback: any): void {
    this.atendimentosApiService.getAtendimentos(1, 10000, { 
        datainicial: info.startStr,
        datafinal: info.endStr
      })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const eventos: EventInput[] | undefined =  response?.content?.items?.map((atendimento) => ({
            id: atendimento.id,
            title: ` -  ${atendimento.cliente.nome.split(' ')[0]}`,
            start: atendimento.data,
            end: atendimento.dataFim,
            classNames: [atendimento.emDebito ? "atentimento_debito" : atendimento.agendamentoPendenteAtualizacao ? "atendimento_pendente_atualizacao" : "atendimento_concluido", atendimento.id.replaceAll('-', '_')],
            backgroundColor: atendimento.emDebito ? "red" : atendimento.agendamentoPendenteAtualizacao ? "#d9d900" : "#66CDAA",
            color: atendimento.emDebito ? "red" : atendimento.agendamentoPendenteAtualizacao ? "#d9d900" : "#66CDAA",
            textColor: "black",
            editable: !(atendimento.emDebito || atendimento.agendamentoPendenteAtualizacao),
            extendedProps: {
              clienteNome: atendimento.cliente.nome,
              servico: atendimento.mapAtendimentosServicos.map(a => `<li>${a.servico.nome}</li>`).join(""),
              infoAtendimento: atendimento.emDebito ? "Pagamento atrasado" : atendimento.agendamentoPendenteAtualizacao ? "Aguardando conclusão" : "Concluído",
            },
          }));

          successCallback(eventos ?? []);
        },
        error: (error) => {
          console.error('Erro ao carregar eventos:', error);
          failureCallback(error);
        },
      });
  }

  public remarcarAgendamento(id: string, dataInicio: Date | null, dataFim: Date | null, type: string, arg: EventChangeArg) {
    this.atendimentosApiService.remarcarAtendimento(id, {
      data: dataInicio
    })
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        if (!response.success) {
          arg.revert();
        }
        else {
          // this.avisoService.ShowSucess("Agendamento atualizado com sucesso");
        }
      },
      error: (error) => {
        console.error('Erro ao carregar eventos:', error);
        arg.revert();
      },
    });
  }

  public handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  public handleEventClick(clickInfo: EventClickArg) {
    this.router.navigate(['/atendimentos/edit', clickInfo.event.id]);
  }

  public handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}