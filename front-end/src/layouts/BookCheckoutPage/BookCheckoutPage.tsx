import React, { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/Spinner";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const bookId = (window.location.pathname).split("/")[2];

    useEffect(() => {
        const fetchBooks = async () => {
            // here we create the URL
            const baseUrl = `http://localhost:8080/api/books/${bookId}`

            // here we fetch and check if there is any error
            const response = await fetch(baseUrl)
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }

            // then we convert the data to JSON
            const responseJson = await response.json()
            // then we parse the books from JSON

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };

            // then we set the books to the array we created and we set isLoading to false
            setBook(loadedBook)
            setIsLoading(false)
        }
        fetchBooks().catch((error: any) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, []);

    // if data is loading we return loading screen
    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    // if httpError is not null we return an error screen
    if (httpError || book === undefined) {
        return (
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        )
    }

    return (
        <div >
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book.img
                            ?
                            <img src={book.img} alt="book" width="226" height="349" />
                            :
                            <img src={require("./../../images/BooksImages/book-luv2code-1000.png")} alt="book" width="226" height="349" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book.title}</h2>
                            <h5 className="text-primary">{book.author}</h5>
                            <p className="lead">{book.description}</p>
                            <StarsReview rating={4} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book.img
                        ?
                        <img src={book.img} alt="book" width="226" height="349" />
                        :
                        <img src={require("./../../images/BooksImages/book-luv2code-1000.png")} alt="book" width="226" height="349" />
                    }
                </div>
                <div className="mt-4 ">
                    <div className="ml-2">
                        <h2>{book.title}</h2>
                        <h5 className="text-primary">{book.author}</h5>
                        <p className="lead">${book.description}</p>
                        <StarsReview rating={4} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
            </div>
        </div>
    );
}