"user client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { useDrag } from "react-dnd";
import { IconDotsVertical, IconCirclePlus } from "@tabler/icons-react";

import type {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
  FormLayoutComponentsType,
} from "@/types/formTemplate.types";
import { FORM_COMPONENTS } from "@/constant/form-entites";

interface FormEntityProps {
  entity: FormLayoutComponentChildrenType | FormLayoutComponentContainerType;
  currentFormTemplate: FormLayoutComponentsType[] | [];

  handleEntityAdded: (
    entity: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    pageId?: string
  ) => void;
}

function FormEntity({
  entity,
  currentFormTemplate,
  handleEntityAdded,
}: FormEntityProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: entity.itemType,
      item: entity,
      end: (
        item:
          | FormLayoutComponentChildrenType
          | FormLayoutComponentContainerType,
        monitor: any
      ) => {
        const dropResult: FormLayoutComponentContainerType =
          monitor.getDropResult();
        if (item && dropResult) {
          if (item.itemType === FORM_COMPONENTS.CONTAINER) {
            handleEntityAdded(entity);
          } else if (entity.itemType === FORM_COMPONENTS.CONTROL) {
            handleEntityAdded(entity, dropResult.id);
          }
        }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [currentFormTemplate]
  );

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      style={{ opacity, cursor: "move" }}
      className="p-4 border rounded-xl overflow-hidden"
    >
      <div className="flex gap-4 items-center justify-between text-slate-600 ">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 text-slate-600">
            <IconDotsVertical stroke={2} />
          </div>
          <div>
            <span className="block tracking-wide font-semibold text-slate-500">
              {entity.displayText}
            </span>
            <span className="text-sm text-slate-400">{entity.description}</span>
          </div>
        </div>
        <div className="text-slate-600">
          <IconCirclePlus stroke={1} />
        </div>
      </div>
    </div>
  );
}

export default FormEntity;
