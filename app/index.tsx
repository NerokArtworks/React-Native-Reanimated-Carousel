import Slider from "@/components/Slider";
import { View } from "@/components/Themed"
import { FeedSlider } from "@/data/FeedData";
import { StyleSheet } from "react-native";

const Page = () => {
    return (
        <View style={styles.container}>
            <Slider itemList={FeedSlider} />
        </View>
    )
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})