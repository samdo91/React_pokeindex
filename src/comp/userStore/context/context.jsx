import React, { createContext, useState } from "react";

export const pokeStateContext = createContext();
export const setPokeStateContext = createContext();

function Context(props) {
  const [pokeState, setPokeState] = useState({
    pokelist: [],
    specialList: [],
    PokeBoardStatus: [],
  });

  return (
    <pokeStateContext.Provider value={pokeState}>
      <setPokeStateContext.Provider value={setPokeState}>
        {props.children}
      </setPokeStateContext.Provider>
    </pokeStateContext.Provider>
  );
}
export default Context;
