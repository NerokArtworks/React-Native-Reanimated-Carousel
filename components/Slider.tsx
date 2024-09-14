import { Dimensions, StyleSheet, ViewToken } from "react-native";
import { View } from "./Themed"
import { ImageSliderType } from "@/data/FeedData";
import SliderItem from "./SliderItem";
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from "react-native-reanimated";
import Pagination from "./Pagination";
import { useEffect, useRef, useState } from "react";

interface SliderProps {
    itemList: ImageSliderType[]
}

const { width } = Dimensions.get('screen');

const Slider = ({
    itemList
}: SliderProps) => {
    const scrollX = useSharedValue(0);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [data, setData] = useState(itemList);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        }
    });

    useEffect(() => {
        if (isAutoPlay === true) {
            interval.current = setInterval(() => {
                offset.value = offset.value + width
            }, 5000)
        } else {
            clearInterval(interval.current);
        }

        return () => {
            clearInterval(interval.current);
        }
    }, [isAutoPlay, offset, width]);

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    });

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        try {
            if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
                setPaginationIndex(viewableItems[0].index % itemList.length);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged }
    ])

    return (
        <View>
            <Animated.FlatList
                ref={ref}
                data={data}
                renderItem={({ item, index }) => (
                    <SliderItem
                        item={item}
                        index={index}
                        scrollX={scrollX}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                removeClippedSubviews={false}
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                onEndReached={() => setData([...data, ...itemList])}
                onEndReachedThreshold={0.5}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                }}
                onScrollEndDrag={() => {
                    setIsAutoPlay(true);
                }}
            />
            <Pagination
                items={itemList}
                scrollX={scrollX}
                paginationIndex={paginationIndex}
            />
        </View>
    )
}

export default Slider;

const styles = StyleSheet.create({})