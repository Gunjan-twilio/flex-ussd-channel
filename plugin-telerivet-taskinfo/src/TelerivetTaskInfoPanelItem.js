import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';


class TelerivetTaskInfoPanelItem extends React.Component {
    render() {
      // Retrieve Task details
      // (`task` will be undefined if there's no task selected in the UI)
      const { task } = this.props;
      // Render Task SID in component as a test
      return <div>
      <br />
      <hr />
      <h3><b>USSD Task Info</b></h3>
      <ul>
        <li>From:{task.attributes.from}</li>
        <li>To:{task.attributes.to}</li>
        <li>Type: {task.attributes.type}</li>
        <li>Channel: {task.attributes.channel}</li>
        
      </ul>
  </div>
    }
  }

export default withTaskContext(TelerivetTaskInfoPanelItem);