import React, { useContext } from "react";
import {
  pokeStateContext,
  setPokeStateContext,
} from "../userStore/context/context";
import { useParams } from "react-router-dom";

function DetailPage() {
  const Params = useParams();
  const pokeState = useContext(pokeStateContext);
  const setPokeState = useContext(setPokeStateContext);
  const pagePokemonState = pokeState.PokeBoardStatus.find((item) => {
    return item.name === Params.itemName;
  });

  // flavorText 한국어로로 추출기
  const flavorText =
    pagePokemonState.pokeSpecStatistic.flavor_text_entries.filter(
      (elements) => elements.language.name === "ko"
    );

  console.log(flavorText);

  return (
    <div>
      <img src={pagePokemonState.sprites}></img>
      <div> {`No. ${pagePokemonState.id}`} </div>
      <div> {`이름 : ${pagePokemonState.KoreanName}`} </div>

      <table border="1">
        {flavorText.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.version.name}</td>
              <td>{item.flavor_text}</td>
            </tr>
          );
        })}

        {/* <tr>
          <td>첫번째 칸</td>
        </tr>
        <tr>
          <td>첫번째 칸</td>
          <td>두번째 칸</td>
        </tr> */}
      </table>
    </div>
  );
}
export default DetailPage;
