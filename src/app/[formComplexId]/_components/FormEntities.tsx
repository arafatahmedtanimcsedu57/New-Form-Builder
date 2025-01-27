import React from "react";

import FormEntity from "./FormEntity";

import { FORM_ENTITIES, FORM_PAGE } from "@/constant/form-entites";
import type {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
  FormLayoutComponentsType,
} from "@/types/formTemplate.types";
function FormEntities({
  currentFormTemplate,
  handleEntityAdded,
}: {
  currentFormTemplate: FormLayoutComponentsType[] | [];
  handleEntityAdded: (
    entity: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string
  ) => void;
}) {
  return (
    <div className="bg-white  h-full overflow-auto min-w-[400px] max-w-[400px]">
      <h5 className="p-4 m-0 flex items-center text-2xl font-bold">
        Form Components
      </h5>

      <div className="p-4">
        <div className="">
          {FORM_PAGE.map((page) => {
            return (
              <FormEntity
                key={page.controlName}
                entity={page}
                handleEntityAdded={handleEntityAdded}
                currentFormTemplate={currentFormTemplate}
              />
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-4 p-4">
          {FORM_ENTITIES.map((entity) =>
            entity ? (
              <FormEntity
                key={entity.id}
                entity={entity}
                handleEntityAdded={handleEntityAdded}
                currentFormTemplate={currentFormTemplate}
              />
            ) : (
              <></>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FormEntities);
