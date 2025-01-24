import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';

import { FORM_COMPONENTS, FORM_ENTITIES_NAME } from '@/constant/form-entites';
import {
	FormLayoutComponentChildrenType,
	type FormLayoutComponentContainerType,
} from '@/types/formTemplate.types';

const selectedColor = '#ffc107';
const nonSelectedColor = 'rgba(0,0,0,0.1)';

const renderItem = (item: FormLayoutComponentChildrenType) => {
	switch (item.controlName) {
		case FORM_ENTITIES_NAME.INPUTTEXTFIELD:
			return <>TextField</>;

		case FORM_ENTITIES_NAME.INPUTMULTILINE:
			return <>TextField</>;
		case FORM_ENTITIES_NAME.CHECKBOX:
			return <>CheckBox</>;

		case FORM_ENTITIES_NAME.MULTICHOICES:
			return <>MULTICHOCE</>;

		case FORM_ENTITIES_NAME.RADIOGROUP:
			return <>RADIOGROUP</>;

		case FORM_ENTITIES_NAME.SELECTDROPDOWN:
			return <>SELECTDROPDOWN</>;

		case FORM_ENTITIES_NAME.DATEFIELD:
			return <>DATEFIELD</>;

		case FORM_ENTITIES_NAME.TIMEFIELD:
			return <>TIMEFIELD</>;

		case FORM_ENTITIES_NAME.FILEUPLOAD:
			return (
				<>
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="fas fa-cloud-upload-alt"></i>
					</label>
				</>
			);

		case FORM_ENTITIES_NAME.IMAGEUPLOAD:
			return (
				<>
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="far fa-image"></i>
					</label>
				</>
			);

		case FORM_ENTITIES_NAME.SCANCODE:
			return (
				<>
					ffc107
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="fas fa-qrcode"></i>
					</label>
				</>
			);

		case FORM_ENTITIES_NAME.SCANCODE:
			return (
				<>
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="fas fa-qrcode"></i>ffc107
					</label>
				</>
			);

		case FORM_ENTITIES_NAME.SIGNATURE:
			return (
				<>
					<label className="form-control" htmlFor={item.controlName + item.id}>
						<span className="sign-label">Sign Here</span>
					</label>
				</>
			);

		case FORM_ENTITIES_NAME.TOGGLE:
			return <>TOGGLE</>;

		case FORM_ENTITIES_NAME.CHECKLIST:
			return <>CHECKLIST</>;
	}
};

interface ControlViewComponentProps {
	entity: FormLayoutComponentChildrenType;
	selectedEntity:
		| FormLayoutComponentChildrenType
		| FormLayoutComponentContainerType
		| undefined;
	pageId: string;
	index: number;
	deleteEntity: (itemId: string, containerId: string) => void;
	selectEntity: (item: FormLayoutComponentChildrenType) => void;
	moveEntity: (
		item: FormLayoutComponentChildrenType,
		dragIndex: number,
		hoverIndex: number,
		pageId: string,
	) => void;
}

function ControlViewComponent(props: ControlViewComponentProps) {
	const {
		entity,
		selectedEntity,
		pageId,
		index,
		deleteEntity,
		selectEntity,
		moveEntity,
	} = props;

	const wrapperStyle = {
		border: '1px solid ' + nonSelectedColor,
		borderRadius: '9px',
		marginBottom: '20px',
		backgroundColor: 'white',
		cursor: 'pointer',
	};

	// Check if its the same type and id to change color.
	if (selectedEntity && entity.id === selectedEntity.id) {
		wrapperStyle.border = '2px solid ' + selectedColor;
	}

	const handleDeleteControl: React.MouseEventHandler<HTMLSpanElement> = (
		event,
	) => {
		deleteEntity(entity.id, pageId);
		if (event.stopPropagation) event.stopPropagation();
	};

	// Drag & Sort Code for functionality

	const ref = useRef<HTMLDivElement>(null);
	const [{}, drop] = useDrop<
		FormLayoutComponentChildrenType,
		void,
		{ handlerId: Identifier | null }
	>({
		accept: FORM_COMPONENTS.CONTROL,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: FormLayoutComponentChildrenType, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset
				? clientOffset.y - hoverBoundingRect.top
				: 0;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveEntity(item, dragIndex as number, hoverIndex, pageId);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: FORM_COMPONENTS.CONTROL,
		item: () => {
			return { ...entity, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	console.log(ref);
	return (
		<>
			<div
				ref={ref}
				className="row w-100 align-items-stretch justify-content-end px-2 py-4"
				onClick={() => selectEntity(entity)}
				style={{ ...wrapperStyle, opacity }}
			>
				<div className="col-12">
					<div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
						<div>
							<h5 className="fs-6">
								{entity.labelName}{' '}
								<span className="text-danger">
									{entity.required ? ' *' : ''}
								</span>
							</h5>

							{entity.description !== '' ? (
								<div className="">
									<p>{entity.description}</p>
								</div>
							) : (
								<></>
							)}
						</div>
						<div className="d-flex gap-2">
							<button
								className="btn btn-sm btn-danger"
								onClick={handleDeleteControl}
							>
								{/* <Trash width="16" height="16" /> */}
							</button>

							<button
								className="btn btn-sm btn-light"
								style={{ cursor: 'grab' }}
							>
								{/* <ThreeDotsVertical width="16" height="16" /> */}
							</button>
						</div>
					</div>

					<div className="mt-3">{renderItem(entity)}</div>
				</div>
			</div>
		</>
	);
}

export default ControlViewComponent;
