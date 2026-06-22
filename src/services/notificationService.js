import * as Notifications
  from 'expo-notifications';

Notifications
  .setNotificationHandler({

    handleNotification:
      async () => ({

      shouldShowBanner:
        true,

      shouldShowList:
        true,

      shouldPlaySound:
        false,

      shouldSetBadge:
        false,

    }),

});

export const requestNotificationPermission =
  async () => {

    const {
      status,
    } =
      await Notifications
        .requestPermissionsAsync();

    return status ===
      'granted';
};

export const kirimNotifikasi =
  async (
    judul,
    pesan
  ) => {

    await Notifications
      .scheduleNotificationAsync({

      content: {
        title: judul,
        body: pesan,
      },

      trigger: null,

    });

};