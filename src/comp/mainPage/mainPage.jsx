import React, { useEffect, useContext, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
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

  const { ref, inView, entry } = useInView({});

  function ApiList(url) {
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
        key: id,
      });
      const boardlist = pokeState.PokeBoardStatus.concat(pokeList).sort(
        function (a, b) {
          return a.id - b.id;
        }
      );

      setPokeState({
        ...pokeState,
        PokeBoardStatus: boardlist,
        pokelist: list,
        specialList: specialList,
        isFirstRender: true,
      });
    };
    //리스트를 받아와서 뿌려줌
    const setlists = (list, specialList) => {
      list.results.forEach(async (item) => {
        pokeStatistics(item, list, specialList);
      });
    };
    //종합적으로다가 나
    const apilistFuntion = async (url) => {
      const list = await pokeApi(url);
      const specialList = await pokeSpecialApi(url);

      setlists(list, specialList);
    };
    apilistFuntion(url);
  }

  // 첫 랜더링시 한 번만 돌아감
  useEffect(() => {
    if (pokeState.pokelist.length === 0) {
      ApiList();
    } else if (pokeState.pokelist.length > 0) {
      console.log(pokeState.pokelist);
      ApiList();
    }
  }, []);

  useEffect(() => {
    if (pokeState.isFirstRender) {
      if (inView) {
        console.log(inView);
        ApiList(pokeState.pokelist.next);
      }
    }
  }, [inView]);

  return (
    <div>
      <h1>포켓몬도감</h1>
      <BoardPage />
      <div>
        <div ref={ref}>
          <h2>{`${inView}`}</h2>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
