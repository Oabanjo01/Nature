import {Colors, Routes} from '@app/constants';
import {ScreenProps} from '@app/navigation/navigation';
import WText from '@app/utilities/customText';
import useCameraDevice from '@app/utilities/hooks/camera/useCamera';
import {showToast} from '@app/utilities/toast';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCameraPermission} from 'react-native-vision-camera';

const CameraPage = ({navigation}: ScreenProps) => {
  const {handlePermission, handlePhoneVersion} = useCameraDevice();
  return (
    <View
      style={{
        justifyContent: 'space-evenly',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {
        <TouchableOpacity
          onPress={() => handlePhoneVersion(navigation)}
          style={{
            borderWidth: 2,
            padding: 10,
            borderRadius: 20,
            borderColor: Colors.tabBarTextColor,
          }}>
          <Ionicons
            name={'camera-outline'}
            size={50}
            style={{
              alignSelf: 'center',
              marginBottom: 5,
            }}
            color={Colors.primary}
          />
          <WText style={{color: Colors.primaryTextColor}}>Camerapage</WText>
        </TouchableOpacity>
      }
      <TouchableOpacity
        onPress={() => {}}
        style={{
          borderWidth: 2,
          padding: 10,
          borderRadius: 20,
          borderColor: Colors.tabBarTextColor,
        }}>
        <Ionicons
          name={'image-outline'}
          size={50}
          style={{
            alignSelf: 'center',
            marginBottom: 5,
          }}
          onPress={() => {}}
          color={Colors.primary}
        />
        <WText style={{color: Colors.primaryTextColor}}>Access Files</WText>
      </TouchableOpacity>
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({});
