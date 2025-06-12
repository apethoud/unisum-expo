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
  const applyMathOperation = (option: IMathOption, mathOptions: IMathOption[]) => {
    let tempLevelGrid = [...levelGrid]
    for (const selectedCellIndex of selectedCellIndexes) {
      if (tempLevelGrid[selectedCellIndex].value) {
        tempLevelGrid[selectedCellIndex].value = tempLevelGrid[selectedCellIndex].value + option.value
      }
    }

    setLevelGrid(tempLevelGrid)
    deselectAllCells()
    disableUsedMathOption(option, mathOptions, setMathOptions)
  }

  const deselectAllCells = () => {
    setSelectedCellIndexes([])
  }

  const disableUsedMathOption = (option: IMathOption, mathOptions: IMathOption[], setMathOptions: Dispatch<SetStateAction<IMathOption[]>>) => {
    let tempMathOptions = [...mathOptions]
    tempMathOptions = tempMathOptions.map(opt => {
      if (opt.id === option.id) {
        opt.is_available = false
      }
      return opt
    })
    setMathOptions(tempMathOptions)
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