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
  const undoPlayerMoves = (numberOfMoves: number) => {
    console.log("undoPlayerMove")
    // remove the last level state from history
    const tempLevelStateHistory = [...levelStateHistory]
    console.log("tempLevelStateHistory.length is: ", tempLevelStateHistory.length)
    // tempLevelStateHistory.pop()
    const updatedLevelStateHistory = tempLevelStateHistory.slice(0, tempLevelStateHistory.length - numberOfMoves)
    console.log("updatedLevelStateHistory.length is: ", updatedLevelStateHistory.length)
    // save the updated history
    setLevelStateHistory(updatedLevelStateHistory)
    // update the current level grid with the new last level state
    const newLevelState = updatedLevelStateHistory[updatedLevelStateHistory.length - 1]
    console.log("newLevelState: ", newLevelState)
    setLevelGrid(newLevelState.levelGrid)
    // update the current math options with the new last level state
    setMathOptions(newLevelState.mathOptions)
  }

  const handleUndoPress = () => {
    undoPlayerMoves(1)
  }

  const handleRestartPress = () => {
    undoPlayerMoves(levelStateHistory.length - 1)
  }
  
  const GameButton = ({ text, onPress }: { text: string, onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      disabled={levelStateHistory.length < 2}
    >
      <View className="m-2 p-2 border rounded border-banana-300 bg-banana-100 shadow-sm shadow-slate-300">
        <Text>{text}</Text>
      </View>
    </Pressable>
  )

  return (
    <View className="mt-6 flex-row">
      <GameButton text="Undo" onPress={() => handleUndoPress()} />
      <GameButton text="Restart" onPress={() => handleRestartPress()} />
    </View>
  )
}