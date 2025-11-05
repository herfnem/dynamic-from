import { NEWForm } from "@/components/new-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dynamic-from/")({
  component: NEWForm,
});
