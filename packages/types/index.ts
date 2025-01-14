export const notificationSchema = {
  type: "object",
  required: ["message"],
  properties: {
    message: { type: "string" },
  },
};

export interface NotificationPayload {
  message: string;
}
