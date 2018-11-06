// tslint:disable:only-arrow-functions
import { UserConfig } from 'machoke-sdk';
import { Environment, EnvironmentService } from '@platform/core/services/environment/environment.service';

export function CommunicatorConfigFactory(): UserConfig {
  const chatUrl = new URL(`${window.location.origin}/artichoke`);
  const productionLogLevel = 2;

  return {
    /**
     * DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3, NONE = 4
     */
    logLevel: EnvironmentService.get() === Environment.PRODUCTION ? productionLogLevel : 0,
    chat: {
      protocol: chatUrl.protocol,
      pathname: chatUrl.pathname,
      hostname: chatUrl.hostname,
      port: chatUrl.port,
      /**
       * When using multiple artichoke instances, reconnection to the same deviceId sometimes
       * results in missing WS events such as callInvitation, webrtc candidates, sdp descriptions etc.
       * With single artichoke this bug is unreproducible.
       */
      reconnectionDisabled: true,
      rtc: {
        iceTransportPolicy: 'all',
        bundlePolicy: 'max-bundle',
        iceServers: [
          {
            urls: [
              'turns:turn2.anymind.com:443?transport=udp',
              'turns:turn2.anymind.com:443?transport=tcp',
              'turn:turn2.anymind.com:80?transport=udp',
              'turn:turn2.anymind.com:80?transport=tcp',
              'stun:turn2.anymind.com:443',
              'stun:turn2.anymind.com:80',
            ],
            username: 'anymind',
            credential: 'turn',
          },
        ],
      },
      callstats:
        EnvironmentService.get() === Environment.PRODUCTION
          ? {
              appId: '855932209',
              appSecret: 'pz3m+iOw8/JF:DsraQEDX6LqyBCiOop5+z5jYKn3CDstcV7+9RhCATcU=',
            }
          : undefined,
    },
  };
}
