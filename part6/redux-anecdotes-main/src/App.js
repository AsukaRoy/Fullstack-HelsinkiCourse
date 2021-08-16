import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
        <AnecdoteList />
      
      <h2>Creating New</h2>
        <AnecdoteForm />
    </div>
  );
};