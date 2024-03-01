import React from 'react';

import ReactNativeFluentUiEmoji, {Emoji} from './src';
import {View, Text, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<any>(null);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <View
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                paddingTop: 150,
                paddingHorizontal: 50,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <ReactNativeFluentUiEmoji
                onSelect={emoji => setValue(emoji)}
                sectionListProps={{}}
                bottomSheetProps={{}}
                titleStyle={{}}
                numColumns={9}
                >
                <TouchableOpacity>
                  {value ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Emoji emoji={value} emojiSize={200} />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#FF699C',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 16,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#fff',
                        }}>
                        打开
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </ReactNativeFluentUiEmoji>
            </View>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
