import {IList} from './home.interface';

export class Card {
    constructor(
        private name: string,
        private description: string,
        private link: string,
        private list?: IList[],
        private placeholder?: string
    ) {}
} 
