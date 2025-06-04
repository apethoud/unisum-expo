import { View } from "react-native"
import Text from "../../reusable-components/Text"

export default function TargetNumber({ number }: { number: number }) {
  return (
    <View className="relative my-6 h-24 w-24 rounded-full bg-kiwi-200 border border-kiwi-600">
      <View className="absolute inset-0 w-full h-full">
        <View className="flex-1 w-full h-full justify-center items-center pt-2">
          <Text enormous>{number}</Text>
        </View>
      </View>
    </View>
  )
}