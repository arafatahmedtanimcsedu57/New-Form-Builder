import { combineReducers } from '@reduxjs/toolkit';
import formBuilderSlice from '@/redux/slices/formBuilder.slice';

export default combineReducers({
	formBuilder: formBuilderSlice,
});
