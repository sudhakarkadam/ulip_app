import React, { useState } from "react";
//@ts-ignore
import DropDownPicker from "react-native-dropdown-picker";
import { Flex, Text } from "./@styled/BaseElements";
import colors from "../theme/colors";
import { SelectItemType } from "../models/CommonModel";

interface OwnProps {
  label?: string;
  defaultValue: string;
  data: SelectItemType[];
  getSelectedValue: (val: string) => void;
}

const SelectComponent = (props: OwnProps) => {
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);
  const { label, data, getSelectedValue, onOpen } = props;
  return (
    <Flex>
      {label && (
        <Text mb={3} color={`${colors.grays[5]}`} fontSize={1}>
          {label}
        </Text>
      )}
      <DropDownPicker
        items={data}
        defaultValue={selectedValue}
        containerStyle={{ height: 40 }}
        arrowStyle={{ marginRight: 10 }}
        searchable={true}
        dropDownStyle={{ backgroundColor: "white" }}
        onChangeItem={(item: SelectItemType) => {
          getSelectedValue(item.value);
          setSelectedValue(item.value);
        }}
      />
    </Flex>
  );
};

export default SelectComponent;
