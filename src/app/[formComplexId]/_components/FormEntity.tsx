import React from "react";
import { useDrag } from "react-dnd";

import type { FormLayoutComponentChildrenType, FormLayoutComponentContainerType } from "@/types/formTemplate.types";

interface FormEntityProps {
  entity?: FormLayoutComponentChildrenType;
}

function FormEntity({ entity }: FormEntityProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: entity?.itemType,
      item: entity,
      end: (
        item: FormLayoutComponentChildrenType,
        monitor: any
      ) => {
        const dropResult: FormLayoutComponentContainerType =
          monitor.getDropResult();
        if (item && dropResult) {
        //   if (item.itemType === "container") {
        //     handleItemAdded(item);
        //   } else if (item.itemType === "control") {
        //     handleItemAdded(item, dropResult.id);
            //   }
            
            console.log(item.category)
        }
      },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    []
  );

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ opacity, cursor: "move" }} className="col-12">
      <div className="bg-white text-nowrap px-2 py-2 border w-10 h-100 d-flex align-items-center justify-content-between gap-2 rounded-3">
        <div className="d-flex align-items-center">
          <ThreeDotsVertical width="16" height="16" />
          <div className="fs-7">{item.displayText}</div>
        </div>
        <div className="bg-light p-2 rounded">
          <Plus width="16" height="16" />
        </div>
      </div>
    </div>
  );
}

export default FormEntity;
