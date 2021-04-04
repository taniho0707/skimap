import {
    getModule,
    Module,
    VuexModule,
    Mutation,
    Action,
  } from 'vuex-module-decorators';
  import store from '../index';
  import { api } from '../../utils/axios';
  
  export type PrefectureType = {
    id: number,
    name: string
  };
  
  type PrefectureState = {
    apiPrefectures: PrefectureType[];
  }
  
  @Module({ store, dynamic: true, namespaced: true, name: 'Prefecture' })
  class PrefectureModule extends VuexModule implements PrefectureState {
    apiPrefectures: PrefectureType[] = [] as PrefectureType[];
  
    @Mutation
    SET_API_PREFECTURES(payload: PrefectureType[]) {
      this.apiPrefectures = payload;
    }
    @Action
    async getPrefectures() {
      const response = await api.get('/prefecture');
  
      if (response.data.data) {
        this.SET_API_PREFECTURES(response.data.data);
      }
    }
  }
  
  export const prefectureModule = getModule(PrefectureModule);
  