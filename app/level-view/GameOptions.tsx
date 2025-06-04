import { View } from "react-native";
import Text from "../../reusable-components/Text";

export default function GameOptions() {
  const GameButton = ({ text }: { text: string }) => (
    <View className="m-2 p-2 border rounded border-banana-300 bg-banana-100 shadow-sm shadow-slate-300">
      <Text>{text}</Text>
    </View>
  )
  return (
    <View className="mt-6 flex-row">
      <GameButton text="Undo" />
      <GameButton text="Restart" />
    </View>
  )
}