import { Pressable } from "react-native";
import Text from "./Text";

interface MenuCardPropTypes {
  title: string;
  subhead: string;
  color: string;
  onPress: () => void;
}

export default function MenuCard({ title, subhead, color, onPress }: MenuCardPropTypes) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full my-2 pt-4 px-4 pb-12 border rounded-xl shadow shadow-slate-300 
        ${color === "banana" ? "border-banana-900 bg-banana-200"
          : color === "kiwi" ? "border-kiwi-900 bg-kiwi-200"
          : color === "ocean" ? "border-ocean-900 bg-ocean-200"
          : color === "lavender" ? "border-lavender-900 bg-lavender-200"
          : color === "orchid" ? "border-orchid-900 bg-orchid-200"
          : color === "azalea" ? "border-azalea-900 bg-azalea-200"
          : "border-slate-900 bg-slate-200"
        }`}>
      <Text bold>{title}</Text>
      <Text small>{subhead}</Text>
    </Pressable>
  )
}