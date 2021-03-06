import {randomGrid, tick, optimalGridSize} from './helpers';

const DEFAULT_SIZE = 40;

export const CLEAR_GRID = 'CLEAR_GRID';
export const RANDOMIZE_GRID = 'RANDOMIZE_GRID';
export const ONE_TICK = 'ONE_TICK';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const CHANGE_GRID_SIZE = 'CHANGE_GRID_SIZE';

export const initialState = {
  cells: new Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(0),
  rows: DEFAULT_SIZE,
  cols: DEFAULT_SIZE,
  running: false,
  size: '12px'
};

// Action Creators

export const clearGrid = () => ({ type: CLEAR_GRID });
export const randomizeGrid = () => ({ type: RANDOMIZE_GRID });
export const oneTick = () => ({ type: ONE_TICK });
export const togglePlay = () => ({ type: TOGGLE_PLAY });
export const changeGridSize = size => ({ type: CHANGE_GRID_SIZE, size });

// Reducer

export default function (state = initialState, action) {
  const {rows, cols, cells, running} = state;

  switch (action.type) {
    case CHANGE_GRID_SIZE:
      return {
        ...state,
        rows: action.size,
        cols: action.size,
        size: `${optimalGridSize(action.size)}px`,
        cells: new Array(action.size * action.size).fill(0),
        running: false
      };

    case TOGGLE_PLAY:
      return {...state, running: !running };

    case ONE_TICK:
      return {...state, cells: tick(cells, [rows, cols])};

    case CLEAR_GRID:
      return {...state, cells: [...cells].fill(0)};

    case RANDOMIZE_GRID:
      return {...state, cells: randomGrid(rows * cols)};

    default:
      return state;
  }
}

