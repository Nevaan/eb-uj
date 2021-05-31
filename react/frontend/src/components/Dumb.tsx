import { Component } from 'react';

class Dumb extends Component<{}, {}> {

componentDidMount() {
    fetch("http://localhost:9000/expense", {
        method: 'DELETE'
    })
      .then(res => res.json())
      .then(json => this.setState({ contacts: json.results }));
  }

    render() {
        return "Witam i zapraszam";
    }
}

export default Dumb;