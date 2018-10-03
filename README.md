# react-leaflet-wmts

WMTS TileLayer plugin to react-leaflet

Uses https://github.com/mylen/leaflet.TileLayer.WMTS

## Installing

    yarn add mpivaa/react-leaflet-wmts

## Usage

Just use as any other react-leaflet TileLayer

```jsx
import React from 'react';
import WMTSTileLayer from 'react-leaflet-wmts';
import { Map } from 'react-leaflet';

// Then inside react-leaflet Map
function Example(props) {
  return (
    <Map>
      <WMTSTileLayer
        url="<some-wmts-url>"
        layer="<some-wmts-layer>"
        tilematrixSet="<wmts-projection>"
        format="image/png",
        transparent={true},
        opacity={1}
        {/* ... */}
      />
    </Map>
  );
}
```
