import React from "react"
import { BookModel } from "../../../models/BookModel"

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {/* we check if img is available or not*/}
                {props.book.img ?
                    <img src={props.book.img} alt="book" width="151" height="233" />
                    :
                    <img src={require("./../../../images/BooksImages/book-luv2code-1000.png")} alt="book" width="151" height="233" />
                }
                <h6 className="mt-2">{props.book.title}</h6>
                <p>{props.book.author || "Anonymous"}</p>
                <a href="#" className="btn main-color text-white">Reserve</a>
            </div>
        </div>
    )
}