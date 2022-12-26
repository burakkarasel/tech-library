import React, { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/Spinner";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {

    // Book States
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review States
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

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


    useEffect(() => {
        const fetchBookReviews = async () => {
            // first we create the request URL
            const reviewUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

            // then we make the request
            const responseReviews = await fetch(reviewUrl);

            // if the request is not success we throw error
            if (!responseReviews.ok) {
                throw new Error("Something went wrong!");
            }

            // otherwise we convert response data to json
            const responseJsonReviews = await responseReviews.json();

            // then we capture the response data
            const responseData = responseJsonReviews._embedded.reviews;

            // we create a new array for the response data
            const loadedReviews: ReviewModel[] = [];

            // then we create a star review variable
            let weightedStarReviews: number = 0;

            // then we loop through response data to keep reviews and stars
            for (const key in responseData) {
                loadedReviews.push(new ReviewModel(
                    responseData[key].id,
                    responseData[key].userEmail,
                    responseData[key].date,
                    responseData[key].rating,
                    responseData[key].bookId,
                    responseData[key].reviewDescription
                ));
                weightedStarReviews += responseData[key].rating;
            }

            // if there is any reviews we calculate the average of stars
            if (loadedReviews) {
                const round = (Math.round(weightedStarReviews / loadedReviews.length * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);

            setIsLoadingReviews(false);
        }

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReviews(false);
            setHttpError(error.message);
        })
    }, []);



    // if data is loading we return loading screen
    if (isLoading || isLoadingReviews) {
        return (
            <SpinnerLoading />
        )
    }

    // if httpError is not null we return an error screen
    if (httpError) {
        return (
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        )
    }

    // if book is undefined we return an error screen
    if (book === undefined) {
        return (
            <div className="container m-5">
                <p>
                    Book Not Found!
                </p>
            </div>
        )
    }

    // if no reviews available we return an error screen
    if (reviews.length === 0) {
        return (
            <div className="container m-5">
                <p>
                    No reviews available!
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
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book.id} mobile={false} />
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
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
                <LatestReviews reviews={reviews} bookId={book.id} mobile={true} />
            </div>
        </div>
    );
}