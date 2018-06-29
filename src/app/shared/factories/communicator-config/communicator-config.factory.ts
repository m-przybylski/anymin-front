// tslint:disable:only-arrow-functions
import { Config } from 'ratel-sdk-js';
import { CommonConfig } from '../../../../common-config';

export function CommunicatorConfigFactory(): Config {

  const ratelUrl = new URL(CommonConfig.getCommonConfig().urls.communicator.briefcase);
  const chatUrl = new URL(CommonConfig.getCommonConfig().urls.communicator.artichoke);

  return {
    logLevel: 2, // DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3, NONE = 4
    ratel: {
      protocol: ratelUrl.protocol,
      pathname: ratelUrl.pathname,
      hostname: ratelUrl.hostname,
      port: ratelUrl.port,
    },
    chat: {
      protocol: chatUrl.protocol,
      pathname: chatUrl.pathname,
      hostname: chatUrl.hostname,
      port: chatUrl.port,
      rtc: {
        iceTransportPolicy: 'all',
        bundlePolicy: 'balanced',
        iceServers: [{
          // FIXME ?transport=upd is required by Edge.
          urls: ['stun:turn.ratel.im:443?transport=udp', 'turn:turn.ratel.im:443?transport=udp'],
          username: 'test123',
          credential: 'test456'
        }]
      }
    }
  };
}
