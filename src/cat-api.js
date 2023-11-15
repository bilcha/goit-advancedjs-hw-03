import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Z0BIph1LsdCT5cJGo7ARHC7iOuxM4QW5cYxBKcNj8F2frRfgtpqlzx3YZYFIANG4";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds");
}

export function fetchCatByBreed(id) {
  return axios.get("https://api.thecatapi.com/v1/images/search?", {
    params: {
      breed_ids: id
    }
  });
}
