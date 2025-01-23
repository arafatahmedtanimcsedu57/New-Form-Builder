'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import NewForm from './NewForm';

const NewFormDialog = () => {
	const [open, setOpen] = useState<boolean>(false);

	const closeDialog = () => setOpen(false);

	return (
		<Dialog open={open} onOpenChange={setOpen} >
			<DialogTrigger asChild>
				<div>
					<Button className="text-white text-sm font-medium bg-blue-600 shadow-lg hover:shadow-none rounded-3xl">
						Let&apos;s Create New Form
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-slate-50">
				<DialogHeader>
					<DialogTitle>New Form</DialogTitle>
					<DialogDescription>
						Begin from scratch. Provide below information to start designing a
						form tailored to your specific needs.
					</DialogDescription>
				</DialogHeader>

				<NewForm closeDialog={closeDialog} />
			</DialogContent>
		</Dialog>
	);
};

export default NewFormDialog;
