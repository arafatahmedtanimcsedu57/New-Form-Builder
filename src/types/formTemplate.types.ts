import { FileType } from './file.types';

export interface TemplateType {
	formName: string;
	id: string;
	formId: number;
	createdAt: string;
	updatedAt: string;
	lastPublishedAt: string;
	publishStatus: string;
	formLayoutComponents: FormLayoutComponentsType[];
	publishHistory: FormLayoutHistoryType[];
	creator: string;
	file: FileType | null;
}

export interface FormLayoutComponentsType {
	container: FormLayoutComponentContainerType;
	children: FormLayoutComponentChildrenType[];
}

export interface FormLayoutHistoryType {
	lastPublishedAt: string;
	formLayoutComponents: FormLayoutComponentsType[];
}

export interface FormLayoutComponentContainerType {
	controlName: string;
	displayText: string;
	description: string;
	itemType: string;
	heading: string;
	subHeading: string;
	id: string;
	desktopWidth?: number;
	skipAble?: boolean;
	type?: string;
}

export interface FormLayoutComponentChildrenType {
	controlName: string;
	displayText: string;
	description: string;
	labelName: string;
	itemType: string;
	required: boolean;
	items?: FormLayoutComponentChildrenItemsType[];
	category: string;
	index?: number;
	id: string;
	containerId: string;
	placeholder?: string;
	rows?: number;
	dataType?: string;
	position?: number;
	name: string;
	sequence: number;
}

interface FormLayoutComponentChildrenItemsType {
	id: string;
	value: string;
	label: string;
}
