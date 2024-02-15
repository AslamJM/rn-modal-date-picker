import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Easing,
  Modal,
  TouchableWithoutFeedback,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  View,
} from 'react-native';

import React, { useRef } from 'react';
import styles from '../styles/modal';
import DatePicker from './DatePicker';

type ModalProps = {
  isVisible: boolean;
  onPressBackDrop?: () => void;
  onHideModal: () => void;
  backdropStyles?: StyleProp<ViewStyle>;
  contentStyles?: StyleProp<ViewStyle>;
  okButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  mainColor?: string;
  contrastColor?: string;
  fontFamily?: string;
  disablepast?: boolean;
  disabelFuture?: boolean;
  dateTextStyle?: StyleProp<TextStyle>;
  monthTextStyle?: StyleProp<TextStyle>;
  yearTextStyle?: StyleProp<TextStyle>;
  weekTextStyle?: StyleProp<TextStyle>;
  okButtonTextStyle?: StyleProp<TextStyle>;
  cancelButtonTextStyle?: StyleProp<TextStyle>;
};

const PickerModal = ({
  isVisible,
  onPressBackDrop,
  onHideModal,
  backdropStyles,
  contentStyles,
  date,
  setDate,
  mainColor,
  contrastColor,
  fontFamily,
  disablepast = false,
  disabelFuture = false,
  dateTextStyle,
  monthTextStyle,
  yearTextStyle,
  okButtonStyle,
  okButtonTextStyle,
  cancelButtonStyle,
  cancelButtonTextStyle,
  weekTextStyle,
}: ModalProps) => {
  const [deviceWidth, setDeviceWidth] = React.useState(
    Dimensions.get('window').width
  );
  const [deviceHeight, setDeviceHeight] = React.useState(
    Dimensions.get('window').height
  );
  const [animVal] = React.useState(new Animated.Value(0));
  const [mounted, setIsMounted] = React.useState(true);

  const deviceEventEmitter = useRef<any>(null);

  const handleDimentionUpdate = (dimensionsUpdate: {
    window: { width: number; height: number };
  }) => {
    const { width, height } = dimensionsUpdate.window;
    if (width !== deviceWidth || height !== deviceHeight) {
      setDeviceWidth(width);
      setDeviceHeight(height);
    }
  };

  const showModal = () => {
    Animated.timing(animVal, {
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
      duration: 300,
      toValue: 1,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(animVal, {
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
      duration: 300,
      toValue: 0,
    }).start(() => {
      if (mounted && onHideModal) {
        onHideModal();
      }
    });
  };

  const backDropAnimations = {
    opacity: animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.4],
    }),
  };

  const contentAnimations = {
    transform: [
      {
        translateY: animVal.interpolate({
          inputRange: [0, 1],
          outputRange: [deviceHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  React.useEffect(() => {
    setIsMounted(true);
    if (isVisible) {
      showModal();
    }
    deviceEventEmitter.current = DeviceEventEmitter.addListener(
      'didUpdateDimensions',
      handleDimentionUpdate
    );
    return () => {
      if (deviceEventEmitter.current) {
        deviceEventEmitter.current.remove();
      }
      setIsMounted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  React.useEffect(() => {
    setIsMounted(true);
    if (isVisible) {
      showModal();
    } else {
      hideModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <Modal transparent animationType="none" visible={isVisible}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (onPressBackDrop) {
            onPressBackDrop();
          }
        }}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.backDrop,
              { width: deviceWidth, height: deviceHeight },
              backDropAnimations,
              backdropStyles,
            ]}
          />
          {isVisible && (
            <Animated.View
              style={[styles.content, contentAnimations, contentStyles]}
              pointerEvents="box-none"
            >
              <DatePicker
                date={date}
                setDate={setDate}
                onPressCancel={onHideModal}
                mainColor={mainColor}
                contrastColor={contrastColor}
                fontFamily={fontFamily}
                disablePast={disablepast}
                disableFuture={disabelFuture}
                dateTextStyle={dateTextStyle}
                monthTextStyle={monthTextStyle}
                yearTextStyle={yearTextStyle}
                okButtonStyle={okButtonStyle}
                cancelButtonStyle={cancelButtonStyle}
                okButtonTextStyle={okButtonTextStyle}
                cancelButtonTextStyle={cancelButtonTextStyle}
                weekTextStyle={weekTextStyle}
              />
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PickerModal;
