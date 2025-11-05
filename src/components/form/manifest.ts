import type { FormManifest } from "./types";

export const exampleFormManifest: FormManifest = {
  formId: "userProfileForm",
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      defaultValue: "johndoe",
      description: "This is your public display name.",
      validation: {
        type: "string",
        required: true,
        minLength: 3,
      },
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      defaultValue: "you@example.com",
      placeholder: "you@example.com",
      validation: {
        type: "email",
        required: true,
      },
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
      validation: {
        type: "number",
        required: true,
        min: 18,
        errorMessage: "You must be 18 or older.",
      },
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      validation: {
        type: "string",
        required: true,
      },
      options: [
        { value: "engineering", label: "Engineering" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
      ],
    },
    {
      name: "userId",
      label: "Select User (from API)",
      type: "select",
      validation: {
        type: "string",
        required: true,
      },
      optionsApi: {
        url: "https://jsonplaceholder.typicode.com/users",
        valueField: "id",
        labelField: "name",
      },
    },
    {
      name: "bio",
      label: "Biography",
      type: "textarea",
      placeholder: "Tell us about yourself...",
      validation: {
        type: "string",
        required: false,
        maxLength: 500,
      },
    },
    {
      name: "terms",
      label: "I agree to the terms and conditions",
      type: "checkbox",
      validation: {
        type: "boolean",
        required: true,
        errorMessage: "You must accept the terms.",
      },
    },
    {
      name: "plan",
      label: "Subscription Plan",
      type: "radio",
      defaultValue: "free",
      validation: {
        type: "string",
        required: true,
      },
      options: [
        { value: "free", label: "Free Tier" },
        { value: "pro", label: "Pro Tier" },
      ],
    },
  ],
};
