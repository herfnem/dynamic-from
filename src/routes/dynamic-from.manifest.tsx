import { ChangeManifest } from "@/components/change-manifest";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dynamic-from/manifest")({
  component: ChangeManifest,
});
