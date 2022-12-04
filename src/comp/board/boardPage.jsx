import React, { useContext } from "react";
import { css } from "@emotion/css";
import {
  pokeStateContext,
  setPokeStateContext,
} from "../userStore/context/context";
function BoardPage() {
  const pokeState = useContext(pokeStateContext);
  const setPokeState = useContext(setPokeStateContext);

  console.log(pokeState);

  return (
    <div
      className={css`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start
    margin-top: 25px;
    justify-content: space-evenly

  }
`}
    >
      {pokeState.PokeBoardStatus.map((item) => {
        return (
          <div
            key={item.id}
            className={css`
              border: 1px solid black;
              padding: 32px;
              height: 200px;
              font-size: 24px;
              border-radius: 10px;
              width: 200px;
              margin: 10px;
            `}
          >
            <img src={item.sprites}></img>
            <div>{`No: ${item.id}`} </div>
            <div> {item.KoreanName}</div>
            <div>
              {item.pokeStatistics.types.map((item, index) => (
                <div key={index}>{item.type.name}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BoardPage;
