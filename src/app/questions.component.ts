import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from './answer';
import { Question } from './question';
import { QuizDataService } from './quiz-data.service';

/** Questions component */
@Component({
    selector: 'questions',
    styleUrls: ['app/questions.component.css'],
    templateUrl: 'app/questions.component.html',
})
export class QuestionsComponent {
    /** The number of answers to display for each question (passed from the parent directive) */
    @Input() answersCount: number;

    /** Fires when the user changes their answer to a question (which might affect their score) */
    @Output() onAnswerChange: EventEmitter<number> = new EventEmitter<number>();

    /** The array of questions */
    questions: Question[];

    /** The number of questions in the quiz (passed from the parent directive) */
    @Input() questionsCount: number;

    /**
     * The constructor
     * @param quizDataService - The service that allows us to fetch the questions from the server (injected)
     */
    constructor(private quizDataService: QuizDataService) { }

    /**
     * Grade the question based on the answer(s) submitted by the user
     * @param question - The question to grade
     * @param answer - The chosen answer
     * @param selected - True if the answer was selected (and the question allows multiple answers)
     */
    grade(question: Question, answer: Answer, selected: boolean) {
        if (question.multiple) {
            answer.selected = selected;
            let correct = true;

            for (let a of question.answers) {
                if (!!a.selected !== a.correct) {
                    correct = false;
                    break;
                }
            }

            question.correct = correct;
        } else {
            question.correct = answer.correct;
        }

        this.onAnswerChange.emit(this.questions.reduce((total, q) => total + (q.correct ? 1 : 0), 0));
    }

    /**
     * Subscribe to the observable so the questions can be accessed once they've been downloaded
     */
    ngOnInit() {
        this.quizDataService.getQuestions().subscribe(questions => this.questions = this.pickQuestions(questions));
    }

    /**
     * Pick several answers to the question such that at least one correct and one incorrect answer will appear.
     * @param question - The question
     * @return The chosen answers
     */
    private pickAnswers(question: Question) {
        let answers = this.shuffle(question.answers);
        let chosenAnswers: Answer[] = [];

        // Find one correct answer and one incorrect answer
        for (let correct of [true, false]) {
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].correct === correct) {
                    chosenAnswers.push(answers[i]);
                    answers.splice(i, 1);
                    break;
                }
            }
        }

        return this.shuffle(chosenAnswers.concat(answers.slice(0, Math.max(0, this.answersCount - 2))));
    }

    /**
     * Pick random questions. If questionsCount >= questions.length, all of the questions are returned in random order.
     * @param questions - The questions
     * @return The randomly chosen questions
     */
    private pickQuestions(questions: Question[]) {
        let chosenQuestions = this.shuffle(questions).slice(0, this.questionsCount);

        for (let i of Object.keys(chosenQuestions)) {
            chosenQuestions[i].answers = this.pickAnswers(chosenQuestions[i]);
        }

        return chosenQuestions;
    }

    /**
     * Shuffle an array and returns it (without altering the original)
     * @param array - The array
     * @return The shuffled array
     */
    private shuffle(array: any[]) {
        let arrayCopy = array.slice(0); // Copy the array so the original won't be affected

        // Durstenfeld algorithm
        for (let i = arrayCopy.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arrayCopy[i];
            arrayCopy[i] = arrayCopy[j];
            arrayCopy[j] = temp;
        }

        return arrayCopy;
    }
}
