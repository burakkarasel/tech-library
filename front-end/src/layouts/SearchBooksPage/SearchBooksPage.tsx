import { useEffect, useState } from "react"
import { BookModel } from "../../models/BookModel"
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/Spinner";
import { SearchBook } from "./components/SearchBook";
import React from "react";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const [categorySelection, setCategorySelection] = useState("Book Category");

    useEffect(() => {
        const fetchBooks = async () => {
            // here we create the URL
            const baseUrl = "http://localhost:8080/api/books"
            let url: string;

            if (searchUrl === "") {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`
            } else {
                url = baseUrl + searchUrl;
            }

            // here we fetch and check if there is any error
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }

            // then we convert the data to JSON
            const responseJson = await response.json()
            // then we parse the books from JSON
            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements)
            setTotalPages(responseJson.page.totalPages)

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
        window.scrollTo(0, 0)
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        if (search === "") {
            setSearchUrl("")
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`)
        }
        setCurrentPage(1)
        setCategorySelection("All")
    }

    const categoryField = (value: string) => {
        if (value.toLowerCase() === "fe" || value.toLocaleLowerCase() == "be" || value.toLowerCase() == "devops" || value.toLowerCase() == "data") {
            setCategorySelection(value)
            setSearchUrl(`/search/findByCategoryContaining?category=${value}&page=0&size=${booksPerPage}`)
        } else {
            setCategorySelection("All");
            setSearchUrl(`?page=0&size=${booksPerPage}`)
        }
        setCurrentPage(1)
    }

    const indexOfLastBook: number = currentPage * booksPerPage
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    const lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search" className="form-control me-2" placeholder="Search" aria-label="Search"
                                    onChange={e => setSearch(e.target.value)} />
                                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {categorySelection}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropDownMenuButton1">
                                    <li onClick={() => categoryField("All")}>
                                        <a href="#" className="dropdown-item">
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField("FE")}>
                                        <a href="#" className="dropdown-item">
                                            Front End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField("BE")}>
                                        <a href="#" className="dropdown-item">
                                            Back End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField("Data")}>
                                        <a href="#" className="dropdown-item">
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField("DevOps")}>
                                        <a href="#" className="dropdown-item">
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalAmountOfBooks})</h5>
                            </div>
                            <p>
                                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                            </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <div className="m-5">
                            <h3>
                                Can't find what you are looking for ?
                            </h3>
                            <a href="#" type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white ">
                                Library Services
                            </a>
                        </div>
                    }


                    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
                </div>
            </div>
        </div>
    )
}