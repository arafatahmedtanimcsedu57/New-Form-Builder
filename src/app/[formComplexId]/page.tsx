"use client";

import React, { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useParams } from "next/navigation";

import FormEntity from "./_components/FormEntity";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTemplate } from "@/service/formBuilder";

import { FORM_ENTITIES } from "@/constant/form-entites";

const FormPlayground = () => {
  const { formComplexId } = useParams();
  const dispatch = useAppDispatch();

  const formComplexIdSeg = formComplexId
    ? (formComplexId as string).split("-")
    : [];

  const formStatus = formComplexIdSeg[0];
  const formId = formComplexIdSeg[1];

  const currentFormTemplate = useAppSelector(
    (state) => state.entities.formBuilder.selectedTemplate
  );

  useEffect(() => {
    if (formId && formStatus) {
      (async () => {
        try {
          const formTemplate = await dispatch(
            getTemplate({ formId, status: formStatus })
          );
        } catch {}
      })();
    }
  }, []);

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="d-flex flex-row gap-4 justify-content-between w-100 h-100">
          <div
            className="h-100 bg-white border-end"
            style={{
              overflowY: "auto",
              minWidth: "300px",
              maxWidth: "300px",
            }}
          >
            {FORM_ENTITIES.map((entity) => (
              <FormEntity entity={entity} />
            ))}
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default FormPlayground;
