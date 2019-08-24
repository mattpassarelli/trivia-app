import React from 'react';
import axios from 'axios'
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Used for decoding the garbage HTML encoding returned by the JSON
// https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Used for shuffling answers around:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Questions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: this.props.questions,
      counter: 0,
      revealAnswer: false,
      green: false,
      answers: [],
      shuffled: false
    }

  }

  showAnswer = () => {
    this.setState({ green: !this.green })
    this.setState({ revealAnswer: !this.state.revealAnswer })
  }

  nextQuestion = () => {
    this.setState({ revealAnswer: false })
    this.setState({ shuffled: false })
    this.setState({ green: false })
    this.setState({ tOrF: false })
    console.log(this.state.questions.length - 1 + "  " + this.state.counter)
    if (this.state.counter < this.state.questions.length) {
      this.setState({ counter: this.state.counter + 1 })
    }

  }

  refreshPage = () => {
    window.location.reload();
  }

  render() {
    let correct_One = this.state.green ? "success" : "danger";
    if (this.state.questions.length > this.state.counter) {

      if (this.state.questions[this.state.counter].type === "multiple") {
        this.state.answers = this.state.questions[this.state.counter].incorrect_answers;
        this.state.answers.push(this.state.questions[this.state.counter].correct_answer);
        
        if (!this.state.shuffled) {
          this.setState({ answers: shuffle(this.state.answers) });
          this.setState({ shuffled: true })
        }
      } else {
        this.state.answers = ["True", "False"];
      }
    }


    for (var i = 0; i < this.state.answers.length; i++) {
      this.state.answers[i] = decodeHtml(this.state.answers[i]);
    }
    if (this.state.questions.length === this.state.counter) {
      return (

        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)', textAlign: "center"
        }}>
          <p style={{color: "#ffffff", fontSize: "24px"}}>You've finished!</p>
            <br />
          <p style={{color: "#ffffff", fontSize: "24px"}}>Play again?</p>
            <br />
          <Button onClick={this.refreshPage} variant="primary">Play Again!</Button>
          {/* <button onClick={this.refreshPage}>Play Again</button> */}
        </div>

      );
    }

    if (this.state.questions[this.state.counter].type === "multiple") {
      return (
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: "center"
        }}>
          <p style={{color: "#ffffff", fontSize: "24px"}}>{decodeHtml(this.state.questions[this.state.counter].question)}</p>

          <br />

          {this.state.answers[0] === decodeHtml(this.state.questions[this.state.counter].correct_answer) ?
            <Button onClick={this.showAnswer} variant={correct_One}>{this.state.answers[0]}</Button>
            :
            <Button onClick={this.showAnswer} variant="danger">{this.state.answers[0]}</Button>
          }
          {this.state.answers[1] === decodeHtml(this.state.questions[this.state.counter].correct_answer) ?
            <Button onClick={this.showAnswer} variant={correct_One}>{this.state.answers[1]}</Button>
            :
            <Button onClick={this.showAnswer} variant="danger">{this.state.answers[1]}</Button>
          }
          <br />
          {this.state.answers[2] === decodeHtml(this.state.questions[this.state.counter].correct_answer) ?
            <Button onClick={this.showAnswer} variant={correct_One}>{this.state.answers[2]}</Button>
            :
            <Button onClick={this.showAnswer} variant="danger">{this.state.answers[2]}</Button>
          }
          {this.state.answers[3] === decodeHtml(this.state.questions[this.state.counter].correct_answer) ?
            <Button onClick={this.showAnswer} variant={correct_One}>{this.state.answers[3]}</Button>
            :
            <Button onClick={this.showAnswer} variant="danger">{this.state.answers[3]}</Button>
          }
          {/* <Button variant="danger" onClick={this.showAnswer}>Toggle Answer</Button> */}
          {this.state.revealAnswer ?
            <div>
              <p style={{color: "#ffffff", fontSize: "24px"}}>Answer: {decodeHtml(this.state.questions[this.state.counter].correct_answer)}</p>
              {/* <button onClick={this.nextQuestion}>Next Question</button> */}
              <br />
              <Button variant="primary" onClick={this.nextQuestion}>Next Question</Button>
            </div>

            : null
          }
          <br />

          {/* <button onClick={this.showAnswer}>Toggle Answer</button> */}
        </div>
      );
    } else {

      return (
        <div>

          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: "center"
          }}>
            <p style={{color: "#ffffff", fontSize: "24px"}}>{decodeHtml(this.state.questions[this.state.counter].question)}</p>

            <br />

            {this.state.questions[this.state.counter].correct_answer === "True" ?
              <Button onClick={this.showAnswer} variant={correct_One}>{this.state.answers[0]}</Button>
              :
              <Button onClick={this.showAnswer} variant="danger">{this.state.answers[0]}</Button>
            }
            {this.state.questions[this.state.counter].correct_answer === "False" ?
              <Button onClick={this.showAnswer} variant={correct_One}>{this.state.answers[1]}</Button>
              :
              <Button onClick={this.showAnswer} variant="danger">{this.state.answers[1]}</Button>
            }
            <br />
            {this.state.revealAnswer ?
              <div>
                <p style={{color: "#ffffff", fontSize: "24px"}}>Answer: {decodeHtml(this.state.questions[this.state.counter].correct_answer)}</p>
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
                <p style={{color: "#ffffff", fontSize: "24px"}}>Enter how many questions you want from 1 to 50</p>
                <br />
                <InputGroup className="mb-3">
                  <FormControl value={this.state.numOfQuestions} onChange={this.handleChange}/>
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
