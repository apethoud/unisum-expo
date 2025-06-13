import { useEffect, useState } from "react";
import { View } from "react-native";
import Text from "../../reusable-components/Text";
import TargetNumber from "./TargetNumber";
import GameGrid from "./GameGrid";
import MathOptions from "./MathOptions";
import GameOptions from "./GameOptions";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../supabaseClient";
import { IGridCell, ILevelDTO, IMathOption } from "../../models/ILevelDTO";
import { ILevelState } from "../../models/ILevelState";

const createDefaultLevelGrid = () => {
  let levelGrid = []
  for (let i = 0; i < 25; i++) {
    levelGrid.push({
      grid_index: i,
      is_selected: false,
      value: null
    })
  }
  return levelGrid
}

export default function LevelView() {
  const [loading, setLoading] = useState(true)
  const [targetNumber, setTargetNumber] = useState<number | null>(null)
  const [levelGrid, setLevelGrid] = useState<IGridCell[]>(createDefaultLevelGrid)
  const [selectedCellIndexes, setSelectedCellIndexes] = useState<number[]>([])
  const [mathOptions, setMathOptions] = useState<IMathOption[]>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [levelStateHistory, setLevelStateHistory] = useState<ILevelState[]>([]);

  const { levelNumber } = useLocalSearchParams()

  const setupLevel = () => {
    async function getLevel() {
      let { data, error } = await supabase
        .from('levels')
        .select(`
          *,
          grid_cells (
            level_id,
            id,
            grid_index,
            value
          ),
          math_options (
            level_id,
            id,
            value,
            is_available
          )
        `)
        .eq('level_number', levelNumber)
      
      if (!data || error) {
        console.log("Error: ", error)
        return;
      }

      const levelData: ILevelDTO = data[0]

      const grid = configureGameGrid(levelData.grid_cells)
      setLevelGrid(grid)
      setTargetNumber(levelData.target_number)
      setMathOptions(levelData.math_options)
      // Set initial level state history event
      setLevelStateHistory([{ levelGrid: [...grid], mathOptions: [...levelData.math_options] }])
      setLoading(false)
      console.log("initial levelStateHistory is: ", [{ levelGrid: [...grid], mathOptions: [...levelData.math_options] }][0].levelGrid[8])
    }
    getLevel()
  }

  useEffect(setupLevel, [])

  const configureGameGrid = (gridCells: IGridCell[]) => {
    const tempGrid = [...levelGrid];

    for (const cell of gridCells) {
      tempGrid[cell.grid_index].value = cell.value
    }

    return tempGrid
  }

  useEffect(() => {
    const validateGameBoard = (levelGrid: IGridCell[]) => {
      let isValid = true;
      for (const cell of levelGrid) {
        if (cell.value && cell.value !== targetNumber) {
          isValid = false;
          break;
        }
      }
      setIsGameWon(isValid);
    }
    validateGameBoard(levelGrid)
  }, [levelGrid])

  return (
    <View className="flex-1 justify-center items-center">
      {!loading ? (
        <View>
          {isGameWon ? (
            <View>
              <Text huge>Great job! 🎉</Text>
            </View>
          ) : (
              <View className="items-center">
                {targetNumber && (
                  <TargetNumber number={targetNumber} />
                )}
                <GameGrid
                  levelGrid={levelGrid}
                  selectedCellIndexes={selectedCellIndexes}
                  setSelectedCellIndexes={setSelectedCellIndexes}
                />
                <MathOptions
                  mathOptions={mathOptions}
                  setMathOptions={setMathOptions}
                  levelGrid={levelGrid}
                  setLevelGrid={setLevelGrid}
                  selectedCellIndexes={selectedCellIndexes}
                  setSelectedCellIndexes={setSelectedCellIndexes}
                  levelStateHistory={levelStateHistory}
                  setLevelStateHistory={setLevelStateHistory}
                />
                <GameOptions
                  levelGrid={levelGrid}
                  setLevelGrid={setLevelGrid}
                  mathOptions={mathOptions}
                  setMathOptions={setMathOptions}
                  levelStateHistory={levelStateHistory}
                  setLevelStateHistory={setLevelStateHistory}
                />
              </View>
          )}
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  )
}