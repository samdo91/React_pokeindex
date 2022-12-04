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
  // 첫 랜더링시 한 번만 돌아감
  useEffect(() => {
    apilistFuntion();
  }, []);
  // 스프라이트 추출
  const spritesAbstraction = (list) => {
    return list.sprites.front_default;
  };

  // 코리안 네임 추출
  const KoreanNameAbstraction = (list) => {
    return list.names.find((item) => item.language.name === "ko").name;
  };
  let pokeList = [];
  // 종합적으로 다가 오브젝트를 꾸려줌
  const pokeStatistics = async (item, list, specialList) => {
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
      pokelist: [...pokeState.pokelist, { list }],
      specialList: [...pokeState.specialList, { specialList }],
    });
  };
  //리스트를 받아와서 뿌려줌
  const setlists = (list, specialList) => {
    list.results.map(async (item) => {
      pokeStatistics(item, list, specialList);
    });
  };
  //종합적으로다가 나
  const apilistFuntion = async (url) => {
    const list = await pokeApi(url);
    const specialList = await pokeSpecialApi(url);
    console.log(3);
    setlists(list, specialList);
  };

  return (
    <div>
      <h1>포켓몬도감</h1>
      <BoardPage />
    </div>
  );
}

export default MainPage;
