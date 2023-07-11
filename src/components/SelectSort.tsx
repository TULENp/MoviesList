
import React from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { sortTypes } from '../constants'
import { moviesStore } from '../stores/MoviesStore'

//* Display select(dropdown list) with sort types
export function SelectSort() {
    return (
        <SelectList
            setSelected={(val: string) => moviesStore.changeSortType(val)}
            data={sortTypes}
            defaultOption={sortTypes[0]}
            save="key"
            search={false}
            boxStyles={{
                backgroundColor: "white",
                width: 200
            }}
            dropdownStyles={{
                backgroundColor: "white",
            }}
        />
    )
}