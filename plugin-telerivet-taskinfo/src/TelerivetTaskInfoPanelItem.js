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
      <h3><b>Telerivet Task Info</b></h3>
      <ul>
        <li>From:{task.attributes.from}</li>
        <li>To:{task.attributes.to}</li>
        <li>Type: {task.attributes.type}</li>
        <li>Location: {task.attributes.location}</li>
        <li>Program Info: {task.attributes.program_info}</li>
        <li>Support: {task.attributes.support}</li>
        <li>Callback: {task.attributes.callback}</li>
      </ul>
  </div>
    }
  }

export default withTaskContext(TelerivetTaskInfoPanelItem);