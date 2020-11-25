import React, {Component} from 'react';
import './App.css';
import EthernetSettings from './components/EthernetSettings';
import WirelessSettings from './components/WirelessSettings';

class App extends Component {

  state = {
    wirelessSettings: {
      wirelessEnabled: false,
      securityEnabled: false,
      selectedNetwork: '',
      securityKey: '',
      IPAuto: true,
      IP: '',
      SubnetMask: '',
      DefaultGateway: '',
      DNSAuto: true,
      PreferedDNS: '',
      AlternativeDNS: ''
    },
    ethernetSettings: {
      IPAuto: true,
      IP: '',
      SubnetMask: '',
      DefaultGateway: '',
      DNSAuto: true,
      PreferedDNS: '',
      AlternativeDNS: ''
    }
  }

  saveChanges = () => {
    console.log(JSON.stringify(this.state));
  }

  getEthernetSettings = (name, value) => {
    this.setState({ethernetSettings: {...this.state.ethernetSettings, [name]: value}})
  }

  getWirelesSettings = (name, value) => {
    this.setState({wirelessSettings: {...this.state.wirelessSettings, [name]: value}})
  }

  render() {
    return (
      <div className='container'>
        <EthernetSettings handler={this.getEthernetSettings} />
        <WirelessSettings handler={this.getWirelesSettings}/>
        <div className='buttons'>
          <button form='my-form' className='saveButton' onClick={this.saveChanges}>Save</button>
          <button form='my-form2' className='cancelButton'>Cancel</button>
        </div>
      </div>
    )
  }
};

export default App;
