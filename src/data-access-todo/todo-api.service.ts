import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class TodoApiService {
  private readonly _http = inject(HttpClient);

  loadCoordinates(payload: { location: string }) {
    return this._http.get<{
      results?: { latitude: number; longitude: number }[]
    }>(`https://geocoding-api.open-meteo.com/v1/search?name=${payload.location}&count=1&language=pl&format=json`)
  }

  loadTemperatureForCoordinates(payload: { latitude: number; longitude: number }) {
    return this._http.get<{
      current: { temperature_2m: number },
      current_units: { temperature_2m: string }
    }>(`https://api.open-meteo.com/v1/forecast?latitude=${payload.latitude}&longitude=${payload.longitude}&current=temperature_2m`)
  }
}
