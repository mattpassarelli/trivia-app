import React from 'react';
import axios from 'axios'
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Questions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: this.props.questions,
      counter: 0,
      revealAnswer: false
    }
  }

  showAnswer = () => {
    this.setState({ revealAnswer: !this.state.revealAnswer })
  }

  nextQuestion = () => {
    this.setState({ revealAnswer: false })
    console.log(this.state.questions.length - 1 + "  " + this.state.counter)
    if (this.state.counter < this.state.questions.length) {
      this.setState({ counter: this.state.counter + 1 })
    }
  }

  refreshPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <div>

        {this.state.questions.length == this.state.counter ?

          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', textAlign: "center"
          }}>
            You've finished!
          <br />
            Play again?
          <br />
            <Button onClick={this.refreshPage} variant="primary">Play Again!</Button>
            {/* <button onClick={this.refreshPage}>Play Again</button> */}
          </div>

          :

          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: "center"
          }}>
            Question: {this.state.questions[this.state.counter].question}
            <br />
            <Button variant="danger" onClick={this.showAnswer}>Toggle Answer</Button>
            {this.state.revealAnswer ?
              <div>
                Answer: {this.state.questions[this.state.counter].correct_answer}
                {/* <button onClick={this.nextQuestion}>Next Question</button> */}
                <br />
                <Button variant="primary" onClick={this.nextQuestion}>Next Question</Button>
              </div>

              : null
            }
            <br />

            {/* <button onClick={this.showAnswer}>Toggle Answer</button> */}
          </div>
        }



      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      numOfQuestions: "",
      questions: [],
      showQuestions: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ numOfQuestions: event.target.value })
  }

  handleSubmit(event) {
    if (this.state.numOfQuestions <= 0) {
      alert("You must enter at least 1");
      return;
    }
    else if (this.state.numOfQuestions > 50) {
      alert("You must enter no more than 50");
      return;
    }

    axios.get("https://opentdb.com/api.php?amount=" + this.state.numOfQuestions)
      .then(res => {
        console.log(res.data.results)
        this.setState({
          questions: res.data.results,
          showQuestions: true
        });

      })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {this.state.showQuestions ? <Questions questions={this.state.questions} />
          : <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <form onSubmit={this.handleSubmit}>
              <label>
                Enter how many questions you want from 1 to 50
                <br />
                <InputGroup className="mb-3">
                  <FormControl value={this.state.numOfQuestions} onChange={this.handleChange} />
                </InputGroup>
              </label>

              <br />

              <Button variant="primary" size="lg" type="submit" value="Submit">
                Start!
              </Button>
            </form>
          </div>}
      </div>
    );
  }
}

export default App;
