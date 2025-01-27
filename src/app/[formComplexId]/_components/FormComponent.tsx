import { useDrop, type DropTargetMonitor } from "react-dnd";

import { Button } from "@/components/ui/button";
import ControlViewComponent from "./ControlViewComponent";

import { FORM_COMPONENTS, FORM_PAGE } from "@/constant/form-entites";
import type {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
} from "@/types/formTemplate.types";

interface FormComponentProps {
  name?: string;

  page?: FormLayoutComponentContainerType;
  _children?: FormLayoutComponentChildrenType[];
  selectedEntity?:
    | FormLayoutComponentContainerType
    | FormLayoutComponentChildrenType;
  accept: string;
  deletePage?: (containerId: string) => void;
  deleteEntity?: (controlId: string, containerId: string) => void;
  selectEntity?: (
    item:
      | FormLayoutComponentChildrenType
      | FormLayoutComponentContainerType
      | undefined
  ) => void;
  moveEntity?: (
    item: FormLayoutComponentChildrenType,
    dragIndex: number,
    hoverIndex: number,
    containerId: string
  ) => void;

  handleEntityAdded?: (
    entity: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string
  ) => void;
}

function FormComponent({
  page,
  _children,
  accept,
  selectedEntity,
  handleEntityAdded,
  deletePage,
  deleteEntity,
  selectEntity,
  moveEntity,
}: FormComponentProps) {
  const [{ canDrop, isOver }, drop] = useDrop<
    { type: string }, // The type of the dragged item
    FormLayoutComponentContainerType, // The type returned by drop
    { isOver: boolean; canDrop: boolean } // The collected properties
  >(() => ({
    accept: accept,
    drop: () => page,
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor =
    accept && accept === FORM_COMPONENTS.CONTROL
      ? "rgba(255,255,255,1)"
      : "rgba(0,0,0,0.1)";
  let borderColor = "rgba(0,0,0,0.1)";
  const borderBase = "1px solid";

  let border;

  if (isActive) backgroundColor = "rgba(46,212,182,0.4)";
  else if (canDrop) backgroundColor = "rgba(255,178,15,0.7)";

  if (accept === FORM_COMPONENTS.CONTROL)
    border = borderBase + " " + borderColor;

  if (
    selectedEntity &&
    selectedEntity.itemType === page?.itemType &&
    selectedEntity.id === page.id
  ) {
    borderColor = "rgb(255, 193, 7)";
    border = borderBase + " " + borderColor;
  }

  const handleDeleteContainer: React.MouseEventHandler<HTMLSpanElement> = (
    event
  ) => {
    if (deletePage) deletePage(page?.id as string);
    if (event.stopPropagation) event.stopPropagation();
  };

  return (
    <div
      className="mb-3 rounded-lg"
      style={{ backgroundColor, border }}
      ref={drop as unknown as React.Ref<HTMLDivElement>}
    >
      {accept === FORM_COMPONENTS.CONTAINER ? (
        <>
          <div className="flex justify-center items-center p-4">
            <Button
              type="button"
              className="font-semibold"
              onClick={() => {
                if (handleEntityAdded) {
                  handleEntityAdded({ ...FORM_PAGE[0] });
                }
              }}
            >
              Add a Block
            </Button>
          </div>
        </>
      ) : null}
      {accept === FORM_COMPONENTS.CONTROL ? (
        <>
          <div
            onClick={() => (selectEntity ? selectEntity(page) : null)}
            className="flex flex-wrap gap-4 justify-between items-center p-4 border-b-2"
            style={{ cursor: "pointer" }}
          >
            <div>
              <h5>{(page as FormLayoutComponentContainerType)?.heading}</h5>
              <p className="m-0">
                {(page as FormLayoutComponentContainerType)?.subHeading}
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <Button className="" onClick={handleDeleteContainer}>
                Delete
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex flex-column justify-center items-center min-h-[20vh] relative">
              {_children?.length === 0 ? (
                <div className="bg-slate-100 px-4 font-medium flex gap-2 items-center">
                  <span className="">Drop Field</span>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {_children?.map((child, ind) => {
                    return (
                      <ControlViewComponent
                        key={child.id}
                        entity={child}
                        selectedEntity={selectedEntity}
                        pageId={page?.id as string}
                        index={ind}
                        deleteEntity={(controlId, containerId) =>
                          deleteEntity
                            ? deleteEntity(controlId, containerId)
                            : null
                        }
                        selectEntity={(page) =>
                          selectEntity ? selectEntity(page) : null
                        }
                        moveEntity={(item, dragIndex, hoverIndex, pageId) => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          moveEntity
                            ? moveEntity(item, dragIndex, hoverIndex, pageId)
                            : null;
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}{" "}
    </div>
  );
}

export default FormComponent;
