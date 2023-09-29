import React from 'react';
import { useSelector } from "react-redux";
import BookCard, { BookInfo } from "./book-card";
import styled from "styled-components";

const BooksContainer = styled.div`
    display: flex;
    margin: 20px;
    flex-wrap: wrap;

    .book-card {
      margin-right: 20px;
      margin-top: 5px;
    }
`;
const Books = () => {
    const books: BookInfo[] = useSelector((state: any) => state.books);

    if (books.length === 0) {
        return <span>Nothing to show.</span>
    }
    return (
        <BooksContainer>
            {books.map((b: BookInfo) => <BookCard key={b.id} book={b} />)}
        </BooksContainer>
    );
};

export default Books;