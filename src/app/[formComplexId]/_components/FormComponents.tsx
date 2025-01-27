import React from "react";

import FormComponent from "./FormComponent";

import { FORM_COMPONENTS } from "@/constant/form-entites";
import type {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
  FormLayoutComponentsType,
} from "@/types/formTemplate.types";

interface FormComponentPropsType {
  currentFormTemplate: FormLayoutComponentsType[] | [];
  selectedEntity?:
    | FormLayoutComponentContainerType
    | FormLayoutComponentChildrenType;

  deletePage: (containerId: string) => void;
  deleteEntity: (controlId: string, containerId: string) => void;
  selectEntity: (
    item:
      | FormLayoutComponentChildrenType
      | FormLayoutComponentContainerType
      | undefined
  ) => void;
  moveEntity: (
    item: FormLayoutComponentChildrenType,
    dragIndex: number,
    hoverIndex: number,
    containerId: string
  ) => void;
  handleEntityAdded: (
    entity: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string
  ) => void;
}

function FormComponents({
  currentFormTemplate,
  selectedEntity,
  deletePage,
  deleteEntity,
  selectEntity,
  moveEntity,
  handleEntityAdded,
}: FormComponentPropsType) {
  const formComponents = currentFormTemplate;

  return (
    <div className=" overflow-auto flex-1 h-full min-w-[300px]">
      {formComponents && formComponents.length ? (
        formComponents.map((component: FormLayoutComponentsType) => {
          const { container: page, children } = component || {};
          const { id } = page || {};

          return (
            <FormComponent
              key={id}
              page={page}
              _children={children} // i can't pass any props name children according to React
              selectedEntity={selectedEntity}
              deletePage={deletePage}
              deleteEntity={deleteEntity}
              selectEntity={selectEntity}
              accept={FORM_COMPONENTS.CONTROL}
              moveEntity={moveEntity}
            />
          );
        })
      ) : (
        <></>
      )}

      <FormComponent
        name={"Parent Component"}
        accept={FORM_COMPONENTS.CONTAINER}
        handleEntityAdded={handleEntityAdded}
      />
    </div>
  );
}

export default FormComponents;
