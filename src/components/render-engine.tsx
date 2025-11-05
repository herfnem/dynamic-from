// import type { FC } from "react";
// import type { Manifest } from "./dynamic-form";
// import { Input } from "./ui/input";
// import { Checkbox } from "./ui/checkbox";
// import { Label } from "./ui/label";

// interface FormItemRenderEngineProps {
//   manifest: Manifest;
// }

// export const FormItemRenderEngine: FC<FormItemRenderEngineProps> = ({
//   manifest,
// }) => {
//   switch (manifest.render_type) {
//     case "input":
//       return (
//         <Input
//           placeholder={manifest.placeholder}
//           className={manifest.className}
//         />
//       );

//     case "checkbox":
//       return (
//         <div className="flex items-center gap-4">
//           <Checkbox />
//           <Label children={manifest.label} />
//         </div>
//       );

//     default:
//       return null;
//   }
// };
