import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addFormTemplate } from '@/service/formBuilder';
import type { TemplateType } from '@/types/formTemplate.types';

const slice = createSlice({
	name: 'formBuilderEntity',
	initialState: {
		allTemplates: [] as TemplateType[],
		selectedTemplate: null as TemplateType | null,
	},
	reducers: {
		setSelectedTemplateNull: (state) => {
			state.selectedTemplate = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			addFormTemplate.fulfilled,
			(state, { payload }: PayloadAction<TemplateType>) => {
				state.allTemplates.push(payload);
			},
		);
	},
});

export const { setSelectedTemplateNull } = slice.actions;
export default slice.reducer;
