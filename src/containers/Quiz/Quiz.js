import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {
  fetchQuiz,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz';

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id);
  }

  componentWillUnmount(){
    this.props.retryQuiz();
  }

  render() {    
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на вопросы</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    quiz: state.quiz.quiz,
  };
}

function mapDispatchToProsp(dispatch) {
  return {
    fetchQuiz: (id) => dispatch(fetchQuiz(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProsp)(Quiz);
