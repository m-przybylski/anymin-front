import { InjectionToken } from '@angular/core';
import { Config } from '../../config';
import { CoreConfig } from '../../core-config';
import { LogLevel } from '../../core';
import { UserConfig } from 'machoke-sdk';

export const COMPONENTS_CONFIG = new InjectionToken<Config>('COMPONENTS_CONFIG');
export const CORE_CONFIG = new InjectionToken<CoreConfig>('CORE_CONFIG');
export const LOG_LEVEL = new InjectionToken<LogLevel>('LOG_LEVEL');
export const LOG_PREFIX = new InjectionToken<string>('LOG_PREFIX');
export const COMMUNICATOR_CONFIG = new InjectionToken<UserConfig>('RATEL_CONFIG');
