import z from "zod/v3";
import type { FormManifest } from "./types";

export const generateZodSchema = (manifest: FormManifest): z.ZodType => {
  const shape: Record<string, z.ZodType> = {};

  manifest.fields.forEach((field) => {
    let schema: z.ZodType;
    const { validation: rules } = field;
    const reqError = {
      message: rules.errorMessage || `${field.label} is required.`,
    };

    switch (rules.type) {
      case "email": {
        let emailSchema = z
          .string(reqError)
          .email({ message: "Invalid email address." });
        if (rules.required) {
          emailSchema = emailSchema.min(1, reqError);
        }
        if (rules.minLength) {
          emailSchema = emailSchema.min(rules.minLength, {
            message: `${field.label} must be at least ${rules.minLength} characters.`,
          });
        }
        if (rules.maxLength) {
          emailSchema = emailSchema.max(rules.maxLength, {
            message: `${field.label} must be no more than ${rules.maxLength} characters.`,
          });
        }
        if (rules.pattern) {
          emailSchema = emailSchema.regex(rules.pattern, {
            message: `${field.label} is invalid.`,
          });
        }
        schema = emailSchema;
        break;
      }
      case "number": {
        let numberSchema = z.number(reqError);
        if (rules.min !== undefined) {
          numberSchema = numberSchema.min(rules.min, {
            message: `${field.label} must be at least ${rules.min}.`,
          });
        }
        if (rules.max !== undefined) {
          numberSchema = numberSchema.max(rules.max, {
            message: `${field.label} must be no more than ${rules.max}.`,
          });
        }
        schema = numberSchema;
        break;
      }
      case "boolean": {
        let boolSchema = z.boolean();
        if (rules.required === false) {
          boolSchema.refine((val) => (val === false ? true : true));
        }
        schema = boolSchema;
        break;
      }
      case "date": {
        schema = z.date(reqError);
        // We could add min/max for dates here if needed
        break;
      }
      case "string":
      default: {
        let stringSchema = z.string(reqError);
        if (rules.required) {
          stringSchema = stringSchema.min(1, reqError);
        }
        if (rules.minLength) {
          stringSchema = stringSchema.min(rules.minLength, {
            message: `${field.label} must be at least ${rules.minLength} characters.`,
          });
        }
        if (rules.maxLength) {
          stringSchema = stringSchema.max(rules.maxLength, {
            message: `${field.label} must be no more than ${rules.maxLength} characters.`,
          });
        }
        if (rules.pattern) {
          stringSchema = stringSchema.regex(rules.pattern, {
            message: `${field.label} is invalid.`,
          });
        }
        schema = stringSchema;
        break;
      }
    }

    if (rules.type === "boolean" && !rules.required) {
      schema = schema.optional();
    } else if (!rules.required) {
      schema = schema.optional().or(z.literal(""));
      if (rules.type === "number") {
        schema = schema.or(z.literal(undefined));
      }
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
};

export const generateDefaultValues = (
  manifest: FormManifest
): Record<string, any> => {
  const values: Record<string, any> = {};
  manifest.fields.forEach((field) => {
    values[field.name] =
      field.defaultValue !== undefined
        ? field.defaultValue
        : field.type === "checkbox"
        ? false
        : field.type === "number"
        ? undefined
        : "";
  });
  return values;
};
