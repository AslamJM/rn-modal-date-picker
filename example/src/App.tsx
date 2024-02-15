import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import DatePickerModal from 'rn-modal-date-picker';

export default function App() {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const openDatePicker = () => {
    setShow(true);
  };

  const closeDatePicker = () => {
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <DatePickerModal
        date={date}
        setDate={setDate}
        onHideModal={closeDatePicker}
        isVisible={show}
        mainColor="#ddd111"
        contrastColor="#fff"
        okButtonStyle={{
          borderRadius: 10,
          backgroundColor: '#116e22',
        }}
        cancelButtonStyle={{
          height: 60,
          borderWidth: 3,
        }}
        cancelButtonTextStyle={{
          fontWeight: '800',
        }}
        okButtonTextStyle={{
          letterSpacing: 1.6,
        }}
        weekTextStyle={{
          color: '#dd11ee',
          fontSize: 15,
        }}
        dateTextStyle={{
          color: '#111488',
        }}
        monthTextStyle={{
          color: '#22335f',
        }}
        yearTextStyle={{
          color: '#22ff55',
        }}
      />
      <Button title="Open" onPress={openDatePicker} />
      <Text>{date.toDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
