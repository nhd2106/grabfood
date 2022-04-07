import React, { Component } from 'react'

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      Check: 0,
      Pick: 0,
      Value: [],
      check_pick: 0,
      Value_pick: 0,
    }
  }

  componentWillMount() {

    var Pick_string = this.props.Pick;
    var index_number = Pick_string.lastIndexOf(' ');
    var Value_pick = Number(Pick_string.slice(index_number + 1));

    this.setState({
      name: this.props.name,
      Check: this.props.Check,
      Pick: this.props.Pick,
      Value: this.props.Value,
      Value_pick: Value_pick
    });
  }

  handleChange_checkbox = (event, price) => {

    if (event.target.checked == true) {
      this.state.check_pick++;
      if (this.state.check_pick > this.state.Value_pick) {
        event.target.checked = false;
      }
      if (this.state.Pick.lastIndexOf("Pick") >= 0) {
        this.props.ax.push({
          name: this.state.name,
          Pick: this.props.Pick,
          Check: this.state.check_pick,
        });
      }
    }

    this.props.handleGet_ValueCheck(event.target, price);

    if (event.target.checked == false) {
      if (this.state.Pick.lastIndexOf("Pick") >= 0) {
        for (let index = 0; index < this.props.ax.length; index++) {
          if (this.state.name == this.props.ax[index].name && this.state.check_pick == this.props.ax[index].Check) {
            this.props.ax.splice(index, 1)
          }
        }
      }
      this.state.check_pick--;
    }
    this.props.kiemtra_checked();
  }

  render_option = () => {
    return this.state.Value.map((op) => {
      return (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input value={op.name_value} onChange={(event, price) => this.handleChange_checkbox(event, op.price)} disabled={op.hethan} type="checkbox" aria-label="Checkbox for following text input" />
            </div>
          </div>
          <label type="text" className="form-control" aria-label="Text input with checkbox" >{op.name_value}{op.hethan}</label>
          <label type="text" className="input-group-text">{op.price}</label>
        </div>
      )
    })
  }

  render() {
    return (
      <div class="pricing-levels-3">
        <p><strong>{this.state.name}</strong> {this.state.Pick}</p>
        {this.render_option()}
      </div>
    )
  }
}
