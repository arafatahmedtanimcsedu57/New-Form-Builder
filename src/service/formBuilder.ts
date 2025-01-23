import { createAsyncThunk } from "@reduxjs/toolkit";

import { generateID } from "@/lib/common";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/localStorage";

import { TemplateType } from "@/types/formTemplate.types";

interface RequestTemplateType {
  formName: string;
  formId: string;
}

export const addFormTemplate = createAsyncThunk(
  "formBuilderEntity/addTemplate",

  async ({ formName, formId }: RequestTemplateType) => {
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
