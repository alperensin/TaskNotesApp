import { NativeModules, Platform } from 'react-native';

const { DeviceInfoBridge } = NativeModules;

export interface DeviceInfo {
  deviceName: string;
  systemVersion: string;
  appVersion: string;
  buildNumber: string;
  platform: string;
}

export async function getDeviceInfo(): Promise<DeviceInfo> {
  return DeviceInfoBridge.getDeviceInfo();
}

export async function getSystemVersion(): Promise<string> {
  return DeviceInfoBridge.getSystemVersion();
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
