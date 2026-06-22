import * as TaskManager
  from 'expo-task-manager';

import * as BackgroundTask
  from 'expo-background-task';

const TASK_NAME =
  'sync-matakuliah-task';

TaskManager.defineTask(
  TASK_NAME,
  async () => {

    try {

      console.log(
        'Background Sync Berjalan'
      );

      return true;

    } catch (error) {

      console.log(error);

      return false;

    }

  }
);

export const registerBackgroundTask =
  async () => {

    try {

      await BackgroundTask.registerTaskAsync(
        TASK_NAME
      );

      console.log(
        'Background Task Terdaftar'
      );

    } catch (error) {

      console.log(error);

    }

  };