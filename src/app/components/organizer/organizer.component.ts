import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { Task } from 'src/app/common/interfaces/task.interface';
import { DateService } from 'src/app/shared/services/date.service';
import { TaskService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  unSubscriber = new Subscription();
  tasks: Task[] = [];

  constructor(
    public dateService: DateService,
    private taskService: TaskService
  ) { }


  ngOnDestroy(): void {
   this.unSubscriber.unsubscribe()
  }

  ngOnInit(): void {
    this.initForm();
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => this.tasks = tasks)
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.maxLength(300)])
    })
    this.unSubscriber.add(
    this.form.valueChanges.subscribe(() => {})
    )}

    submit() {
      const { title } = this.form.value;
      const task: Task = {
        title,
        date: this.dateService.date.value.format('DD-MM-YYYY')
      }
      this.taskService.create(task).subscribe((task) => {
        this.tasks.push(task);
        this.form.reset();
      }, err => {
        console.log(err)
      })
    }
    remove(task: Task) {
     this.taskService.remove(task).subscribe(() => {
       this.tasks = this.tasks.filter(t => t.id !== task.id)
     },
     err => {
       console.error(err)
     })
    }
}
