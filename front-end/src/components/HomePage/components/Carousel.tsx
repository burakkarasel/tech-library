import { ReturnBook } from "./ReturnBook"
import { useEffect, useState } from "react"
import { BookModel } from "../../../models/BookModel"
import { SpinnerLoading } from "../../../layouts/Utils/Spinner"

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            // here we create the URL
            const baseUrl = "http://localhost:8080/api/books"
            const url = `${baseUrl}?page=0&size=9`

            // here we fetch and check if there is any error
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }

            // then we convert the data to JSON
            const responseJson = await response.json()
            // then we parse the books from JSON
            const responseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] = []

            // then we use a for loop in response data to create new book objects
            for (const key in responseData) {
                loadedBooks.push(new BookModel(
                    responseData[key].id,
                    responseData[key].title,
                    responseData[key].author,
                    responseData[key].description,
                    responseData[key].copies,
                    responseData[key].copiesAvailable,
                    responseData[key].category,
                    responseData[key].img
                ))
            }
            // then we set the books to the array we created and we set isLoading to false
            setBooks(loadedBooks)
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
    if (httpError) {
        return (
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        )
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carouse-title text-center">
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval="false">
                {/* Desktop */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(0, 3).map((book) => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(3, 6).map((book) => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(6).map((book) => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBook book={books[7]} key={books[7].id} />
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <a href="#" type="button" className="btn btn-outline-secondary btn-lg">View More</a>
            </div>
        </div>
    )
}