import { Answer } from './answer';

/** Model representing an answer */
export class Question {
    /** The question's answers (correct and incorrect) */
    answers: Answer[];

    /** Whether the Question was answered correctly */
    correct: boolean;

    /** Whether the Question (potentially) has multiple correct answers */
    multiple: boolean;

    /** The text of the question */
    text: string;
}
