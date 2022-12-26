class ReviewModel {
    id : number;
    userEmail : string;
    date : string;
    rating : number;
    bookId : number;
    reviewDescription : string;

    constructor(_id : number, _userEmail : string, _date : string, _rating : number, _bookId : number, _reviewDescription : string){
        this.id = _id;
        this.userEmail = _userEmail;
        this.date = _date;
        this.rating = _rating;
        this.bookId = _bookId;
        this.reviewDescription = _reviewDescription;
    }
}

export default ReviewModel;