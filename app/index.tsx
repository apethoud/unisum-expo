import Text from "../reusable-components/Text";
import { View } from "react-native";
import TierList from "./TierList";

export default function Home() {
  return (
    <>
      <Text huge>Unisum</Text>
      <View className="w-full flex items-center mb-6">
        <Text small italic centered>{`a number puzzle game\nby Andrew Pethoud`}</Text>
      </View>
      <TierList />
    </>
  )
}