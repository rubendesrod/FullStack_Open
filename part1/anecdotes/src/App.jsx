import { useState } from "react";

const Button = ({ event, text }) => {
  return (
    <>
      <button onClick={event}>{text}</button>
    </>
  );
};

const AnecdoteMaxVote = ({ votes, anecdotes }) => {
  const { maxAnecdote, maxVotes } = anecdotes.reduce(
    (acc, anecdote, index) => {
      if (votes[index] > acc.maxVotes) {
        return { maxAnecdote: anecdote, maxVotes: votes[index] };
      }
      return acc;
    },
    { maxAnecdote: "", maxVotes: 0 }
  );

  if (maxVotes === 0) {
    return (
      <p>
        <strong>There is no more voted anecdote</strong>
      </p>
    );
  }

  return (
    <div>
      <p>{maxAnecdote}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const points = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);

  const handleNext = () => {
    if (selected === anecdotes.length - 1) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>votes {votes[selected]}</div>
      <div>
        <Button event={handleVote} text={"vote"} />
        <Button event={handleNext} text={"next anecdote"} />
      </div>
      <h1>Anecdote with most votes</h1>
      <AnecdoteMaxVote votes={votes} anecdotes={anecdotes} />
    </>
  );
};

export default App;
