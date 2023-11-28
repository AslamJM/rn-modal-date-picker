/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  FlatList,
  Image,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  daysInMonth,
  firstDayOftheMonth,
  getWeekDaysShort,
  sameDay,
  getMonthName,
  generateYearRange,
  monthsShort,
} from '../utils/date';
import icons from '../icons';
import stylesGenerator from '../styles/datePickerStyles';

type PickerProps = {
  onPressCancel: () => void;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  mainColor?: string;
  contrastColor?: string;
  fontFamily?: string;
  disablePast?: boolean;
};

const DatePicker = ({
  onPressCancel,
  date,
  setDate,
  mainColor,
  contrastColor,
  fontFamily,
  disablePast,
}: PickerProps) => {
  const stylesfunc = useCallback(() => {
    return stylesGenerator(
      mainColor || '#ddd111',
      contrastColor || '#fff',
      fontFamily
    );
  }, [mainColor]);

  const styles = stylesfunc();

  const [pickedDate, setPickedDate] = useState(date);
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const [yearAnimatedValue] = useState(new Animated.Value(0));
  const [monthAnimatedValue] = useState(new Animated.Value(0));
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  const weekDays = useCallback(() => getWeekDaysShort(), []);

  const days = useCallback(() => daysInMonth(year, month), [year, month]);

  const firstDay = useCallback(
    () => firstDayOftheMonth(year, month),
    [year, month]
  );

  const yearRange = useCallback(() => {
    return generateYearRange(year, direction);
  }, [year, direction]);

  const calenderDayRows = () => {
    const cols = [];
    let week = [];

    for (let i = 0; i < firstDay(); i++) {
      week.push(null);
    }

    for (let day = 1; day <= days(); day++) {
      if (week.length === 7) {
        cols.push(week);
        week = [];
      }
      week.push(day);
    }
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      cols.push(week);
    }
    return cols;
  };

  const onPick = (pdate: number) => {
    setPickedDate(new Date(year, month, pdate));
  };

  const onPressChevronLeft = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const onPressChevronRight = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  /// year picker

  const showYearPicker = () => {
    setDirection(null);
    Animated.timing(yearAnimatedValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const hideYearPicker = (y: number) => {
    setYear(y);
    Animated.timing(yearAnimatedValue, {
      toValue: 0,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const yearSelectorTranslate = {
    transform: [
      {
        translateY: yearAnimatedValue.interpolate({
          easing: Easing.inOut(Easing.quad),
          inputRange: [0, 1],
          outputRange: [380, 0],
        }),
      },
    ],
  };

  const onYearScrollUp = () => {
    const years = yearRange();

    setYear(years[0] as number);
    setDirection('up');
  };

  const onYearScrollDown = () => {
    const years = yearRange();
    setYear(years.at(-1) as number);
    setDirection('down');
  };

  const yearPicker = useMemo(() => {
    return (
      <Animated.View style={[styles.yearContainer, yearSelectorTranslate]}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => hideYearPicker(year)}
        >
          <Image source={icons.close} style={styles.closeIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollBtn} onPress={onYearScrollUp}>
          <Image source={icons.up} style={[styles.chevrons]} />
        </TouchableOpacity>
        <View style={styles.flatListYear}>
          <FlatList
            numColumns={4}
            data={yearRange()}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.yearSelector,
                  item === year ? styles.pickedDate : null,
                ]}
                onPress={() => hideYearPicker(item)}
              >
                <Text
                  style={[
                    styles.yearSelectorText,
                    item === year ? styles.pickedDateText : null,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity style={styles.scrollBtn} onPress={onYearScrollDown}>
          <Image source={icons.down} style={[styles.chevrons]} />
        </TouchableOpacity>
      </Animated.View>
    );
  }, [year, direction]);

  // month picker

  const allMonths = useCallback(() => {
    return monthsShort;
  }, []);

  const showMonthPicker = () => {
    setDirection(null);
    Animated.timing(monthAnimatedValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const hideMonthPicker = (m: number) => {
    setMonth(m);
    Animated.timing(monthAnimatedValue, {
      toValue: 0,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const monthSelectorTranslate = {
    transform: [
      {
        translateY: monthAnimatedValue.interpolate({
          easing: Easing.inOut(Easing.quad),
          inputRange: [0, 1],
          outputRange: [380, 0],
        }),
      },
    ],
  };

  const monthPicker = useMemo(() => {
    return (
      <Animated.View style={[styles.yearContainer, monthSelectorTranslate]}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => hideMonthPicker(month)}
        >
          <Image source={icons.close} style={styles.closeIcon} />
        </TouchableOpacity>
        <View style={styles.flatListMonth}>
          <FlatList
            data={allMonths()}
            numColumns={3}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.monthSelector,
                  index === month ? styles.pickedDate : null,
                ]}
                onPress={() => hideMonthPicker(index)}
              >
                <Text
                  style={[
                    styles.yearSelectorText,
                    month === index ? styles.selectedYearText : null,
                  ]}
                >
                  {index + 1}
                </Text>
                <Text
                  style={[
                    styles.yearSelectorText,
                    month === index ? styles.selectedYearText : null,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Animated.View>
    );
  }, []);

  return (
    <View style={styles.body}>
      {yearPicker}
      {monthPicker}
      <View style={styles.header}>
        <View>
          <TouchableOpacity style={styles.yearBtn} onPress={showYearPicker}>
            <Text style={styles.selectorTexts}>{year}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.monthContainer}>
          <TouchableOpacity onPress={onPressChevronLeft}>
            <Image
              source={icons.left}
              alt="previous month"
              style={styles.chevrons}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.monthBtn} onPress={showMonthPicker}>
            <Text style={styles.selectorTexts}>{getMonthName(month)}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressChevronRight}>
            <Image
              source={icons.right}
              alt="next month"
              style={styles.chevrons}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.weekContainer}>
          {weekDays().map((wd) => (
            <View key={wd} style={styles.weekTab}>
              <Text style={styles.weekText}>{wd}</Text>
            </View>
          ))}
        </View>
        <View>
          {calenderDayRows().map((row, index) => (
            <View key={`row- ${index}`} style={styles.calnederRow}>
              {row.map((date, index) => {
                if (!date) {
                  return (
                    <View
                      key={`date-${index}`}
                      style={styles.calnederRowDate}
                    />
                  );
                } else {
                  return (
                    <TouchableOpacity
                      key={`date-${index}`}
                      disabled={
                        disablePast &&
                        new Date(new Date().setHours(0, 0, 0, 0)) >
                          new Date(year, month, date)
                      }
                      style={[
                        styles.calnederRowDate,
                        sameDay(pickedDate, new Date(year, month, date))
                          ? styles.pickedDate
                          : null,
                      ]}
                      onPress={() => onPick(date)}
                    >
                      <Text
                        style={[
                          styles.dateText,
                          sameDay(pickedDate, new Date(year, month, date))
                            ? styles.pickedDateText
                            : null,
                          disablePast &&
                          new Date(new Date().setHours(0, 0, 0, 0)) >
                            new Date(year, month, date)
                            ? styles.disabledDateText
                            : null,
                        ]}
                      >
                        {date}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setDate(new Date(year, month, pickedDate.getDate()));
            onPressCancel();
          }}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DatePicker;
