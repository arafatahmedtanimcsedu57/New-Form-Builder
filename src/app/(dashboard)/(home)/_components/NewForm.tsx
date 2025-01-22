'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { addFormTemplate } from '@/service/formBuilder';
import { useAppDispatch } from '@/redux/hooks';

import {
	newFormSchema,
	newFormDefaultValues,
	NEW_FORM,
} from './newForm.struct';
import type { TemplateType } from '@/types/formTemplate.types';

export default function NewForm({ closeDialog }: { closeDialog: () => void }) {
	const dispatch = useAppDispatch();

	const handleFormSubmit = async (values: z.infer<typeof newFormSchema>) => {
		try {
			const template: TemplateType = await dispatch(
				addFormTemplate({ ...values }),
			).unwrap();

			if (template) closeDialog();
		} catch (ex) {
			console.log(ex);
		}
	};

	const form = useForm<z.infer<typeof newFormSchema>>({
		resolver: zodResolver(newFormSchema),
		defaultValues: {
			...newFormDefaultValues,
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="mt-2 flex flex-col gap-6"
			>
				{Object.keys(NEW_FORM).map((formField) => (
					<FormField
						key={NEW_FORM[formField].name}
						control={form.control}
						name={NEW_FORM[formField].name as 'formName' | 'formId'}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{NEW_FORM[formField].label}</FormLabel>
								<FormControl>
									<Input
										placeholder={NEW_FORM[formField].placeholder}
										className="col-span-3 bg-white"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<div className="flex flex-row-reverse">
					<Button type="submit" className="bg-blue-600 font-extrabold">
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
}
