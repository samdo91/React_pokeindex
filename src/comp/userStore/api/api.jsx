export function num() {
  return 555;
}

export const request = async (url) => {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("api를 받지 않았습니다");
};

// 일반 상태 api
export const pokeApi = async (url) => {
  if (url) {
    const listApi = await request(url);
    return listApi;
  } else {
    const listApi = await request("/api/v2/pokemon?limit=24&offset=0");
    return listApi;
  }
};

// 스폐셜 상태 api
export const pokeSpecialApi = async (url) => {
  if (url) {
    const listApi = await request(url);
    return listApi;
  } else {
    const listApi = await request("/api/v2/pokemon-species/?limit=48&offset=0");
    return listApi;
  }
};

// 단일 스페셜 api
export const pokeSpecStatisticsApi = async (pokeName) => {
  const listApi = await request(`api/v2/pokemon-species/${pokeName}`);
  return listApi;
};
