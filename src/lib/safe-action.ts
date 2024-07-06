import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";

export const actionClient = createSafeActionClient();

export const unauthenticatedAction = createSafeActionClient()