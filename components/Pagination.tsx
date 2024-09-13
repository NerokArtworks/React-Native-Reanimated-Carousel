import { ImageSliderType } from "@/data/FeedData";
import { StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { Text, View } from "./Themed";

type Props = {
    items: ImageSliderType[];
    paginationIndex: number;
    scrollX: SharedValue<number>
}

const Pagination = ({
    items,
    paginationIndex,
    scrollX
}: Props) => {
    return (
        <View style={styles.container}>
            {items.map((_,index) => {
                return (
                    <View key={index} style={[styles.dot, {backgroundColor: paginationIndex === index ? '#222': '#aaa'}]} />
                )
            })}
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: '#aaa',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8
,    }
})