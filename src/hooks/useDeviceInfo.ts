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
    let isMounted = true;

    const loadDeviceInfo = async () => {
      try {
        const info = await getDeviceInfo();
        if (isMounted) {
          setDeviceInfo(info);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao carregar info do dispositivo:", error);
        if (isMounted) setIsLoading(false);
      }
    };

    loadDeviceInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    deviceInfo,
    platform: getDevicePlatform(),
    isLoading,
  };
}
