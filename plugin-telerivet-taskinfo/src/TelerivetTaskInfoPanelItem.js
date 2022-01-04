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
        <li>Type: {task.attributes.type}</li>
        <li>Language: {task.attributes.language}</li>
        <li>Location: {task.attributes.location}</li>
        <li>Support Type: {task.attributes.support_type}</li>
        <li>Callback Requested: {task.attributes.callback}</li>
      </ul>
  </div>
    }
  }

export default withTaskContext(TelerivetTaskInfoPanelItem);