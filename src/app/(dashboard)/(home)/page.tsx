import Hero from './_components/Hero';
import NewFormDialog from './_components/NewFormDialog';

export default function Home() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)]">
			<div className="flex flex-col items-center">
				<Hero />

				<NewFormDialog />
			</div>
		</div>
	);
}
