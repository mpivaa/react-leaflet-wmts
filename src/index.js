// @flow
import { GridLayer, withLeaflet } from 'react-leaflet';
import type { GridLayerProps } from 'react-leaflet';
import { isEqual, reduce } from 'lodash';
import WMTS from './wmts';

type LeafletElement = WMTS;
type Props = { url: string } & GridLayerProps;

const EVENTS_RE = /^on(.+)$/i;

class WMTSTileLayer extends GridLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const { url, ...params } = props;
    return new WMTS(url, this.getOptions(params));
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    super.updateLeafletElement(fromProps, toProps);

    const {
      url: prevUrl,
      opacity: _po,
      zIndex: _pz,
      ...prevParams
    } = fromProps;
    const { url, opacity: _o, zIndex: _z, ...params } = toProps;

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url);
    }
    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params);
    }
  }

  getOptions(params: Object): Object {
    return reduce(
      super.getOptions(params),
      (options, value, key) => {
        if (!EVENTS_RE.test(key)) {
          options[key] = value;
        }
        return options;
      },
      {}
    );
  }
}

export default withLeaflet(WMTSTileLayer);
