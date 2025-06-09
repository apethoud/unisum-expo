import { Pressable, View } from "react-native";
import Text from "../../reusable-components/Text";
import { IGridCell, IMathOption } from "../../models/ILevelDTO";
import { Dispatch, SetStateAction } from "react";

export default function MathOptions({
  mathOptions,
  setMathOptions,
  levelGrid,
  setLevelGrid,
  selectedCellIndexes,
  setSelectedCellIndexes
}: {
    mathOptions: IMathOption[],
    setMathOptions: Dispatch<SetStateAction<IMathOption[]>>,
    levelGrid: IGridCell[],
    setLevelGrid: Dispatch<SetStateAction<IGridCell[]>>
    selectedCellIndexes: number[],
    setSelectedCellIndexes: Dispatch<SetStateAction<number[]>>
}) {
  console.log("mathOptions: ", mathOptions)
  const applyMathOperation = (option: IMathOption, mathOptions: IMathOption[]) => {
    if (!selectedCellIndexes.length) {
      return;
    }

    let tempLevelGrid = [...levelGrid]

    for (const selectedCellIndex of selectedCellIndexes) {
      if (tempLevelGrid[selectedCellIndex].value) {
        tempLevelGrid[selectedCellIndex].value = tempLevelGrid[selectedCellIndex].value + option.value
      }
    }

    // update level grid
    setLevelGrid(tempLevelGrid)
    // de-select all cells
    setSelectedCellIndexes([])
    // disable used math option
    let tempMathOptions = [...mathOptions]
    tempMathOptions = tempMathOptions.map(opt => {
      if (opt.id === option.id) {
        opt.is_available = false
      }
      return opt
    })


    // let tempGameState = { ...gameState }
    // let isSomethingSelected = false

    // for (let row of tempGameState.gridLayout) {
    //   for (let cell of row) {
    //     if (cell.selected) {
    //       if (cell.value !== null) {
    //         cell.value = cell.value + operation
    //       }
    //       isSomethingSelected = true
    //       cell.selected = false
    //     }
    //   }
    // }

    // // If nothing was selected, return before disabling the math option.
    // if (!isSomethingSelected) {
    //   return setGameState(tempGameState)
    // }

    // for (let mathOption of tempGameState.mathOptions) {
    //   if (mathOption.id === optionId) {
    //     mathOption.available = false
    //   }
    // }

    // setGameState(tempGameState)
  }

  const Option = ({ option }: { option: IMathOption }) => (
    <Pressable
      onPress={() => option.is_available ? applyMathOperation(option, mathOptions) : null}>
      <View className={`m-2 py-1 px-2 rounded-lg flex justify-center items-center 
        ${option.is_available
          ? "bg-lavender-200 border border-lavender-400 shadow-sm shadow-slate-300"
          : "bg-white border border-slate-200"
        }`}>
        <Text large faded={!option.is_available}>{option.value > 0 && "+"}{option.value}</Text>
      </View>
    </Pressable>
  )

  return (
    <View className="w-80 mt-6 p-2 border border-slate-200 flex-row flex-wrap justify-between">
      {mathOptions.map(option => (
        <Option key={option.id} option={option} />
      ))}
    </View>
  )
}