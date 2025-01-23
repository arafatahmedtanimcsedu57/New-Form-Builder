'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

const FormPlayground = () => {
	const { formComplexId } = useParams();
	const formComplexIdSeg = formComplexId
		? (formComplexId as string).split('-')
		: [];
	const formId = formComplexIdSeg[0];
	const formStatus = formComplexIdSeg[1];

	useEffect(() => {
		if (formId && formStatus) {
			try {
				// const formTemplate
			} catch {}
		}
	}, []);

	return (
		<div>
			Page: {formId} {formStatus}
		</div>
	);
};

export default FormPlayground;
