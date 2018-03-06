import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';

class LinkSubmissionArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceLink: "",
      targetUrl: "",
    }
    this.handleSourceLinkChange = this.handleSourceLinkChange.bind(this);
    this.handleTargetUrlChange = this.handleTargetUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSourceLinkChange(event) {
    this.setState({
      sourceLink: event.target.value,
    })
  }

  handleTargetUrlChange(event) {
    this.setState({
      targetUrl: event.target.value,
    })
  }

  handleSubmit() {
    const url = `/api/?sourceLink=${this.state.sourceLink}&targetUrl=${this.state.targetUrl}`;
    fetch(url, {method: 'POST'})
      .then(data => console.log(data))
      .catch(error => console.error(error))

    // Clear the input fields
    this.setState({
      sourceLink: "",
      targetUrl: "",
    })
  }

  render() {
    return (
      <Container>
        <Row style={{
          backgroundColor: "white",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          padding: "2em",
        }}>
          <Col md="6">
            <InputGroup>
              <Input placeholder="Long URL here"
                value={this.state.targetUrl}
                onChange={this.handleTargetUrlChange}
              />
            </InputGroup>
          </Col>
          <Col md="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">customl.ink/</InputGroupAddon>
              <Input placeholder="your custom link here"
                value={this.state.sourceLink}
                onChange={this.handleSourceLinkChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <br />
        <Button
          size="lg"
          onClick={this.handleSubmit}
          style={{
          borderRadius: "50px",
          backgroundColor: "white",
          border: "none",
          color: "orange",
          boxShadow: "0 10px 15px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.10)",
          height: "50px",
          width: "150px",
          fontWeight: "450",
          fontFamily: "Segoe UI",
          fontSize: "1em",
        }}>Customize</Button>
      </Container>
    );
  }
}

export default LinkSubmissionArea;
