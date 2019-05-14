import { Metrics } from './metrics';

export interface Data {
     msgType: string;
     data?: Metrics;
     error?: any;
}
