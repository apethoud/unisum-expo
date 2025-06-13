import { Pressable, View } from "react-native";
import Text from "../../reusable-components/Text";
import { IGridCell, IMathOption } from "../../models/ILevelDTO";
import { Dispatch, SetStateAction } from "react";
import { ILevelState } from "../../models/ILevelState";

export default function GameOptions({
  levelGrid,
  setLevelGrid,
  mathOptions,
  setMathOptions,
  levelStateHistory,
  setLevelStateHistory,
}: {
  levelGrid: IGridCell[],
  setLevelGrid: Dispatch<SetStateAction<IGridCell[]>>,
  mathOptions: IMathOption[],
  setMathOptions: Dispatch<SetStateAction<IMathOption[]>>,
  levelStateHistory: ILevelState[],
  setLevelStateHistory: Dispatch<SetStateAction<ILevelState[]>>,
  }) {
  const undoPlayerMove = () => {
    console.log("undoPlayerMove")
    // remove the last level state from history
    const tempLevelStateHistory = [...levelStateHistory]
    tempLevelStateHistory.pop()
    console.log("tempLevelStateHistory AFTER: ", tempLevelStateHistory)
    // save the updated history
    setLevelStateHistory(tempLevelStateHistory)
    // update the current level grid with the new last level state
    const newLevelState = tempLevelStateHistory[tempLevelStateHistory.length - 1]
    console.log("newLevelState: ", newLevelState)
    setLevelGrid(newLevelState.levelGrid)
    // update the current math options with the new last level state
    setMathOptions(newLevelState.mathOptions)
  }
  
  const GameButton = ({ text }: { text: string }) => (
    <Pressable
      onPress={() => undoPlayerMove()}
      disabled={levelStateHistory.length < 2}
    >
      <View className="m-2 p-2 border rounded border-banana-300 bg-banana-100 shadow-sm shadow-slate-300">
        <Text>{text}</Text>
      </View>
    </Pressable>
  )

  return (
    <View className="mt-6 flex-row">
      <GameButton text="Undo" />
      <GameButton text="Restart" />
    </View>
  )
}