import { z } from 'zod';
import type { FormField } from '@/types/formStruct.types';

export const NEW_FORM: Record<string, FormField> = {
	FORM_NAME: {
		name: 'formName',
		label: 'Form Name',
		placeholder: 'Enter Form Name',
		message: 'Form Name must be at least 2 characters.',
		min_length: 2,
	},

	FORM_ID: {
		name: 'formId',
		label: 'Form ID',
		placeholder: 'Enter Unique Form ID',
		message: 'Form ID must be at least 1 character.',
		min_length: 1,
	},
} as const;

export const newFormSchema = z.object({
	formName: z.string().min(NEW_FORM.FORM_NAME.min_length ?? 0, {
		message: NEW_FORM.FORM_NAME.message,
	}),

	formId: z.string().min(NEW_FORM.FORM_ID.min_length ?? 0, {
		message: NEW_FORM.FORM_ID.message,
	}),
});

export const newFormDefaultValues = {
	[NEW_FORM.FORM_NAME.name]: '',
	[NEW_FORM.FORM_ID.name]: '',
};
