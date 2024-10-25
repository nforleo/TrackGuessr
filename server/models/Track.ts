export type TracksResponse = {
  items: {
    track: TrackFromSpotify;
  }[];
  next: string | null;
};

export type Track = {
  id: string;
  revealed: boolean;
  year?: number;
  artist?: string;
  title?: string;
  album?: string;
};

export type TrackFromSpotify = {
  album: {
    name: string;
    release_date: string;
  };
  artists: {
    name: string;
  }[];
  name: string;
  uri: string;
};
