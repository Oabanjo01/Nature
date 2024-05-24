import RenderPlantPictures, {
  SeparatorComponent,
} from '@app/components/homepagecomponents/photography';
import {
  RenderSubTopics,
  SubTopics,
} from '@app/components/homepagecomponents/plantcategories';
import {RenderDiseasePicture} from '@app/components/homepagecomponents/plantdiseases';
import {Routes} from '@app/constants';
import {getThemeColor} from '@app/constants/colors';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {ScreenProps} from '@app/navigation/navigation';
import {logoutAction} from '@app/redux/actions/actions';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import {useFetchData} from '@app/utilities/hooks/apiData/useFetchData';
import LoadingIndicator from '@app/utilities/loadingIndicator';
import {showToast} from '@app/utilities/toast';
import Dashboard from '@assets/images/Dashboard.svg';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

const HomePage = ({navigation}: ScreenProps) => {
  const {
    plantList,
    plantDisease,
    isLoading,
    displayName,
    fetchdata,
    refreshing,
    setRefreshing,
  } = useFetchData();
  const dispatch = useDispatch();

  const onRefresh = () => {
    fetchdata(true);
  };

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  return (
    <>
      {isLoading || !displayName ? (
        <LoadingIndicator size={40} />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.screenColor,
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.primary]}
              />
            }
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="never">
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              locations={[0.1, 1]}
              colors={[Colors.gradientColor, '#29D890']}
              style={{
                paddingTop: screenHeight * 0.025,
                opacity: 1,
                height: dashboardHeight,
                width: screenWidth,
              }}>
              <View>
                <View
                  style={{
                    marginTop: dashboardHeight * 0.3,
                    marginLeft: screenWidth * 0.06,
                  }}>
                  <WText
                    style={{
                      fontFamily: Fonts.semiBold,
                      color: Colors.secondaryTextColor,
                      fontSize: 28,
                    }}>
                    Hello {displayName ?? ''},
                  </WText>
                  <WText
                    style={{
                      marginTop: 5,
                      color: Colors.secondaryTextColor,
                      fontSize: 17,
                    }}>
                    Let’s Learn More About Plants
                  </WText>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    auth()
                      .signOut()
                      .then(() => {
                        navigation.replace(Routes.Login);
                        showToast({
                          type: 'success',
                          text1: 'Logged out',
                          text2: 'You have been logged out',
                        });
                        dispatch(logoutAction());
                      })
                      .catch((error: string) => {
                        showToast({
                          type: 'error',
                          text1: 'Could not log out',
                          text2: 'An error occurred while logging out',
                        });
                      });
                  }}
                  style={{
                    alignItems: 'center',
                    position: 'absolute',
                    top: dashboardHeight * 0.3,
                    right: 20,
                  }}>
                  <Ionicons
                    name="log-out"
                    color={Colors.secondaryTextColor}
                    size={40}
                  />
                  <WText style={{color: Colors.secondaryTextColor}}>
                    Logout
                  </WText>
                </TouchableOpacity>
              </View>

              <View style={{position: 'absolute', right: 0}}>
                <Dashboard />
              </View>

              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  left: screenWidth * 0.05,
                  right: screenWidth * 0.05,
                  bottom: -dashboardHeight * 0.1,
                  flexDirection: 'row',
                  backgroundColor: Colors.whiteColor,
                  alignItems: 'center',
                  borderRadius: 40,
                  paddingHorizontal: screenWidth * 0.03,
                  ...Platform.select({
                    ios: {
                      shadowColor: 'rgba(0, 0, 0, 0.1)',
                      shadowOffset: {width: 1, height: 2},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                    },
                    android: {
                      elevation: 7,
                    },
                  }),
                }}>
                <Ionicons
                  size={26}
                  style={{marginLeft: 10}}
                  color={Colors.primary}
                  name={'search-outline'}
                />
                <TextInput
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  selectionColor={Colors.primary}
                  cursorColor={Colors.primary}
                  maxLength={24}
                  style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    borderColor: 'transparent',
                  }}
                />
              </View>
            </LinearGradient>

            <View
              style={{
                marginTop: screenHeight * 0.06,
                width: screenWidth,
                height: screenWidth * 0.24,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <FlatList
                // onRefresh={}
                data={SubTopics}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return (
                    <RenderSubTopics
                      index={index}
                      item={item}
                      navigation={navigation}
                    />
                  );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={SeparatorComponent}
              />
            </View>
            <View
              style={{
                marginHorizontal: screenWidth * 0.05,
                marginTop: screenHeight * 0.01,
              }}>
              <WText
                style={{
                  fontSize: 17,
                  marginBottom: screenHeight * 0.01,
                  color: Colors.primaryTextColor,
                }}>
                Photography
              </WText>
              <View
                style={{
                  alignItems: plantList?.length === 0 ? 'center' : 'flex-start',
                  borderRadius: 5,
                }}>
                <FlatList
                  data={plantList}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => {
                    return (
                      <RenderPlantPictures
                        item={item}
                        navigation={navigation}
                      />
                    );
                  }}
                  horizontal
                  ListEmptyComponent={
                    <View
                      style={{
                        height: screenHeight * 0.3,
                        aspectRatio: 3 / 2,
                        justifyContent: 'center',
                      }}>
                      <WText
                        style={{
                          textAlign: 'center',
                          fontFamily: Fonts.italic,
                          color: Colors.addPhotoButtonColor,
                        }}>
                        Not able to fetch plant images at this time, come back
                        some other time.
                      </WText>
                    </View>
                  }
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={SeparatorComponent}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: screenWidth * 0.05,
                marginVertical: screenHeight * 0.01,
              }}>
              <WText
                style={{
                  fontSize: 17,
                  marginBottom: screenHeight * 0.01,
                  color: Colors.primaryTextColor,
                }}>
                Plant Diseases
              </WText>
              <View
                style={{
                  alignItems:
                    plantDisease?.length === 0 ? 'center' : 'flex-start',
                  borderRadius: 5,
                }}>
                <FlatList
                  data={plantDisease}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => {
                    return (
                      <RenderDiseasePicture
                        plantDisease={item}
                        navigation={navigation}
                      />
                    );
                  }}
                  horizontal
                  ListEmptyComponent={
                    <View
                      style={{
                        height: screenHeight * 0.3,
                        aspectRatio: 3 / 2,
                        justifyContent: 'center',
                      }}>
                      <WText
                        style={{
                          textAlign: 'center',
                          fontFamily: Fonts.italic,
                          color: Colors.addPhotoButtonColor,
                        }}>
                        Not able to fetch plant diseases at this time, come back
                        some other time.
                      </WText>
                    </View>
                  }
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={SeparatorComponent}
                />
              </View>
              <WText
                style={{
                  fontSize: 14,
                  alignItems: 'center',
                  textAlign: 'center',
                  flex: 1,
                  color: Colors.primary,
                  marginTop: screenHeight * 0.03,
                  marginBottom: screenHeight * 0.05,
                }}>
                About Developer
              </WText>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'relative',
    margin: 16,
    marginTop: 40,
    right: 0,
    bottom: 0,
  },
});

export default HomePage;
