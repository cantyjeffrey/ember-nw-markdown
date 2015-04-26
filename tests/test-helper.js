import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

// Added by ember-cli-node-webkit
import { setQUnitLogger } from './node-webkit/qunit-logger';

setQUnitLogger();