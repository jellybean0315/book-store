import React from 'react';
import './App.css';
import Books from './features/books/books';
import AddBook from "./features/books/add-book";
import styled from "styled-components";

const TitleHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`
function App() {
  return (
    <>
        <TitleHeader>Books <AddBook /></TitleHeader>
        <Books />
    </>
  );
}

export default App;
