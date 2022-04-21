import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { map, Observable } from "rxjs";
import { CreateResponse, Task } from "src/app/common/interfaces/task.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    constructor(private http: HttpClient){}

    create(task: Task): Observable<Task> {
     return this.http
            .post<CreateResponse>(`${environment.dbUrl}/${task.date}.json`, task)
            .pipe(
                map((response:CreateResponse) => {
                return {...task, id: response.name};
            }))
    }

    load(date: moment.Moment): Observable<Task[]> {
        return this.http
            .get<Task[]>(`${environment.dbUrl}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(
                map((tasks) => {
                    if(!tasks) {
                        return [];
                    } else {
                        return Object
                            .keys(tasks)
                            .map((key: any) => ({
                                ...tasks[key],
                                id: key
                            })
                            )
                        }
                })
            )
    }

    remove(task:Task): Observable<void> {
        return this.http.delete<void>(`${environment.dbUrl}/${task.date}/${task.id}.json`)
    }
}