import { FileType } from './file.types';

// Enums for stricter typing
export enum PublishStatus {
	Draft = 'draft',
	Published = 'published',
	Archived = 'archived',
}

export enum ItemType {
	Container = 'container',
	Field = 'field',
	Button = 'button',
}

// Base type for shared fields
interface BaseComponentType {
	controlName: string;
	displayText: string;
	description: string;
	placeholder?: string;
	name: string;
}

// Represents the top-level form template structure
export interface TemplateType {
	formName: string;
	id: string;
	formId: number;
	createdAt: Date; // Using Date type
	updatedAt: Date;
	lastPublishedAt: Date;
	publishStatus: PublishStatus;
	formLayoutComponents: FormLayoutComponentsType[];
	publishHistory: FormLayoutHistoryType[];
	creator: string;
	file: FileType | null;
}

// Represents the layout structure of the form
export interface FormLayoutComponentsType {
	container: FormLayoutComponentContainerType;
	children: FormLayoutComponentChildrenType[];
}

// History of form layout changes
export interface FormLayoutHistoryType {
	lastPublishedAt: Date;
	formLayoutComponents: FormLayoutComponentsType[];
}

// Container type with additional properties
export interface FormLayoutComponentContainerType extends BaseComponentType {
	itemType: ItemType;
	heading: string;
	subHeading: string;
	id: string;
	desktopWidth?: number;
	skipAble?: boolean;
	type?: string;
}

// Child component type with additional properties
export interface FormLayoutComponentChildrenType extends BaseComponentType {
	labelName: string;
	itemType: ItemType;
	required: boolean;
	items?: FormLayoutComponentChildrenItemsType[];
	category: string;
	index?: number;
	id: string;
	containerId: string;
	rows?: number;
	dataType?: string;
	position?: number;
	sequence: number;
	children?: FormLayoutComponentChildrenType[]; // Recursive children
}

// Items for dropdowns or options
export interface FormLayoutComponentChildrenItemsType {
	id: string;
	value: string;
	label: string;
}
