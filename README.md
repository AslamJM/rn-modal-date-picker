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
onst [date, setDate] = React.useState(new Date());
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
      />
      <Button title="Open" onPress={openDatePicker} />
      <Text>{date.toDateString()}</Text>
    </View>
  );
// ...

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
