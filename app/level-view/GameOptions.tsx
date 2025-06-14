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
    const tempLevelStateHistory = [...levelStateHistory]
    const updatedLevelStateHistory = tempLevelStateHistory.slice(0, tempLevelStateHistory.length - numberOfMoves)
    setLevelStateHistory(updatedLevelStateHistory)

    const newLevelState = updatedLevelStateHistory[updatedLevelStateHistory.length - 1]
    setLevelGrid(newLevelState.levelGrid)
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