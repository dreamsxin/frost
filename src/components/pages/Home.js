import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Icon, Message, Button, Popup } from 'semantic-ui-react'
import vault from '../../images/vault.svg'
import MasterConfig from '../../config/Master'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      online: window.navigator.onLine
    }

    this.setOnline = this.setOnline.bind(this);
    this.setOffline = this.setOffline.bind(this);
  }

  componentWillMount() {
    window.addEventListener('offline', this.setOffline);
    window.addEventListener('online', this.setOnline);

  }

  setOnline() { this.setState({online: true}); }
  setOffline() { this.setState({online: false}); }


  render() {
   return (<div>
      <img src={vault} style={{width:'100%'}} alt={'IOTA Vault'} />
      <h1>Hey There!</h1>
      Safely store coins. <b>{MasterConfig.wallet}</b> generates and reads
      encrypted {MasterConfig.currency} wallets.
      <div style={{paddingTop:'1.5em', paddingBottom:'1em'}}>
        {this.state.online ?
          <Popup
            trigger={<Message warning><Icon name="warning sign" />Offline use <b>required</b>.</Message>}
            content={`You must disconnect from the Internet before using ${MasterConfig.wallet}.`}
            inverted
          /> :
          <div>
            <Button.Group>
              <Button size={"large"} as={Link} to='/unlock'>Unlock</Button>
              <Button.Or />
              <Button size={"large"} positive as={Link} to='/start'>+New Wallet</Button>
            </Button.Group>
            <Popup
              trigger={<Message positive><Icon name="check circle" />No Internet detected.</Message>}
              content="Stay offline when generating or accessing cold wallets."
              inverted
            />
          </div>}
      </div>
    </div>)
  }

}


export default Home
