import { createToaster } from "@chakra-ui/react";

export const placementToasters = {
  "top-start":    createToaster({ placement: "top-start",    pauseOnPageIdle: true }),
  "top":          createToaster({ placement: "top",          pauseOnPageIdle: true }),
  "top-end":      createToaster({ placement: "top-end",      pauseOnPageIdle: true }),
  "bottom-start": createToaster({ placement: "bottom-start", pauseOnPageIdle: true }),
  "bottom":       createToaster({ placement: "bottom",       pauseOnPageIdle: true }),
  "bottom-end":   createToaster({ placement: "bottom-end",   pauseOnPageIdle: true }),
} as const;

export type PlacementKey = keyof typeof placementToasters;
