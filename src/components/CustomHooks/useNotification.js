import { useEffect } from "react";

// 通知に関するHook
const useNotification = (workingStatus) => {
  useEffect(() => {
    // Notification APIに対応しているか
    if (!("Notification" in window)) {
      console.log("this browser does not support notification");
    } else {
      // Notification.requestPermission()のプロミス版に対応しているか確認
      if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
          handlePermission(permission);
        });
      } else {
        Notification.requestPermission(function (permission) {
          handlePermission(permission);
        });
      }
    }
  }, []);

  useEffect(() => {
    // timerが終了したら通知 TODO: 初期状態の考慮
    if (
      !workingStatus.isStart &&
      window.Notification &&
      Notification.permission === "granted"
    ) {
      if (workingStatus.nextAction === "break") {
        new Notification("Yasume", {
          icon: "../../icnos/notification.png",
          body: "お疲れまでした！休憩を取ってください！",
        });
      } else if (workingStatus.nextAction === "work") {
        new Notification("Yasume", {
          icon: "../../icnos/notification.png",
          body: "休憩時間が終わりました！準備ができたら作業を始めましょう！",
        });
      }
    }
  }, [workingStatus]);

  // Notification APIがPromiseに対応してるか確認する
  const checkNotificationPromise = () => {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }

    return true;
  };

  // 通知の許可を求める関数
  const handlePermission = (permission) => {
    // Whatever the user answers, we make sure Chrome stores the information
    if (!("permission" in Notification)) {
      Notification.permission = permission;
    }
  };
};

export default useNotification;
