# rn-modal-date-picker

plateform independant date picker modal for react native

## Installation

```sh
npm install rn-modal-date-picker
```

### sample

![](https://github.com/AslamJM/rn-modal-date-picker/blob/main/sample.gif)

## Usage

```ts
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
        fontFamily="PublicSans_Light"
        disablePast={true}
        //disableFuture = {true}
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

// ...
```
