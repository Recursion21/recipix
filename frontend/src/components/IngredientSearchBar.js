import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const IngredientSearchBar = (props) => {
  const {
    options,
    value,
    isMulti,
    onChange,
    placeholder,
    closeMenuOnSelect,
  } = props;

  const filterOption = ({ label, value }, string) => {
    label = label.toLocaleLowerCase();
    string = string.toLocaleLowerCase();
    // default search
    if (label.includes(string) || value.includes(string)) return true;

    // check if a group as the filter string as label
    const groupOptions = options.filter((group) =>
      group.label.toLocaleLowerCase().includes(string)
    );

    if (groupOptions) {
      for (const groupOption of groupOptions) {
        // Check if current option is in group
        const option = groupOption.options.find((opt) => opt.value === value);
        if (option) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Select
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
      components={makeAnimated()}
      options={options}
      formatGroupLabel={formatGroupLabel}
      filterOption={filterOption}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
export default IngredientSearchBar;
