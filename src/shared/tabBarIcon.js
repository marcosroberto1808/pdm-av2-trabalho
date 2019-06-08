import * as React from 'react';
import { MaterialIcons, FonAwesome } from '@expo/vector-icons';

const tabBarIcon = name => ({ tintColor }) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

// export default tabBarIcon

export default tabBarIcon;
