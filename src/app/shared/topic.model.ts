import { Category } from "./category.model";

export class Topic {
    constructor(
        public id: number,
        public root: number,
        public categories: Category[],
        public code: string,
        public languageCode: string,
        public expanded: boolean
    ) {}
}