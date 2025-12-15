import { BadGatewayException, Injectable } from '@nestjs/common';

@Injectable()
export class PropertiesstackClient {
  private readonly baseUrl = 'https://api.weatherstack.com/current';

  async getCurrentProperties(query: string, accessKey: string) {
    const url = new URL(this.baseUrl);
    url.searchParams.set('access_key', accessKey);
    url.searchParams.set('query', query);

    const res = await fetch(url.toString());
    if (!res.ok) throw new BadGatewayException(`Weatherstack HTTP ${res.status}`);

    const data: any = await res.json();

    if (data?.success === false) {
      throw new BadGatewayException(`Weatherstack error: ${data?.error?.info ?? 'unknown'}`);
    }

    if (!data?.current || data?.location?.lat == null || data?.location?.lon == null) {
      throw new BadGatewayException('Watherstack response missing current/location');
    }

    return {
      lat: Number(data.location.lat),
      long: Number(data.location.lon),
      PropertiesData: data.current,
    };
  }
}
