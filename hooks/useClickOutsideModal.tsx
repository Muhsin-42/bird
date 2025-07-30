import React, { useEffect, useRef } from 'react';

const useClickOutsideModal = ({
  show,
  onClose,
  isLoading,
}: {
  show: boolean;
  onClose: () => void;
  isLoading: boolean;
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else if (!isLoading) {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);
  return { popupRef };
};

export default useClickOutsideModal;
