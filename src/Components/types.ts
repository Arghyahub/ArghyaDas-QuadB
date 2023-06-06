interface Schedule {
    time: string;
    days: string[];
  }
  
  interface Country {
    name: string;
    code: string;
    timezone: string;
  }
  
  interface Network {
    id: number;
    name: string;
    country: Country;
    officialSite: string;
  }
  
  interface Externals {
    tvrage: null;
    thetvdb: number;
    imdb: string;
  }
  
  interface Image {
    medium: string;
    original: string;
  }
  
  interface Rating {
    average: number;
  }
  
  interface Links {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  }
  
interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string | null;
    officialSite: string;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: Network;
    webChannel: null;
    dvdCountry: null;
    externals: Externals;
    image: Image;
    summary: string;
    updated: number;
    _links: Links;
}
  
export type ApiResponse = {
    score: number;
    show: Show;
}[];

export interface movie{
    score: number;
    show: Show;
}
  