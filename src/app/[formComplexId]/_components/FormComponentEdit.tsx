"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
} from "@/types/formTemplate.types";

interface FormComponentEditPropsType {
  selectedEntity:
    | FormLayoutComponentContainerType
    | FormLayoutComponentChildrenType;
}

const formSchema = z.object({
  displayText: z.string(),
  description: z.string(),
});

const FormComponentEdit = ({ selectedEntity }: FormComponentEditPropsType) => {
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayText: selectedEntity.displayText,
      description: selectedEntity.description,
    },
  });

  useEffect(() => {
    form.reset({
      displayText: selectedEntity.displayText,
      description: selectedEntity.description,
    });
  }, [selectedEntity, form]);

  return (
    <div className="overflow-auto flex-1 h-full min-w-[300px] max-w-[300px]">
      {JSON.stringify(selectedEntity)}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="displayText"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Label</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter Label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default FormComponentEdit;
