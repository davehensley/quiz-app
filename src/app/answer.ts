/** Model representing an answer */
export class Answer {
    /** Whether the answer is correct */
    correct: boolean;

    /** Whether the answer was selected by the user (if the question allows multiple answers to be selected) */
    selected: boolean;

    /** The text of the answer */
    text: string;
}
