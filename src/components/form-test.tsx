// const m = {
//   title: "User Signup",
//   api: {
//     url: "/api/signup",
//     method: "POST",
//   },
//   fields: [
//     {
//       name: "email",
//       label: "Email Address",
//       type: "email",
//       placeholder: "you@example.com",
//       validation: {
//         required: true,
//         email: true,
//       },
//     },
//     {
//       name: "password",
//       label: "Password",
//       type: "password",
//       validation: {
//         required: true,
//         minLength: 8,
//       },
//     },
//     {
//       name: "age",
//       label: "Age",
//       type: "number",
//       validation: {
//         required: true,
//         min: 18,
//         max: 100,
//       },
//     },
//     {
//       name: "gender",
//       label: "Gender",
//       type: "select",
//       options: [
//         { label: "Male", value: "male" },
//         { label: "Female", value: "female" },
//       ],
//       validation: {
//         required: true,
//       },
//     },
//   ],
// };

// import { useEffect, useState } from "react";

// import { z, type ZodTypeAny } from "zod/v3";

// export type PrimitiveFieldValidation = {
//   required?: boolean;
//   min?: number;
//   max?: number;
//   minLength?: number;
//   maxLength?: number;
//   pattern?: string;
//   email?: boolean;
// };

// export type PrimitiveField = {
//   name: string;
//   label: string;
//   type: "text" | "email" | "password" | "number" | "select";
//   placeholder?: string;
//   options?: { label: string; value: string }[];
//   validation?: PrimitiveFieldValidation;
// };

// export type Manifest = {
//   title?: string;
//   api: { url: string; method: "POST" | "PUT" | "PATCH" };
//   fields: PrimitiveField[];
// };

// // DynamicForm.tsx
// import React from "react";
// import { Controller, useForm, type SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// type Props = {
//   manifest: Manifest;
//   onSuccess?: (data: any) => void;
//   onError?: (err: any) => void;
// };

// export const DynamicForm: React.FC<Props> = ({
//   manifest,
//   onSuccess,
//   onError,
// }) => {
//   const schema = React.useMemo(() => buildZodSchema(manifest), [manifest]);
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm({ resolver: zodResolver(schema) });

//   const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
//     try {
//       const res = await fetch(manifest.api.url, {
//         method: manifest.api.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!res.ok) throw new Error(`API error: ${res.status}`);
//       const json = await res.json();
//       onSuccess?.(json);
//     } catch (err) {
//       console.error(err);
//       onError?.(err);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-md mx-auto p-4 border rounded-md space-y-4"
//     >
//       {manifest.title && (
//         <h2 className="text-lg font-bold">{manifest.title}</h2>
//       )}

//       {manifest.fields.map((field) => (
//         <div key={field.name} className="flex flex-col space-y-1">
//           <label htmlFor={field.name} className="font-medium">
//             {field.label}
//           </label>

//           {field.type === "select" ? (
//             <select
//               id={field.name}
//               {...register(field.name)}
//               className="border p-2 rounded"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select...
//               </option>
//               {field.options?.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <input
//               id={field.name}
//               type={field.type}
//               placeholder={field.placeholder}
//               {...register(field.name)}
//               className="border p-2 rounded"
//             />
//           )}

//           {errors[field.name] && (
//             <span className="text-red-500 text-sm">
//               {(errors[field.name]?.message as string) || "Invalid input"}
//             </span>
//           )}
//         </div>
//       ))}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//       >
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </button>
//     </form>
//   );
// };

// /**
//  * Dynamically builds a Zod schema from primitive validation metadata.
//  */
// export function buildZodSchema(manifest: Manifest): z.ZodObject<any> {
//   const shape: Record<string, ZodTypeAny> = {};

//   for (const field of manifest.fields) {
//     const rules = field.validation || {};
//     let schema: ZodTypeAny;

//     switch (field.type) {
//       case "number":
//         schema = z.coerce.number({ invalid_type_error: "Must be a number" });
//         if (rules.min !== undefined)
//           schema = schema.refine((value) =>
//             value < (rules.min ?? 0) ? false : true,
//           );
//         if (rules.max !== undefined)
//           schema = schema.refine((value) =>
//             value > (rules.max ?? 0) ? false : true,
//           );
//         break;
//       default:
//         schema = z.string();
//         break;
//     }

//     if (!rules.required) schema = schema.optional();

//     shape[field.name] = schema;
//   }

//   return z.object(shape);
// }

// export default function AppForm() {
//   const [manifest, setManifest] = useState<Manifest | null>(null);

//   useEffect(() => {
//     (async () => {
//       const res = await new Promise((resolve) => resolve(m));
//       const json = await res;
//       setManifest(json as Manifest);
//     })();
//   }, []);

//   if (!manifest) return <div>Loading..</div>;

//   return (
//     <DynamicForm
//       manifest={manifest}
//       onSuccess={(data) => console.log("✅ Success:", data)}
//       onError={(err) => console.error("❌ Error:", err)}
//     />
//   );
// }
