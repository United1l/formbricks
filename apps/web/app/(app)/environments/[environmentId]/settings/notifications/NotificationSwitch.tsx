"use client";

import { Switch } from "@formbricks/ui";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateNotificationSettingsAction } from "./actions";
import { NotificationSettings } from "@formbricks/types/users";
import { useState } from "react";

interface NotificationSwitchProps {
  surveyOrProductId: string;
  notificationSettings: NotificationSettings;
  notificationType: "alert" | "weeklySummary";
}

export function NotificationSwitch({
  surveyOrProductId,
  notificationSettings,
  notificationType,
}: NotificationSwitchProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Switch
      id="notification-switch"
      aria-label="toggle notification settings"
      checked={notificationSettings[notificationType][surveyOrProductId]}
      disabled={isLoading}
      onCheckedChange={async () => {
        setIsLoading(true);
        // update notificiation settings
        const updatedNotificationSettings = { ...notificationSettings };
        updatedNotificationSettings[notificationType][surveyOrProductId] =
          !updatedNotificationSettings[notificationType][surveyOrProductId];
        await updateNotificationSettingsAction(notificationSettings);
        setIsLoading(false);
        toast.success(`Notification settings updated`, { id: "notification-switch" });
        router.refresh();
      }}
    />
  );
}
