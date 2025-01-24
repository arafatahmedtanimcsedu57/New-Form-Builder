'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getTemplate } from '@/service/formBuilder';

import { generateID } from '@/lib/common';
import { FORM_COMPONENTS } from '@/constant/form-entites';
import type {
	FormLayoutComponentChildrenType,
	FormLayoutComponentContainerType,
	FormLayoutComponentsType,
} from '@/types/formTemplate.types';

export const useFormTemplate = (formId?: string, formStatus?: string) => {
	const dispatch = useAppDispatch();

	const currentFormTemplate = useAppSelector(
		(state) => state.entities.formBuilder.selectedTemplate,
	);

	const [formComponents, setFormComponents] = useState<
		FormLayoutComponentsType[] | []
	>(currentFormTemplate ? currentFormTemplate?.formLayoutComponents : []);

	const [selectedEntity, setSelectedEntity] = useState<
		| undefined
		| FormLayoutComponentContainerType
		| FormLayoutComponentChildrenType
	>(undefined);

	useEffect(() => {
		if (formId && formStatus) {
			(async () => {
				try {
					await dispatch(getTemplate({ formId, status: formStatus }));
				} catch (error) {
					console.error('Error loading form template:', error);
				}
			})();
		}
	}, [formId, formStatus, dispatch]);

	console.log(formComponents);

	const handleEntityAdded = (
		entity: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
		containerId?: string,
	) => {
		if (entity.itemType === FORM_COMPONENTS.CONTAINER) {
			const newState = formComponents.slice();
			newState.push({
				container: {
					...(entity as FormLayoutComponentContainerType),
					id: generateID(),
				},
				children: [],
			});

			console.log('handleEntityAdded', entity, newState);

			setFormComponents(newState);
		} else if (entity.itemType === FORM_COMPONENTS.CONTROL) {
			const newState = formComponents.slice();
			const formContainerId = newState.findIndex(
				(f) => f.container.id === containerId,
			);
			const formContainer = { ...newState[formContainerId] };
			const obj = {
				...(entity as FormLayoutComponentChildrenType),
				id: generateID(),
				containerId: containerId,
			};

			const childItem = entity as FormLayoutComponentChildrenType;
			if (childItem.items)
				obj.items = JSON.parse(JSON.stringify(childItem.items));

			const newChildren = formContainer.children.slice();
			newChildren.push(obj as FormLayoutComponentChildrenType);
			formContainer.children = newChildren;
			newState[formContainerId] = formContainer;
			setFormComponents(newState);
		}
	};

	const deletePage = (containerId: string) => {
		if (confirm('Are you sure you want to delete container?')) {
			const newState = formComponents.filter(
				(comp) => comp.container.id !== containerId,
			);
			setFormComponents(newState);
			setSelectedEntity((prev) =>
				prev &&
				(prev.id === containerId ||
					(prev as FormLayoutComponentChildrenType).containerId === containerId)
					? undefined
					: prev,
			);
		}
	};

	const deleteEntity = (controlId: string, containerId: string) => {
		const newState = formComponents.map((component) => {
			if (component.container.id === containerId) {
				return {
					...component,
					children: component.children.filter(
						(child) => child.id !== controlId,
					),
				};
			}
			return component;
		});

		setFormComponents(newState);
		setSelectedEntity((prev) =>
			prev && prev.id === controlId ? undefined : prev,
		);
	};

	const selectEntity = (
		item:
			| FormLayoutComponentChildrenType
			| FormLayoutComponentContainerType
			| undefined,
	) => setSelectedEntity(item);

	const editPage = (item: FormLayoutComponentContainerType) => {
		const newState = formComponents.slice();
		const formContainerId = newState.findIndex(
			(comp) => comp.container.id === item.id,
		);
		const formContainer = { ...newState[formContainerId] };
		formContainer.container = {
			...formContainer.container,
			heading: item.heading,
			subHeading: item.subHeading,
			skipAble: item.skipAble,
			type: item.type,
		};
		newState[formContainerId] = formContainer;

		setFormComponents(newState);
	};

	const editEntity = (item: FormLayoutComponentChildrenType) => {
		const newState = formComponents.slice();
		const formContainerId = newState.findIndex(
			(comp) => comp.container.id === item.containerId,
		);
		const formContainer = { ...newState[formContainerId] };
		formContainer?.children?.forEach((child, ind) => {
			if (child.id === item.id) {
				const newChildren = formContainer.children.slice();
				newChildren[ind] = item;
				formContainer.children = newChildren;
				return;
			}
		});
		newState[formContainerId] = formContainer;
		setFormComponents(newState);
	};

	const moveEntityFromSide = (
		item: FormLayoutComponentChildrenType,
		{ containerId, position }: FormLayoutComponentChildrenType,
	) => {
		const componentsCopy: FormLayoutComponentsType[] = JSON.parse(
			JSON.stringify(formComponents),
		);

		const currentItemContainer = componentsCopy.filter(
			(con) => con.container.id === item.containerId,
		)[0];
		const moveItemToContainer = componentsCopy.filter(
			(con: FormLayoutComponentsType) => con.container.id === containerId,
		)[0];

		const itemIndex = currentItemContainer.children.findIndex(
			(child) => child.id === item.id,
		);
		const deletedItem = currentItemContainer.children.splice(itemIndex, 1);
		deletedItem[0].containerId = containerId;

		if (position !== undefined)
			moveItemToContainer.children.splice(position, 0, deletedItem[0]);
		else {
			if (item.containerId !== containerId) {
				if (position)
					moveItemToContainer.children.splice(position, 0, deletedItem[0]);
				else moveItemToContainer.children.splice(itemIndex, 0, deletedItem[0]);
			}
		}
		setSelectedEntity(deletedItem[0]);
		setFormComponents(componentsCopy);
	};

	const moveEntity = (
		item: FormLayoutComponentChildrenType,
		dragIndex: number,
		hoverIndex: number,
		containerId: string,
	) => {
		if (item === undefined) return;

		const componentsCopy: FormLayoutComponentsType[] = formComponents
			? JSON.parse(JSON.stringify(formComponents))
			: [];

		if (dragIndex !== undefined && item.id) {
			if (item.containerId === containerId) {
				const formContainer = componentsCopy.filter(
					(con) => con.container.id === containerId,
				)[0];
				const deletedItem = formContainer.children.splice(
					formContainer.children.findIndex((con) => con.id === item.id),
					1,
				);
				if (deletedItem.length === 0) return;

				formContainer.children.splice(hoverIndex, 0, deletedItem[0]);
			}
			setFormComponents(componentsCopy);
		}
	};

	// const checkIfComponentsInContainer = () => {
	// 	for (let i = 0; i < formLayoutComponents.length; i++) {
	// 		const componentChildren: FormLayoutComponentChildrenType[] =
	// 			formLayoutComponents[i].children;
	// 		if (componentChildren.length === 0) {
	// 			alert('You need to have controls inside containers before updating.');
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// };

	return {
		formComponents,
		selectedEntity,
		handleEntityAdded,
		deletePage,
		deleteEntity,
		selectEntity,
		editPage,
		editEntity,
		moveEntityFromSide,
		moveEntity,
	};
};
