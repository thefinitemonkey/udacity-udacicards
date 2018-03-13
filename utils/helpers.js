export const UDACI_CARDS_APPLICATION_KEY = "FMCards";
export const NOTIFICATION_KEY = "FMCards:Notifications";

import { Notifications, Permissions } from "expo";
import { AsyncStorage } from "react-native";


export const getUUID = () => {
  const uuidv1 = require("uuid/v1");
  return uuidv1();
};

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function createLocalNotification() {
  return {
    title: "Take a quiz!",
    body: "Don't forget to quiz yourself for some learning today",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  // Get the existing notification data
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      // If there isn't any existing data then set up the notification
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            console.log("permissions status", status);
          if (status === "granted") {
            // Clear notifications just in case we've missed one somewhere
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(
              createLocalNotification(),
              {
                time: tomorrow,
                repeat: "day"
              }
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
