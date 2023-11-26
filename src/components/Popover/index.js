import React from "react";

import "./index.scss";

const BUFFER_PIXELS = 15;

export const PLACEMENTS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

const Popover = ({ visible, children, onClose, placement }, ref) => {
  const childrenRef = React.useRef();
  const [position, setPosition] = React.useState({});
  const readPopoverPosition = React.useCallback(() => {
    if (ref.current && childrenRef.current) {
      const refPosition = ref.current.getBoundingClientRect();
      if (placement === PLACEMENTS.TOP) {
        setPosition({
          left: refPosition.left,
          top: refPosition.top - (childrenRef.current.offsetHeight + BUFFER_PIXELS),
        });
      } else if (placement === PLACEMENTS.BOTTOM) {
        setPosition({
          left: refPosition.left,
          top: refPosition.bottom + BUFFER_PIXELS
        });
      } else if (placement === PLACEMENTS.RIGHT) {
        setPosition({
          left: refPosition.right + BUFFER_PIXELS,
          top: refPosition.top,
        });
      } else if (placement === PLACEMENTS.LEFT) {
        setPosition({
          left: refPosition.left - (childrenRef.current.offsetWidth + BUFFER_PIXELS),
          top: refPosition.top,
        });
      }
    }
  }, [ref, placement]);
  React.useEffect(() => {
    if (visible) {
      readPopoverPosition();
    }
  }, [visible, readPopoverPosition]);

  return (
    <div
      className={`popover popover--${placement} ${visible ? 'popover--visible' : ''}`}
      style={position}
      ref={childrenRef}
    >
      {children}
      <button onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default React.forwardRef(Popover);
