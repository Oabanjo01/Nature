import {Colors} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {FontSize, Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import {PlantDiseaseType} from '@app/redux/types';
import WText from '@app/utilities/customText';
import BackButton from '@assets/images/BackButton.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'plantDiseaseDetail'>;

const PlantDiseaseDetail = ({route, navigation}: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [showSolutions, setShowSolutions] = useState<boolean>(true);
  const [isFavourited, setIsFavourited] = useState<boolean>(true);
  const item = route.params?.item;

  const {
    description,
    family,
    host,
    images,
    solution,
    common_name,
    other_name,
    scientific_name,
  } = item as PlantDiseaseType;

  const {original_url, regular_url} = images[0];

  const goBack = () => {
    navigation.goBack();
  };
  console.log(
    item,
    item?.description.map(item => {
      console.log(item.description);
    }),
  );
  const renderStarIcons = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <Ionicons
            key={i}
            name={'star'}
            size={16}
            color={Colors.ratingIconColor}
            onPress={() => {}}
          />,
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name={'star-outline'}
            size={16}
            color={Colors.ratingIconColor}
            onPress={() => {}}
          />,
        );
      }
    }
    return stars;
  };

  const combinedDescription = description
    .map(item => `${item.subtitle}\n\n${item.description}`)
    .join('\n\n');

  const combinedSolution = solution.map(item => {
    const joinedDescription = item.description.replace(/\n/g, '');
    return (
      <>
        <WText style={{fontFamily: Fonts.italic, fontSize: 15}}>
          {item.subtitle.trimStart()}
        </WText>
        {`\n`}
        <WText>{joinedDescription.trim()}</WText>
        {`\n\n`}
      </>
    );
  });

  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: (screenWidth * 0.15) / 2}}>
        <View>
          <FastImage
            source={{
              uri: regular_url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
            style={{
              height: screenHeight * 0.4,
            }}
          />
          <View style={styles.favouriteButton}>
            <Ionicons
              name={isFavourited ? 'heart' : 'heart-outline'}
              size={28}
              color={Colors.whiteColor}
              onPress={() => {
                setIsFavourited(!isFavourited);
              }}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: screenHeight * 0.025,
            left: screenWidth * 0.05,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <BackButton />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          marginBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {family && <WText style={styles.tagTextStyle}>{family}</WText>}
          <WText style={styles.tagTextStyle}>{common_name}</WText>
        </View>
        <WText style={{fontSize: 25, fontFamily: Fonts.semiBold}}>
          {common_name}
        </WText>
        <View style={{flexDirection: 'row'}}>
          {renderStarIcons(4)}
          <WText
            style={{
              fontSize: FontSize.normalText,
              paddingLeft: 4,
              fontFamily: Fonts.semiBold,
            }}>
            4.1
          </WText>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{marginRight: 20}}>
            <WText style={{marginBottom: 10, fontFamily: Fonts.semiBold}}>
              KINGDOM
            </WText>
            <WText>Plantae</WText>
          </View>
          <View>
            <WText style={{marginBottom: 10, fontFamily: Fonts.semiBold}}>
              FAMILY
            </WText>
            <WText>Cactacae</WText>
          </View>
        </View>
        {description.length > 0 && (
          <>
            <SubTopics
              topic="DESCRIPTION"
              showNote={showDescription}
              toggleShowNote={() => {
                setShowDescription(!showDescription);
              }}
            />
            <Divider horizontalInset style={{marginBottom: 10}} bold />
            {showDescription && <WText>{combinedDescription}</WText>}
          </>
        )}
        {solution.length > 0 && (
          <>
            <SubTopics
              topic="SOLUTIONS"
              showNote={showSolutions}
              toggleShowNote={() => {
                setShowSolutions(!showSolutions);
              }}
            />
            <Divider horizontalInset style={{marginBottom: 10}} bold />
            {showSolutions && (
              <WText
                style={{
                  textAlign: 'center',
                  marginBottom: screenHeight * 0.03,
                }}>
                {combinedSolution}
              </WText>
            )}
          </>
        )}
      </ScrollView>
      <View
        style={{
          bottom: 20,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            width: screenWidth * 0.12,
            height: screenWidth * 0.12,
            borderRadius: (screenWidth * 0.12) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            opacity: 0.9,
          }}>
          <Ionicons
            name="bookmark-outline"
            size={20}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 20,
            height: screenHeight * 0.05,
            width: screenWidth * 0.5,
            alignSelf: 'center',
            justifyContent: 'center',
            opacity: 0.9,
          }}>
          <WText
            style={{
              color: Colors.lightTextColor,
              fontFamily: Fonts.semiBold,
              fontSize: 16,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Buy This Picture
          </WText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            width: screenWidth * 0.12,
            height: screenWidth * 0.12,
            borderRadius: (screenWidth * 0.12) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            opacity: 0.9,
          }}>
          <Ionicons name="cart-outline" size={20} color={Colors.whiteColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SubTopics = ({
  showNote,
  toggleShowNote,
  topic,
}: {
  topic: string;
  showNote: boolean;
  toggleShowNote: (showNote: boolean) => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        marginHorizontal: screenWidth * 0.015,
        alignItems: 'center',
      }}>
      <WText
        style={{
          marginTop: 10,
          marginBottom: 5,
          fontFamily: Fonts.semiBold,
        }}>
        {topic}
      </WText>
      <Ionicons
        name={showNote ? 'chevron-down-outline' : 'chevron-forward-outline'}
        size={18}
        onPress={() => {
          toggleShowNote(!showNote);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tagTextStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 5,
    opacity: 0.5,
    borderRadius: 5,
    backgroundColor: Colors.addPhotoButtonColor,
    color: Colors.addPhotoButtonColor,
    fontFamily: 'OpenSans-SemiBold',
  },
  favouriteButton: {
    position: 'absolute',
    backgroundColor: Colors.favouriteButtonColor,
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: (screenWidth * 0.15) / 2,
    bottom: -((screenWidth * 0.15) / 2),
    right: screenWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlantDiseaseDetail;