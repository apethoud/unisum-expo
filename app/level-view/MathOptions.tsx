import { Pressable, View } from "react-native";
import Text from "../../reusable-components/Text";

export default function MathOptions({ gameState, setGameState }) {
  const applyMathOperation = (optionId, operation) => {
    let tempGameState = { ...gameState }
    let isSomethingSelected = false

    for (let row of tempGameState.gridLayout) {
      for (let cell of row) {
        if (cell.selected) {
          if (cell.value !== null) {
            cell.value = cell.value + operation
          }
          isSomethingSelected = true
          cell.selected = false
        }
      }
    }

    // If nothing was selected, return before disabling the math option.
    if (!isSomethingSelected) {
      return setGameState(tempGameState)
    }

    for (let mathOption of tempGameState.mathOptions) {
      if (mathOption.id === optionId) {
        mathOption.available = false
      }
    }

    setGameState(tempGameState)
  }

  const Option = ({ id, value, isAvailable }: { id: number, value: number, isAvailable: boolean }) => (
    <Pressable
      onPress={() => isAvailable ? applyMathOperation(id, value) : null}>
      <View className={`m-2 py-1 px-2 rounded-lg flex justify-center items-center 
        ${isAvailable
          ? "bg-lavender-200 border border-lavender-400 shadow-sm shadow-slate-300"
          : "bg-white border border-slate-200"
        }`}>
        <Text large faded={!isAvailable}>{value > 0 ? `+${value}` : value}</Text>
      </View>
    </Pressable>
  )

  return (
    <View className="w-80 mt-6 p-2 border border-slate-200 flex-row flex-wrap justify-between">
      {gameState.mathOptions.map(option => (
        <Option key={option.id} id={option.id} value={option.value} isAvailable={option.available} />
      ))}
    </View>
  )
}