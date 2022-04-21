import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  constructor(
    public dateService: DateService
  ) { }

  ngOnInit(): void {
  }

}
