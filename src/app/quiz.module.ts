import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { QuizComponent } from './quiz.component';
import { QuestionsComponent } from './questions.component';
import { QuizDataService } from './quiz-data.service';

/** Quiz module */
@NgModule({
    bootstrap: [QuizComponent],
    declarations: [QuizComponent, QuestionsComponent],
    imports: [BrowserModule, FormsModule, HttpModule],
    providers: [QuizDataService],
})
export class QuizModule { }
