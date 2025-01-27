import type { FormLayoutComponentChildrenType } from '@/types/formTemplate.types';
import { FORM_COMPONENTS } from '@/constant/form-entites';

export const isEntityFormComponent = (
	object: unknown,
): object is FormLayoutComponentChildrenType => {
	if (object !== null && typeof object === 'object') {
		return 'itemType' in object && object.itemType === FORM_COMPONENTS.CONTROL;
	}

	return false;
};
