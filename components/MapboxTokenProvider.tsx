'use client';

import React, { createContext, useContext } from 'react';

const MapboxTokenContext = createContext<string | undefined>(undefined);

export function MapboxTokenProvider({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) {
  return (
    <MapboxTokenContext.Provider value={token}>
      {children}
    </MapboxTokenContext.Provider>
  );
}

/** Jeton public Mapbox (pk.) : fourni par le serveur via MapboxTokenProvider, sinon variables NEXT_PUBLIC_* au build. */
export function useMapboxPublicToken(): string {
  const fromServer = useContext(MapboxTokenContext);
  if (fromServer !== undefined) {
    return fromServer;
  }
  return (
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim() ||
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim() ||
    ''
  );
}
