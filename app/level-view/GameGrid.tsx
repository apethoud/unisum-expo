import { Pressable, View } from "react-native";
import Text from "../../reusable-components/Text";
import ChevronRight from "../../assets/icons/ChevronRight";
import ChevronUp from "../../assets/icons/ChevronUp";
import { IGridCell } from "../../models/ILevelDTO";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Dimension = "row" | "column";

const rows = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24]
]

const columns = [
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24]
]

export default function GameGrid({
  levelGrid,
  setLevelGrid,
  selectedCellIndexes,
  setSelectedCellIndexes
}: {
  levelGrid: IGridCell[],
  setLevelGrid: Dispatch<SetStateAction<IGridCell[]>>
  selectedCellIndexes: number[],
  setSelectedCellIndexes: Dispatch<SetStateAction<number[]>>
}) {
  const [gridRows, setGridRows] = useState<IGridCell[][] | null>(null)

  const updateGrid = (levelGrid: IGridCell[]) => {
    const tempGridRows: IGridCell[][] = [];
    for (const cell of levelGrid) {
      const rowIndexForGivenCellValue = Math.floor(cell.grid_index / 5)
      if (!tempGridRows[rowIndexForGivenCellValue]) {
        tempGridRows.push([])
      }
      tempGridRows[rowIndexForGivenCellValue].push(cell)
    }
    setGridRows(tempGridRows);
  }

  useEffect(() => updateGrid(levelGrid), [levelGrid])

  const selectCells = (dimension: Dimension, index: number) => {
    setSelectedCellIndexes(dimension === "row" ? rows[index] : columns[index])

    // let tempLevelGrid = [...levelGrid];

    // // First, clear all selected cells.
    // for (let cell of tempLevelGrid) {
    //   cell.is_selected = false
    // }

    // if (dimension === "row") {
    //   for (const gridCellIndex of rows[index]) {
    //     tempLevelGrid[gridCellIndex].is_selected = true;
    //   }
    // } else if (dimension === "column") {
    //   for (const gridCellIndex of columns[index]) {
    //     tempLevelGrid[gridCellIndex].is_selected = true;
    //   }
    // } else {
    //   console.log("Error selecting grid cells")
    // }

    // setLevelGrid(tempLevelGrid)
  }

  const Cell = ({ value, isSelected }: { value: number | null, isSelected: boolean }) => (
    <View className={`w-12 h-12 flex justify-center items-center border 
      ${isSelected
        ? "bg-lavender-200 border-lavender-500"
        // : value === gameState.targetNumber ? "bg-kiwi-200 border-kiwi-600"
        : "bg-white border-slate-300"
      }`}>
      <Text large>{value}</Text>
    </View>
  )

  const Grid = () => (
    <View className="border border-slate-300">
      {gridRows && gridRows.map((row, rowIndex) => (
        <View className="flex-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} value={cell.value} isSelected={selectedCellIndexes.includes(cell.grid_index)} />
          ))}
        </View>
      ))}
    </View>
  )

  const GridButton = ({ dimension, index }: { dimension: Dimension, index: number }) => (
    <Pressable
      onPress={() => selectCells(dimension, index)}>
      <View className="w-12 h-12 flex justify-center items-center p-1">
        <View className="w-full h-full bg-white border rounded-lg border-slate-400 flex justify-center items-center shadow-sm shadow-slate-300">
          {dimension === "row" ? (
            <ChevronRight />
          ) : (
            <ChevronUp />
          ) }
        </View>
      </View>
    </Pressable>
  )

  const GridRowButtons = () => (
    <View className="flex-col pr-2">
      {gridRows && gridRows.map((row, index) => (
        <GridButton dimension="row" key={index} index={index} />
      ))}
    </View>
  )

  const GridColumnButtons = () => (
    <View className="flex-row justify-end pt-2">
      {gridRows && gridRows[0].map((column, index) => (
        <GridButton dimension="column" key={index} index={index} />
      ))}
    </View>
  )

  return (
    <View>
      <View className="flex-row">
        <GridRowButtons />
        <Grid />
      </View>
      <GridColumnButtons />
    </View>
  )
}
