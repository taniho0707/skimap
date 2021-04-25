import {
  getModule,
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import store from '../index';
import { api } from '../../utils/axios';
import { Getter, State } from 'vuex-class';
import { Store } from 'vuex';

export type GpsloglistType = {
  date: string,
  resort: string,
  skier: string,
};

export type GpslogDataType = {
  date: string,
  resort: string,
  skier: string,
  geojson: any,
}

type GpsloglistState = {
  apiGpsloglist: GpsloglistType[];
}

@Module({ store, dynamic: true, namespaced: true, name: 'Gpsloglist' })
class GpsloglistModule extends VuexModule implements GpsloglistState {
  apiGpsloglist: GpsloglistType[] = [] as GpsloglistType[];

  apiGpslogData: GpslogDataType = { date: '', resort: '', skier: '', geojson: null };

  public get getApiGpslogData() {
    return this.apiGpslogData;
  }

  @Mutation
  SET_API_GPSLOGLIST(payload: GpsloglistType[]) {
    this.apiGpsloglist = payload;
  }
  @Action
  async getGpsloglistAll() {
    const response = await api.get('/gpslog/list');
    let response_data: any = [];

    response_data = response.data.data.map((i: any) => {
      i.resort = i.area.name;
      i.skier = i.user.name;
      return i;
    });

    if (response.data.data) {
      this.SET_API_GPSLOGLIST(response_data);
    }
  }

  @Mutation
  SET_API_GPSLOG_GEOJSON(payload: GpslogDataType) {
    this.apiGpslogData = payload;
    console.log(payload);
  }
  @Action
  async getGpslogById(id: number) {
    const response = await api.get('/gpslog/' + id.toString());

    if (response.data.data) {
      const response_data: GpslogDataType = {
        date: response.data.data.date,
        resort: response.data.data.area.name,
        skier: response.data.data.user.name,
        geojson: response.data.data.geojson,
      };
      this.SET_API_GPSLOG_GEOJSON(response_data);
    }
  }
}

export const gpsloglistModule = getModule(GpsloglistModule);
