import registerRootComponent from 'expo/build/launch/registerRootComponent';
import './util/i18n'
import { Router } from './components/Router';

// @todo move to https://reactnavigation.org/docs/navigating instead of react-router
// react-router has some inherent limitations with animated transitions

registerRootComponent(Router);
