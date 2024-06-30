import { EventTypesEnum } from "src/interface";

export class CreateHistoryCommand{
	constructor(
		public readonly eventType:EventTypesEnum,
		public readonly userId:string,
		public readonly oldValue: Record<string, any>,
		public readonly newValue: Record<string, any>
	){}
}