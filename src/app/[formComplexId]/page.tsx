'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import FormEntities from './_components/FormEntities';
import FormComponents from './_components/FormComponents';
import { useFormTemplate } from '@/hooks/use-formTemplate';

const FormPlayground = () => {
	const { formComplexId } = useParams();

	const formComplexIdSeg = formComplexId
		? (formComplexId as string).split('-')
		: [];

	const formStatus = formComplexIdSeg[0];
	const formId = formComplexIdSeg[1];

	const {
		formComponents,
		selectedEntity,
		handleEntityAdded,
		deletePage,
		deleteEntity,
		selectEntity,
		moveEntity,
	} = useFormTemplate(formId, formStatus);

	return (
		<div className="flex flex-col h-full">
			<DndProvider backend={HTML5Backend}>
				<div className="flex flex-row gap-4 justify-between w-full h-full">
					{/* Left Side */}
					<FormEntities
						currentFormTemplate={formComponents}
						handleEntityAdded={handleEntityAdded}
					/>

					{/* Middle */}
					<FormComponents
						currentFormTemplate={formComponents}
						selectedEntity={selectedEntity}
						deletePage={deletePage}
						deleteEntity={deleteEntity}
						selectEntity={selectEntity}
						moveEntity={moveEntity}
						handleEntityAdded={handleEntityAdded}
					/>
				</div>
			</DndProvider>
		</div>
	);
};

export default FormPlayground;
