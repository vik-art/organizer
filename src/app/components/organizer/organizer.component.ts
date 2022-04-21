import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  unSubscriber = new Subscription();

  constructor(
    public dateService: DateService
  ) { }
  ngOnDestroy(): void {
   this.unSubscriber.unsubscribe()
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      task: new FormControl("", [Validators.required, Validators.maxLength(300)])
    })
    this.unSubscriber.add(
    this.form.valueChanges.subscribe(() => {})
    )}

    submit() {
      console.log(this.form.value);
      this.form.reset()
    }
}
