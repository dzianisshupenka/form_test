import React, {Component} from 'react';
import style from './wireless.module.css';

class WirelessSettings extends Component {

    state = {
        validation: {
            IPDirty: false,
            IPError: 'field cannot be empty',
            DNSDirty: false,
            DNSError: 'field cannot be empty',
            MaskDirty: false,
            MaskError: 'field cannot be empty',
            SecurityDirty: false,
            SecurityError: 'field cannot be empty'
        },
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
    }

    blurHandler = (e) => {
        switch (e.target.name) {
            case 'IP':
                this.setState({validation: {...this.state.validation, IPDirty: true}});
                break;
            case 'SubnetMask':
                this.setState({validation: {...this.state.validation, MaskDirty: true}});
                break;
            case 'PreferedDNS':
                this.setState({validation: {...this.state.validation, DNSDirty: true}});
                break;
            case 'securityKey':
                this.setState({validation: {...this.state.validation, SecurityDirty: true}});
                break;
            default:
                return '';
        }
    }

    onChange = (e) => {
        let { name, value, type, checked} = e.target;
        if (name === 'securityKey') {
            value.length === 0 
            ? this.setState({validation: {...this.state.validation, SecurityError: 'field cannot be empty'}}) 
            : this.setState({validation: {...this.state.validation, SecurityError: ''}})
        }
        if (type==='checkbox') {
            value = checked;
        }
        if (type==='radio') {
            if (name === 'IPAuto') {
                value = value === '1';
            } else {
                value = value === '3';
            }
        }
        this.setState({[name]: value});
        this.props.handler(name, value);
    }

    ipHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.props.handler(e.target.name, e.target.value);
        const re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!re.test(e.target.value) && e.target.value.length) {
            this.setState({validation: {...this.state.validation, IPError: 'IP adress is not valid', IPDirty: true}});
        } else if (e.target.value.length === 0) {
            this.setState({validation: {...this.state.validation, IPError: 'field cannot be empty'}});
        } else {
            this.setState({validation: {...this.state.validation, IPError: ''}});
        }
    }

    maskHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.props.handler(e.target.name, e.target.value);
        const re = /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/;
        if (!re.test(e.target.value) && e.target.value.length) {
            this.setState({validation: {...this.state.validation, MaskError: 'Subnet Mask is not valid', MaskDirty: true}});
        } else if (e.target.value.length === 0) {
            this.setState({validation: {...this.state.validation, MaskError: 'field cannot be empty'}});
        } else {
            this.setState({validation: {...this.state.validation, MaskError: ''}});
        }
    }

    dnsHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.props.handler(e.target.name, e.target.value);
        const re = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
        if (!re.test(e.target.value) && e.target.value.length) {
            this.setState({validation: {...this.state.validation, DNSError: 'DNS server is not valid', DNSDirty: true}});
        } else if (e.target.value.length === 0) {
            this.setState({validation: {...this.state.validation, DNSError: 'field cannot be empty'}});
        } else {
            this.setState({validation: {...this.state.validation, DNSError: ''}});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        const { wirelessEnabled, securityEnabled, selectedNetwork, securityKey, validation } = this.state;
        const { IP, SubnetMask, DefaultGateway, PreferedDNS, AlternativeDNS, IPAuto, DNSAuto } = this.state;
        return (
            <div className={style.main}>
                <h3>Wireless Settings</h3>
                <form className={style.ipform} onSubmit={this.handleSubmit}>
                    <div className={style.check}>
                        <input type="checkbox" name="wirelessEnabled" onChange={this.onChange}/>
                        <label htmlFor="check">
                            Enable Wifi
                        </label>
                    </div>
                    <div className={`${style.input} ${wirelessEnabled ? '' : style.disabled}`}>
                        Wireless Network Name: <span className={style.required}>*</span>
                        <select className={style.input} name="selectedNetwork" value={selectedNetwork} onChange={this.onChange} required>
                            <option value="lan#1">lan#1</option>
                            <option value="lan#2">lan#2</option>
                            <option value="lan#3">lan#3</option>
                        </select>
                        <button>&#8635;</button>
                    </div> 
                    <div className={`${style.check} ${wirelessEnabled ? '' : style.disabled}`}>
                        <input type="checkbox" name="securityEnabled" onChange={this.onChange}/>
                        <label htmlFor="check">
                            Enable Wireless Security
                        </label>
                    </div>
                    {(validation.SecurityDirty && validation.SecurityError && securityEnabled) && <div className={style.error}>{validation.SecurityError}</div>}
                    <div className={`${style.input} ${securityEnabled ? '' : style.disabled}`}>
                        Security Key: <span className={style.required}>*</span>
                        <input onBlur={(e) => this.blurHandler(e)} type="password" name="securityKey" value={securityKey} onChange={this.onChange} disabled={!securityEnabled} required/>
                    </div>
                    <div className={wirelessEnabled ? '' : style.disabled}>
                        <div>
                            <div className={style.radio}>
                                <input type="radio" name="IPAuto" value="1" checked={IPAuto} onChange={this.onChange} />
                                <label>
                                    Obtain an IP address automaticaly(DHCP/BootP)
                                </label>
                            </div>
                            <div className={style.radio}>
                                <input type="radio" name="IPAuto" value="2" checked={!IPAuto} onChange={this.onChange} />
                                <label>
                                    Use the following IP address
                                </label>
                            </div>
                            <div className={`${style.inputsWrapper} ${IPAuto ? style.disabled : ''}`}>
                                {(validation.IPDirty && validation.IPError && !IPAuto) && <div className={style.error}>{validation.IPError}</div>}
                                <div className={style.input}>
                                    IP address: <span className={style.required}>*</span>
                                    <input onBlur={(e) => this.blurHandler(e)} name="IP" value={IP} onChange={this.ipHandler} disabled={IPAuto} required/>
                                </div> 
                                {(validation.MaskDirty && validation.MaskError && !IPAuto) && <div className={style.error}>{validation.MaskError}</div>}
                                <div className={style.input}>
                                    Subnet Mask: <span className={style.required}>*</span>
                                    <input onBlur={(e) => this.blurHandler(e)} name="SubnetMask" value={SubnetMask} disabled={IPAuto} onChange={this.maskHandler} required/>
                                </div> 
                                <div className={style.input}>
                                    Default Gateway:
                                    <input name="DefaultGateway" value={DefaultGateway} disabled={IPAuto} onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.radio}>
                                <input type="radio" name="DNSAuto" value="3" checked={DNSAuto} onChange={this.onChange} />
                                <label>
                                    Obtain DNS server address automaticaly
                                </label>
                            </div>
                            <div className={style.radio}>
                                <input type="radio" name="DNSAuto" value="4" checked={!DNSAuto} onChange={this.onChange} /> 
                                <label>
                                    Use the following DNS server address
                                </label>
                            </div>
                            <div className={`${style.inputsWrapper} ${DNSAuto ? style.disabled : ''}`}>
                                {(validation.DNSDirty && validation.DNSError && !DNSAuto) && <div className={style.error}>{validation.DNSError}</div>}
                                <div className={style.input}>
                                    Prefered DNS server: 
                                    <span className={style.required}>*</span>
                                    <input onBlur={(e) => this.blurHandler(e)} name="PreferedDNS" value={PreferedDNS} disabled={DNSAuto} onChange={this.dnsHandler} required/>
                                </div> 
                                <div className={style.input}>
                                    Alternative DNS server:
                                    <input name="AlternativeDNS" value={AlternativeDNS} disabled={DNSAuto} onChange={this.onChange} />
                                </div>
                            </div>       
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default WirelessSettings;
