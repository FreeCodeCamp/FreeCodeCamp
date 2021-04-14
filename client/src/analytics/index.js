import ReactGA from 'react-ga';
import {
  devAnalyticsId,
  prodAnalyticsId
} from '../../../config/analytics-settings';
import envData from '../../../config/env.json';

const { deploymentEnv } = envData;

const analyticsId =
  deploymentEnv === 'staging' ? devAnalyticsId : prodAnalyticsId;

ReactGA.initialize(analyticsId);

export default ReactGA;
