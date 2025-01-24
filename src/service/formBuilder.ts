import { createAsyncThunk } from "@reduxjs/toolkit";

import { generateID } from "@/lib/common";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/localStorage";

import { TemplateType } from "@/types/formTemplate.types";

interface RequestAddTemplateType {
  formName: string;
  formId: string;
}

interface GetTemplateRequest {
  formId: string;
  status: string;
}

export const addFormTemplate = createAsyncThunk(
  "formBuilderEntity/addTemplate",

  async ({ formName, formId }: RequestAddTemplateType) => {
    return await new Promise<TemplateType>((resolve) => {
      const allTemplates: TemplateType[] =
        getFromLocalStorage("templates") || [];

      const template: TemplateType = {
        id: generateID(),
        formName: formName,
        file: null,
        formId: Number(formId),
        createdAt: "",
        creator: "Test User",
        formLayoutComponents: [],
        lastPublishedAt: "",
        publishHistory: [],
        publishStatus: "draft",
        updatedAt: "",
      };

      allTemplates.push(template);

      setTimeout(() => {
        saveToLocalStorage("templates", JSON.stringify(allTemplates));
        resolve(template);
      }, 1000);
    });
  }
);

export const getTemplate = createAsyncThunk<TemplateType, GetTemplateRequest>(
  "formBuilderEntity/getSingleTemplate",

  async (
    { formId, status }: GetTemplateRequest,
    { rejectWithValue, dispatch }
  ) => {
    return await new Promise<TemplateType>((resolve, reject) => {
      setTimeout(() => {
        const allTemplates: TemplateType[] =
          getFromLocalStorage("templates") || [];
        const singleTemplate = allTemplates.filter(
          (t) => String(t.formId) === String(formId)
        )[0];
        resolve(singleTemplate);
      }, 1000);
    });
  }
);

export const getAllTemplates = createAsyncThunk(
  "formBuilderEntity/getAllTemplates",

  async (data: string, { rejectWithValue, dispatch }) => {
    return await new Promise<TemplateType[]>((resolve) => {
      setTimeout(() => {
        const draftTemplates: TemplateType[] =
          getFromLocalStorage("templates") || [];
        resolve([...draftTemplates]);
      }, 1000);
    });
  }
);
