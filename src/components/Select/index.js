import React from "react";

import Popover, { PLACEMENTS } from "../Popover";
import './index.scss';

const Select = ({
  label = 'Select an Option...', children,
  clearSelection = true, keepDropdownOpen = false,
}) => {
  const ref = React.useRef();
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const toggleDropdown = React.useCallback(() => {
    setDropdownVisible(prev => !prev);
  }, []);
  const selectValue = React.useCallback((value) => {
    if (clearSelection && selectedValue === value) {
      setSelectedValue(null);
    } else {
      setSelectedValue(value);
    }
    if (!keepDropdownOpen) {
      toggleDropdown();
    }
  }, [clearSelection, keepDropdownOpen, selectedValue, toggleDropdown]);

  return (
    <div className="select">
      <button onClick={toggleDropdown} ref={ref} className="select__label">
        {selectedValue ? selectedValue : label}
      </button>
      <Popover
        visible={dropdownVisible}
        placement={PLACEMENTS.BOTTOM}
        ref={ref}
        showCloseButton={false}
        className="select__dropdown"
        style={{ width: ref.current ? ref.current.offsetWidth : 0 }}
      >
        {
          React.Children.map(children, (child) => (
            React.cloneElement(child, {
              onClick: () => selectValue(child.props.value),
            })
          ))
        }
      </Popover>
    </div>
  );
};

export default Select;
