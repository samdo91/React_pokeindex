import React, { useEffect, useContext } from "react";
import {
  pokeStateContext,
  setPokeStateContext,
} from "../userStore/context/context";
import {
  request,
  pokeApi,
  pokeSpecialApi,
  pokeSpecStatisticsApi,
} from "../userStore/api/api";

import BoardPage from "../board/boardPage";

function MainPage() {
  const pokeState = useContext(pokeStateContext);
  const setPokeState = useContext(setPokeStateContext);

  useEffect(() => {
    apilistFuntion();
  }, []);

  const spritesAbstraction = (list) => {
    return list.sprites.front_default;
  };
  const KoreanNameAbstraction = (list) => {
    return list.names.find((item) => item.language.name === "ko").name;
  };
  let pokeList = [];

  const pokeStatistics = async (item) => {
    const pokeStatistics = await request(item.url);
    const pokeSpecStatistic = await pokeSpecStatisticsApi(item.name);
    const id = pokeStatistics.id;
    const url = item.url;
    const name = item.name;
    const sprites = spritesAbstraction(pokeStatistics);
    const KoreanName = KoreanNameAbstraction(pokeSpecStatistic);
    pokeList.push({
      ...pokeState,
      pokeStatistics: pokeStatistics,
      pokeSpecStatistic: pokeSpecStatistic,
      id: id,
      url: url,
      name: name,
      sprites: sprites,
      KoreanName: KoreanName,
    });
    const boardlist = pokeState.PokeBoardStatus.concat(pokeList).sort(function (
      a,
      b
    ) {
      return a.id - b.id;
    });

    setPokeState({
      ...pokeState,
      PokeBoardStatus: boardlist,
    });
  };

  const setlists = (list) => {
    console.log(list.results);
    list.results.map(async (item) => {
      pokeStatistics(item);
    });
  };

  const apilistFuntion = async (url) => {
    const list = await pokeApi(url);
    const specialList = await pokeSpecialApi(url);
    console.log(3);
    setlists(list);
  };

  return (
    <div>
      <h1>포켓몬도감</h1>
      <BoardPage />
    </div>
  );
}

export default MainPage;
