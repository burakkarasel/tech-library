import ReviewModel from "../../models/ReviewModel";
import React from "react";
import { StarsReview } from "./StarsReview";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {
    const date = new Date(props.review.date)

    // getting date details to create the date
    const longMonth = date.toLocaleString("en-us", { month: "long" })
    const dateDay = date.getDate()
    const dateYear = date.getFullYear()

    // creating a date to render as the way we want
    const dateRender = `${longMonth} ${dateDay} ${dateYear}`

    return (
        <div>
            <div className="col-sm-8 col-md-8">
                <h5>
                    {props.review.userEmail}
                </h5>
                <div className="row">
                    <div className="col">
                        {dateRender}
                    </div>
                    <div className="col">
                        <StarsReview rating={props.review.rating} size={16} />
                    </div>
                    <div className="mt-2">
                        <p>
                            {props.review.reviewDescription}
                        </p>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
} 