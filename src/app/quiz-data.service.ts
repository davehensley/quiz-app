import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from './question';
import 'rxjs/add/operator/map';

/** Quiz Data service */
@Injectable()
export class QuizDataService {
    /**
     * The constructor
     * @param http - The HTTP service (injected)
     */
    constructor(private http: Http) { }

    /**
     * Get the questions by making an HTTP call to the server
     * @return An observable that can be subscribed to
     */
    getQuestions() {
        return this.http.get('data/questions.json').map(response => <Question[]>response.json());
    }
}
