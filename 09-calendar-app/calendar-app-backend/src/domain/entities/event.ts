export class Event {
    constructor(
        public readonly id: string, 
        public readonly title: string,
        public readonly start: Date,
        public readonly end: Date,
        public readonly notes?:string,
        public readonly userOwner?: string){
    }
}