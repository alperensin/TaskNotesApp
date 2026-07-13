import { NativeModules, Platform } from 'react-native';

const { DeviceInfoModule } = NativeModules;

export interface DeviceInfo {
  deviceName: string;
  systemVersion: string;
  appVersion: string;
  buildNumber: string;
  platform: string;
}

export const getDeviceInfo = async () => {
  if (Platform.OS === 'web') {
    return {
      uniqueId: 'web-browser',
      brand: 'Browser',
      model: navigator.userAgent,
    };
  }

  return await DeviceInfoModule.getDeviceInfo();
};

export async function getSystemVersion(): Promise<string> {
  return DeviceInfoModule.getSystemVersion();
}

export function getDevicePlatform(): string {
  return Platform.OS;
}

export function isIOS(): boolean {
  return Platform.OS === 'ios';
}

export function isAndroid(): boolean {
  return Platform.OS === 'android';
}
