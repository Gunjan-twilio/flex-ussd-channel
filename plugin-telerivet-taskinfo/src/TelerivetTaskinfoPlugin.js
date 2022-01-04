import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';
import TelerivetTaskInfoPanelItem from "./TelerivetTaskInfoPanelItem";
const PLUGIN_NAME = 'TelerivetTaskinfoPlugin';

export default class TelerivetTaskinfoPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    console.log('Custom Attributes ussd');
    const options = { sortOrder: -1 };
    flex.TaskInfoPanel.Content.add(<TelerivetTaskInfoPanelItem key="ussd-info"/>);
      manager.strings.TaskHeaderLine = '{{task.attributes.channel}}';
      manager.strings.TaskReserved = '{{task.attributes.channel}} request : ';
      manager.strings.TaskLineSmsReserved = ' {{task.attributes.channel}} request : ';
      try{
        console.log('Custom Attributes {{task.attributes.customAttributes}}');
      }catch{}
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
