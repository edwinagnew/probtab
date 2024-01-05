import React, { Component } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';

export class QuizBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      showResult: false,
      showError: false,
    };
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleNextQuestion = () => {
    const { selectedOption } = this.state;
    const { answer } = this.props;
    this.setState({ showResult: true });
  };

  resetQuiz = () => {
    this.setState({ selectedOption: '', showResult: false });
  };

  render() {
    const { question, options, answer } = this.props;
    const { selectedOption, showResult, showError } = this.state;

    return (
<Card>
        <Card.Body>
        <h3>Quiz Time!</h3>
          {showResult ? (
            <div>
              {selectedOption === answer ? (
                <Alert variant="success">Correct!</Alert>
              ) : (
                <Alert variant="danger">Incorrect answer, please try again!</Alert>
              )}
              <Button onClick={this.resetQuiz}>Try Again</Button>
            </div>
          ) : (
            <div>
              <p>{question}</p>
              <Form>
                {options.map((option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`option${index}`}
                    label={option}
                    name="options"
                    value={option}
                    checked={selectedOption === option}
                    onChange={this.handleOptionChange}
                  />
                ))}
              </Form>
              <Button onClick={this.handleNextQuestion}>Check Answer</Button>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}