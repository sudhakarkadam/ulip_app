import React, { useState } from "react";
//@ts-ignore
import DropDownPicker from "react-native-dropdown-picker";
import { Flex } from "./@styled/BaseElements";
import colors from "../theme/colors";
import { SelectItemType } from "../models/CommonModel";
import { SecondaryLabel } from "./@styled/Text";

interface OwnProps {
  label?: string;
  defaultValue: string;
  data: SelectItemType[];
  getSelectedValue: (val: string) => void;
  searchable?: boolean;
}

const SelectComponent = (props: OwnProps) => {
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);
  const { label, data, getSelectedValue } = props;
  return (
    <Flex mb={6}>
      {label && (
        <SecondaryLabel mb={3} style={{ textTransform: "none" }}>
          {label}
        </SecondaryLabel>
      )}
      <DropDownPicker
        items={data}
        defaultValue={selectedValue}
        style={{
          border: `1px solid ${colors.grays[2]}`,
          paddingHorizontal: 20,
          borderTopRightRadius: 2,
          borderTopLeftRadius: 2,
          borderBottomRightRadius: 2,
          borderBottomLeftRadius: 2,
          borderColor: colors.grays[2]
        }}
        labelStyle={{
          color: colors.primary,
          fontSize: 16,
          fontFamily: "Roboto-Regular"
        }}
        containerStyle={{
          height: 46
        }}
        arrowStyle={{ marginRight: 10 }}
        searchable={props.searchable}
        dropDownStyle={{ backgroundColor: "white", paddingHorizontal: 20 }}
        onChangeItem={(item: SelectItemType) => {
          getSelectedValue(item.value);
          setSelectedValue(item.value);
        }}
      />
    </Flex>
  );
};

export default SelectComponent;
