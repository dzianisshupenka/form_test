import React, {Component} from 'react';
import style from './ethernet.module.css';

class EthernetSettings extends Component {
    state = {
        validation: {
            IPDirty: false,
            IPError: 'field cannot be empty',
            DNSDirty: false,
            DNSError: 'field cannot be empty',
            MaskDirty: false,
            MaskError: 'field cannot be empty'
        },
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
            default:
                return '';
        }
    }

    onChange = (e) => {
        let { name, value, type} = e.target;
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

    submit = (e) => {
        e.preventDefault();
    }
    
    render() {
        const { IP, SubnetMask, DefaultGateway, PreferedDNS, AlternativeDNS, IPAuto, DNSAuto, validation } = this.state;
        return (
            <div className={style.main}>     
                <h3>Ethernet Settings</h3>
                <form className={style.ipform} onSubmit={this.submit}>
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
                                <input onBlur={(e) => this.blurHandler(e)} name="SubnetMask" value={SubnetMask} onChange={this.maskHandler} disabled={IPAuto} required/>
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
                                <input onBlur={(e) => this.blurHandler(e)} name="PreferedDNS" value={PreferedDNS} onChange={this.dnsHandler} disabled={DNSAuto} required/>
                            </div> 
                            <div className={style.input}>
                                Alternative DNS server:
                                <input name="AlternativeDNS" value={AlternativeDNS} disabled={DNSAuto} onChange={this.onChange} />
                            </div>
                        </div>       
                    </div>
                </form>
            </div>
        )
    }
}

export default EthernetSettings;
