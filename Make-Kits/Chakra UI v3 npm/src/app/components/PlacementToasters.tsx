import React from "react";
import { Portal, Theme, Toaster, Toast, Stack, Spinner } from "@chakra-ui/react";
import { placementToasters, type PlacementKey } from "../lib/placementToasters";

interface Props {
  colorMode: "light" | "dark";
}

const placements = Object.keys(placementToasters) as PlacementKey[];

export function PlacementToasters({ colorMode }: Props) {
  return (
    <>
      {placements.map((placement) => (
        <Portal key={placement}>
          <Theme appearance={colorMode}>
            <Toaster toaster={placementToasters[placement]}>
              {(toast) => (
                <Toast.Root width={{ md: "sm" }}>
                  {toast.type === "loading" ? (
                    <Spinner size="sm" color="blue.solid" />
                  ) : (
                    <Toast.Indicator />
                  )}
                  <Stack gap="1" flex="1" maxWidth="100%">
                    {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                    {toast.description && (
                      <Toast.Description>{toast.description}</Toast.Description>
                    )}
                  </Stack>
                  {toast.action && (
                    <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
                  )}
                  <Toast.CloseTrigger />
                </Toast.Root>
              )}
            </Toaster>
          </Theme>
        </Portal>
      ))}
    </>
  );
}
