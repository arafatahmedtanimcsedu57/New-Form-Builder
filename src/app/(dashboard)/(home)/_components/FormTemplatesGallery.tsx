import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import { IconFileBroken } from "@tabler/icons-react";

import type { TemplateType } from "@/types/formTemplate.types";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const FormTemplatesGallery = ({
  allFormTemplates,
}: {
  allFormTemplates: TemplateType[];
}) => {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {allFormTemplates.map((item, i) => (
        <BentoGridItem
          key={item.id}
          title={item.formName}
          description={item.creator}
          header={<Skeleton />}
          icon={<IconFileBroken />}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
};

export default FormTemplatesGallery;
