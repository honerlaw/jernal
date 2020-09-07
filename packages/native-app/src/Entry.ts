import registerRootComponent from 'expo/build/launch/registerRootComponent';
import './util/i18n'
import { enableScreens } from 'react-native-screens';
enableScreens();

import { Router } from './components/Router';
registerRootComponent(Router);
