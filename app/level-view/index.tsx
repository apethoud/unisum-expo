import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import Text from "../../reusable-components/Text";
import TargetNumber from "./TargetNumber";
import GameGrid from "./GameGrid";
import MathOptions from "./MathOptions";
import GameOptions from "./GameOptions";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../supabaseClient";
import { IGridCell, ILevelDTO, IMathOption } from "../../models/ILevelDTO";

const createDefaultLevelGrid = () => {
  let levelGrid = []
  for (let i = 0; i < 25; i++) {
    levelGrid.push({
      grid_index: i,
      is_selected: false,
      value: null
    })
  }
  console.log("default levelGrid: ", levelGrid);
  return levelGrid
}

export default function LevelView() {
  const [loading, setLoading] = useState(true)
  // const [levelConfigData, setLevelConfigData] = useState<ILevelDTO | null>(null)
  const [levelGrid, setLevelGrid] = useState<IGridCell[]>(createDefaultLevelGrid)
  const [selectedCellIndexes, setSelectedCellIndexes] = useState<number[]>([])
  const [mathOptions, setMathOptions] = useState<IMathOption[]>([])
  const [gameState, setGameState] = useState(null)
  const [isGameWon, setIsGameWon] = useState(false)

  const { levelNumber } = useLocalSearchParams()

  console.log("selectedCellIndexes: ", selectedCellIndexes)

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
      // console.log("levelData: ", levelData);
      // setLevelConfigData(levelData)
      configureGameGrid(levelData.grid_cells)
      setMathOptions(levelData.math_options)

      // data[0].grid_cells = createGameGrid(data[0].grid_cells)
      // setGameState(data[0])
    }
    getLevel()
  }

  useEffect(setupLevel, [])

  const configureGameGrid = (gridCells: IGridCell[]) => {
    console.log("gridCells: ", gridCells);
    console.log("levelGrid: ", levelGrid);

    const tempGrid = [...levelGrid];

    for (const cell of gridCells) {
      tempGrid[cell.grid_index].value = cell.value
    }

    setLevelGrid(tempGrid);
    setLoading(false);
  }

  // useEffect(() => {
  //   function validateGameBoard() {
  //     for (let row of gameState.gridLayout) {
  //       for (let cell of row) {
  //         if (cell.value !== null && cell.value !== gameState.targetNumber) {
  //           return
  //         }
  //       }
  //     }
  //     return setTimeout(() => setIsGameWon(true), 1000)
  //   }
  //   validateGameBoard()
  // }, [gameState])

  // const createGameGrid = populatedGridCells => {
  //   let gameGrid = generateEmptyGameGrid()

  //   for (let cell of populatedGridCells) {
  //     console.log("cell: ", cell);
  //     console.log(`Row ${Math.ceil(cell.grid_index / 5)}, Cell ${cell.grid_index % 5}`)
  //     // START HERE: I've created an empty game grid. Now I need to iterate through the 
  //     // populated grid cells from the db and add that data in the proper place within the
  //     // empty game grid...
  //     // WHERE I AM NOW: How can I change the way the data is stored so that I have to do
  //     // the least compute logic as possible on the frontend?
  //     //
  //     // gridIndex | gridIndex % 5
  //     // 0 | 0
  //     // 1 | 1
  //     // 2 | 2
  //     // 3 | 3
  //     // 4 | 4
  //     //
  //     // 5 | 0
  //     // 6 | 1
  //     // 7 | 2
  //     // 8 | 3
  //     // 9 | 4
  //   }
  //   return gameGrid
  // }

  // const generateEmptyGameGrid = () => {
  //   let gameGrid = []

  //   for (let i = 0; i < 5; i++) {
  //     gameGrid.push([])
  //     for (let j = 0; j < 5; j++) {
  //       gameGrid[i].push({
  //         is_selected: false,
  //         value: null
  //       })
  //     }
  //   }

  //   return gameGrid
  // }

  const figureThingsOut = () => {
    // Keep the gridCells array flat, just 25 objects.
    //
    // When selecting a row or applying a math operation, compute which cells to modify
    // and then do so with:
    //
    // const selectedCellIndexes = [1, 6, 11, 16, 21]
    // for (const cellIndex of selectedCellIndexes) {
    //   gridCells[cellIndex].selected = true
    // }
    //
    // or
    //
    // const mathOption = { value: -3, ... }
    // const selectedCellIndexes = [1, 6, 11, 16, 21]
    // for (const cellIndex of selectedCellIndexes) {
    //   if (gridCells[cellIndex].value) {
    //     gridCells[cellIndex].value = gridCells[cellIndex].value + mathOption.value
    //   }
    // }
    //
    // You could even go a step further and pre-define all possible rows and columns
    // as constants since there's no need to calculate these constant values:
    //
    // const rows = [
    //   [1, 2, 3, 4, 5],
    //   [6, 7, 8, 9, 10],
    //   [11, 12, 13, 14, 15],
    //   [16, 17, 18, 19, 20],
    //   [21, 22, 23, 24, 25]
    // ]
    //
    // const columns = [
    //   [1, 6, 11, 16, 21],
    //   [2, 7, 12, 17, 22],
    //   [3, 8, 13, 18, 23],
    //   [4, 9, 14, 19, 24],
    //   [5, 10, 15, 20, 25]
    // ]
    //
    // Then you can access a specific row or column by index, like rows[2] or columns[4]

    return true
  }

  return (
    <View className="flex-1 justify-center items-center">
      {!loading ? (
        <View>
          {/* <Button title="log gameState" onPress={() => console.log("gameState: ", gameState)}></Button> */}
          {isGameWon ? (
            <View>
              <Text huge>Great job! 🎉</Text>
            </View>
          ) : (
              <View className="items-center">
                {/* <Text centered>{`Unisum\n${gameState.pack} ##${gameState.level_number}`}</Text>
                <TargetNumber number={gameState.target_number} /> */}
                <GameGrid
                  levelGrid={levelGrid}
                  setLevelGrid={setLevelGrid}
                  selectedCellIndexes={selectedCellIndexes}
                  setSelectedCellIndexes={setSelectedCellIndexes}
                />
                <MathOptions
                  mathOptions={mathOptions}
                  setMathOptions={setMathOptions}
                  levelGrid={levelGrid}
                  setLevelGrid={setLevelGrid}
                />
                {/* <GameOptions /> */}
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