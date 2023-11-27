import { StyleSheet } from 'react-native';

const styles = (color: string, contrast: string, fontFamily?: string) => {
  return StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 15,
      height: 380,
      width: '80%',
      justifyContent: 'space-between',
      overflow: 'hidden',
      position: 'relative',
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    yearBtn: {
      paddingHorizontal: 15,
      backgroundColor: '#f1f1f1',
      paddingVertical: 4,
      borderRadius: 4,
    },

    monthContainer: {
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
    },

    chevrons: {
      height: 25,
      width: 25,
    },

    monthBtn: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    weekContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    weekTab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weekText: {
      fontWeight: '600',
      fontFamily: fontFamily,
    },

    calnederRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    calnederRowDate: {
      flex: 1,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },

    pickedDate: {
      backgroundColor: color,
      borderRadius: 4,
    },

    dateText: { textAlign: 'center', fontFamily: fontFamily },
    pickedDateText: {
      color: contrast,
    },

    buttonContainer: {
      height: 52,
      flexDirection: 'row',
      paddingVertical: 5,
      borderTopColor: '#e4e4e4',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    button: {
      width: 100,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginHorizontal: 15,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },

    buttonText: {
      color: contrast,
      fontFamily: fontFamily,
    },

    // year picker
    yearContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      backgroundColor: '#fff',
      paddingVertical: 10,
    },
    scrollBtn: {
      paddingVertical: 10,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flatListYear: {
      flex: 5,
      width: '100%',
    },
    yearSelector: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      flex: 1,
      margin: 5,
    },
    yearSelectorText: {
      fontWeight: '500',
      fontFamily: fontFamily,
    },
    selectedYearText: {
      color: contrast,
    },
    closeBtn: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f1f1',
      borderRadius: 15,
    },

    closeIcon: {
      width: 15,
      height: 15,
    },

    flatListMonth: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    monthSelector: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      marginVertical: 5,
      marginHorizontal: 15,
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: color,
      borderRadius: 8,
    },
    selectorTexts: {
      fontFamily: fontFamily,
    },
  });
};

export default styles;
