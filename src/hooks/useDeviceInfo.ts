import { useState, useEffect } from 'react';

import {
  getDeviceInfo,
  getDevicePlatform,
  DeviceInfo,
} from '../native/DeviceInfo';

interface UseDeviceInfoReturn {
  deviceInfo: DeviceInfo | null;
  platform: string;
  isLoading: boolean;
}

export function useDeviceInfo(): UseDeviceInfoReturn {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDeviceInfo();
  }, []);

  const loadDeviceInfo = async () => {
    try {
      const info = await getDeviceInfo();
      setDeviceInfo(info);
    } catch {
      setDeviceInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deviceInfo,
    platform: getDevicePlatform(),
    isLoading,
  };
}
