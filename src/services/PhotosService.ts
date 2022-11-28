import {AxiosResponse} from 'axios'
import $api from "../api";
import {IPhotos} from "../models/IPhotos";

const getPhotos = (limit: number = 10, page: number = 1): Promise<AxiosResponse<IPhotos[]>> => {
  return $api.get<IPhotos[]>(`/photos?_limit=${limit}&_page=${page}`)
}

export {getPhotos}