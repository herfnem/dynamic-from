// import type { FC } from "react";
// import { cn } from "@/lib/utils";
// import { FormItemRenderEngine } from "./render-engine";

// interface DynamicFormProps {
//   className?: string;
// }

// export interface Manifest {
//   render_type: string;
//   placeholder: string;
//   label: string;
//   is_required: boolean;
//   type: string;
//   className: string;
// }

// const manifest: Manifest[] = [
//   {
//     render_type: "input",
//     placeholder: "Enter your name",
//     label: "Name",
//     is_required: true,
//     type: "text",
//     className: "w-full",
//   },
//   {
//     render_type: "checkbox",
//     placeholder: "",
//     label: "Aeroplane Mode",
//     is_required: true,
//     type: "boolean",
//     className: "",
//   },
// ];

// export const DynamicForm: FC<DynamicFormProps> = ({ className }) => {
//   return (
//     <div className={cn("h-screen w-screen", className)}>
//       <div className="p-10 w-3/4">
//         {manifest.map((m) => (
//           <FormItemRenderEngine manifest={m} />
//         ))}
//       </div>
//     </div>
//   );
// };
