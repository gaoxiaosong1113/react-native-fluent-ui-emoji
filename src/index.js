import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import emojiData from './assets/emoji/data';
import {getEmoji} from './utils/utils';

const ReactNativeFluentUiEmoji = React.memo(props => {
  const {children, numColumns = 9, onSelect, value} = props;

  const {width, height} = useWindowDimensions();

  const [innerValue, setInnerValue] = useState(value);

  const insets = useSafeAreaInsets();

  const emojiSize = useMemo(() => {
    return (width - 22) / numColumns;
  }, [width, numColumns]);

  const handleSheetChanges = (index, props) => {};

  const handleSelect = emoji => {
    onSelect?.(emoji);
    setInnerValue(emoji);
    stickersSheetRef.current?.close();
  };

  const minSnapPoints = useMemo(
    () => [300, 600, height - insets.top],
    [height, insets.top],
  );

  const SelectEmoji = useMemo(() => {
    if (innerValue) {
      return (
        <Image
          source={getEmoji(innerValue.filename)}
          style={{width: emojiSize * 0.7, height: emojiSize * 0.7}}
        />
      );
    }
    return null;
  }, [innerValue, emojiSize]);

  const stickersSheetRef = useRef();

  const renderItem = ({section, index}) => {
    if (index % numColumns !== 0) return null;
    const items = [];
    for (let i = index; i < index + numColumns; i++) {
      if (i >= section.data.length) {
        break;
      }
      items.push(
        <EmojiSvg
          key={section.data[i].name}
          emoji={section.data[i]}
          emojiSize={emojiSize}
          onSelect={handleSelect}
        />,
      );
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        {items}
      </View>
    );
  };

  return (
    <>
      {React.cloneElement(children, {
        value: SelectEmoji,
        onPress: () => stickersSheetRef.current?.present(),
      })}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        pointerEvents="none">
        <View
          style={{
            flex: 1,
          }}>
          <BottomSheetModal
            ref={stickersSheetRef}
            snapPoints={minSnapPoints}
            onChange={handleSheetChanges}>
            <SafeAreaView>
              <SectionList
                contentContainerStyle={{
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                sections={emojiData}
                renderSectionHeader={({section: {title}}) => (
                  <View
                    style={{
                      width: '100%',
                      paddingBottom: 10,
                      paddingLeft: width * 0.005,
                      backgroundColor: '#fff',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                      }}>
                      {title}
                    </Text>
                  </View>
                )}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.title || item.name}
              />
            </SafeAreaView>
          </BottomSheetModal>
        </View>
      </View>
    </>
  );
});

export const EmojiSvg = React.memo(({emoji, emojiSize, onSelect}) => {
  return (
    <View
      style={{
        width: emojiSize,
        height: emojiSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          onSelect?.(emoji);
        }}>
        <Emoji emoji={emoji} emojiSize={emojiSize} />
      </TouchableOpacity>
    </View>
  );
});

export const Emoji = React.memo(({style, emoji, emojiSize = 20}) => {
  return (
    <Image
      source={getEmoji(emoji.filename)}
      style={{width: emojiSize * 0.7, height: emojiSize * 0.7, ...style}}
    />
  );
});

export default ReactNativeFluentUiEmoji;
