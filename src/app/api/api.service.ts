import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);

  /**
   * Simula una llamada HTTP al backend para obtener un listado de películas.
   *
   * Los datos provienen del fichero local `data.json` y están estructurados
   * con propiedades que simulan el formato típico de una API REST.
   *
   * @returns Observable con un array de objetos que representan películas.
   * Cada objeto incluye:
   *  - `title`: Título de la película
   *  - `direction`: Director o directora
   *  - `release_year`: Año de estreno
   *  - `genre`: Array de géneros
   *  - `country`: País de origen
   *  - `duration`: Duración en minutos
   *
   * Además, se añade una latencia artificial de 750ms para simular el retardo real de una llamada HTTP.
   */
  public getData() {
    return this._http
      .get<
        {
          country: string;
          direction: string;
          duration: number;
          genre: string[];
          release_year: number;
          title: string;
        }[]
      >('data.json')
      .pipe(delay(750));
  }
}
