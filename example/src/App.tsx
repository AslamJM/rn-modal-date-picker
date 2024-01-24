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
        disablepast={true}
        disabelFuture={true}
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
