'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Hero from './_components/Hero';
import NewFormDialog from './_components/NewFormDialog';
import { useEffect } from 'react';
import { getAllTemplates } from '@/service/formBuilder';
import FormTemplatesGallery from './_components/FormTemplatesGallery';

export default function Home() {
	const dispatch = useAppDispatch();
	const allFormTemplates = useAppSelector(
		(state) => state.entities.formBuilder.allTemplates,
	);

	useEffect(() => {
		dispatch(getAllTemplates('GET ALL TEMPLATE'));
	}, []);

	return (
		<>
			<div className="flex flex-col gap-14">
				<div className="flex flex-col items-center">
					<Hero />
					<div>
						<NewFormDialog />
					</div>
				</div>

				<div className="">
					<FormTemplatesGallery allFormTemplates={allFormTemplates} />
				</div>
			</div>
		</>
	);
}
