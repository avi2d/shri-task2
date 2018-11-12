import _ from 'lodash';
import { Mixes } from 'types';

export const defineMixes = (mixes: Mixes, suffix: string = '') =>
  _.isString(mixes)
    ? [`${mixes}${suffix}`]
    : _.map(mixes, m => `${m}${suffix}`);
