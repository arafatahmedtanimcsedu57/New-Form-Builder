'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type {
	FormLayoutComponentChildrenType,
	FormLayoutComponentContainerType,
} from '@/types/formTemplate.types';

interface FormComponentEditPropsType {
	selectedEntity:
		| FormLayoutComponentContainerType
		| FormLayoutComponentChildrenType;
}

const FormComponentEdit = ({ selectedEntity }: FormComponentEditPropsType) => {
	const initialValue = {
		displayText: selectedEntity.displayText || '',
		description: selectedEntity.description || '',
		placeholder: selectedEntity.placeholder || '',
		name: selectedEntity.name || '',
	};

	const optionSchema = z.object({
		label: z.string().min(1, 'Label is required'),
		value: z.string().min(1, 'value is required'),
	});

	const formSchema = z.object({
		displayText: z.string().min(1, 'Display Text is required'),
		description: z.string().optional(),
		placeholder: z.string().optional(),
		name: z.string().min(1, 'Name is required'),
		options: z.array(optionSchema),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...initialValue },
	});

	useEffect(() => {
		if (selectedEntity) {
			form.reset({ ...initialValue });
		}
	}, [selectedEntity, form]);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			console.log('Submitted Values:', values);
			alert('Form submitted successfully!');
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			alert('Submission failed. Please try again.');
		}
	};

	if (!selectedEntity) {
		return <div>Loading...</div>;
	}

	return (
		<div className="overflow-auto flex-1 h-full min-w-[300px] max-w-[300px] border rounded-lg p-4">
			<div className="text-sm mb-4">
				<strong>Selected Entity:</strong>
				<pre className="bg-gray-100 p-2 rounded">
					{JSON.stringify(selectedEntity, null, 2)}
				</pre>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					{['displayText', 'description', 'placeholder', 'name'].map(
						(field) => (
							<FormField
								key={field}
								control={form.control}
								name={field as keyof typeof initialValue}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{field.name}</FormLabel>
										<FormControl>
											<Input
												placeholder={`Enter ${field.name}`}
												{...field}
												aria-describedby={`error-${field.name}`}
											/>
										</FormControl>
										<FormMessage>
											{form.formState.errors[field.name]?.message && (
												<p className="text-red-500 text-sm">
													{form.formState.errors[field.name]?.message}
												</p>
											)}
										</FormMessage>
									</FormItem>
								)}
							/>
						),
					)}
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default FormComponentEdit;
