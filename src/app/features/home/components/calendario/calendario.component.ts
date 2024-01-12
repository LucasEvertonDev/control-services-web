import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventChangeArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AtendimentoApiService } from 'src/app/core/api/services/atendimentos-endpoint/atendimentos-api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
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
      next: 'PRÓXIMO',
      prev: 'ANTERIOR'
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
      //arg.oldEvent._context.calendarApi.view.type;
      console.log(arg);
      // arg.event.start,
      // arg.event.id
    }),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  public currentEvents = signal<EventApi[]>([]);

  public constructor(private changeDetector: ChangeDetectorRef, 
    private atendimentosApiService: AtendimentoApiService) {
      this.atendimentosApiService.getAtendimentos(1, 10000, {})
        .pipe(take(1))
        .subscribe(response => {
          response.content.items.forEach((atendimento => {
            this.atendimentos.push({
              id: atendimento.id,
              title: ` -  ${atendimento.cliente.nome.split(" ")[0]}`,
              start: atendimento.data,
              extendedProps: {
                servico: atendimento.mapAtendimentosServicos[0].servico.nome
              }
            });

            this.calendarOptions.update((options) => ({
              ...options,
              events: this.atendimentos,
            }));
          }));
        });
  }

  public handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  public handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  public remarcarAgendamento() {

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
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  public handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    // console.log(JSON.stringify(events));
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}