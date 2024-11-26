import React from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDevice = (): DeviceType => {
  const getDeviceType = (): DeviceType => {
    const width = window.innerWidth;

    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  };

  const [deviceType, setDeviceType] = React.useState<DeviceType>(getDeviceType);

  React.useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};
