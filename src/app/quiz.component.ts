import { Component, ElementRef } from '@angular/core';

/** Quiz component */
@Component({
    selector: 'quiz',
    styleUrls: ['app/quiz.component.css'],
    templateUrl: 'app/quiz.component.html',
})
export class QuizComponent {
    /** The number of possible answers to display for each question */
    answers: number;

    /** The number of questions in the quiz */
    questions: number;

    /** The user's score */
    score: number = 0;

    /**
     * The constructor
     * @param elementRef - The reference to the parent element
     */
    constructor(public elementRef: ElementRef) {
        this.questions = this.elementRef.nativeElement.getAttribute('questions');
        this.answers = this.elementRef.nativeElement.getAttribute('answers');
    }

    /**
     * Updates the score when the user changes their answer to a question
     * @param score - The new score
     */
    updateScore(score: number) {
        this.score = score;
    }
}
