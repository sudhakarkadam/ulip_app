import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Flex, Text } from "./@styled/BaseElements";
import colors from "../theme/colors";
import moment from "moment";

interface OwnProps {
  label?: string;
  defaultDate: string;
  getSelectedDate: (val: string) => void;
}

const SelectComponent = (props: OwnProps) => {
  const [date, setDate] = useState({
    [props.defaultDate]: { color: `${colors.greens[3]}` }
  });
  const { label, getSelectedDate } = props;
  return (
    <Flex>
      {label && (
        <Text mb={3} color={`${colors.grays[5]}`} fontSize={1}>
          {label}
        </Text>
      )}
      <Calendar
        markedDates={date}
        minDate={moment().format("YYYY-MM-DD")}
        onDayPress={day => {
          setDate({ [day.dateString]: { color: `${colors.greens[3]}` } });
          getSelectedDate(day.dateString);
        }}
        monthFormat={"yyyy MM"}
        onMonthChange={month => {
          setDate({ [month.dateString]: { color: `${colors.greens[3]}` } });
          getSelectedDate(month.dateString);
        }}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={false}
        hideDayNames={false}
        markingType={"period"}
        showWeekNumbers={false}
      />
    </Flex>
  );
};

export default SelectComponent;
