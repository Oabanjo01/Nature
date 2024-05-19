import {Colors} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, TextStyle, View} from 'react-native';
import {Divider} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'CartScreen'>;
const TransactionSummary = ({route, navigation}: Props) => {
  const amount = 300;
  const itemNo = 3;
  const date = '12-09-1999';
  return (
    <View
      style={{
        height: screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Backbutton />
      <View style={styles.cartItemStyle}>
        <WText style={styles.itemTitleStyle}>Item Name</WText>
        {renderCartedItemDetails('No. of Items', `${itemNo}`)}
        {renderCartedItemDetails('Date', `${date} (3:04pm)`)}
        <Divider
          bold
          style={{
            marginBottom: screenHeight * 0.01,
            marginTop: screenHeight * 0.04,
          }}
        />
        {renderCartedItemDetails('Total', `$${amount * itemNo}`, {
          fontFamily: Fonts.semiBold,
        })}
      </View>
      <View style={styles.buttonStyle}>
        <WText
          style={{
            color: Colors.lightTextColor,
            fontSize: 16,
            fontFamily: Fonts.semiBold,
          }}>
          Make Payment
        </WText>
      </View>
    </View>
  );
};
function renderCartedItemDetails(
  title: string,
  specifics: string | number,
  titleStyle?: TextStyle,
) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: screenHeight * 0.005,
      }}>
      <WText style={titleStyle}>{title}</WText>
      <WText style={{color: Colors.addPhotoButtonColor}}>{specifics}</WText>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: screenHeight * 0.05,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemStyle: {
    width: screenWidth * 0.85,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.03,
  },
  itemTitleStyle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: screenHeight * 0.01,
    fontFamily: Fonts.semiBold,
  },
});

export default TransactionSummary;