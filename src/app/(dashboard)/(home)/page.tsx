"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Hero from "./_components/Hero";
import NewFormDialog from "./_components/NewFormDialog";
import FormTemplatesGallery from "./_components/FormTemplatesGallery";
import { getAllTemplates } from "@/service/formBuilder";
import { IconBolt, IconCarFan, IconChecks } from "@tabler/icons-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const allFormTemplates = useAppSelector(
    (state) => state.entities.formBuilder.allTemplates
  );

  useEffect(() => {
    dispatch(getAllTemplates("GET ALL TEMPLATE"));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col items-center gap-10">
          <Hero />
          <div>
            <NewFormDialog />
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center text-sm tracking-wider text-slate-600">
            <div className="flex gap-1 items-center group">
              <IconBolt className="group-hover:motion-scale-in-125" />
              <span>Unlimited forms</span>
            </div>
            <div className="flex gap-1 items-center group">
              <IconChecks className="group-hover:motion-preset-fade" />
              <span>Unlimited fields</span>
            </div>
            <div className="flex gap-1 items-center group">
              <IconCarFan className="group-hover:motion-preset-spin" />
              <span>Unlimited responses</span>
            </div>
          </div>
        </div>

        <div className="">
          <FormTemplatesGallery allFormTemplates={allFormTemplates} />
        </div>
      </div>
    </>
  );
}
