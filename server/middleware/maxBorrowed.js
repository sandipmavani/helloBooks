import { User, Book } from '../models';
import { maximumBorrrow } from '../helpers/borrowingLimits';

/**
 * check if user should be allowed to borrow a new book
 * @param  {Object}   req  express http request object
 * @param  {Object}   res  express http response object
 * @param  {Function} next calls the next middleware function in the stack
 * @return {Undefined}     responds with an http response or calls the next
 * middleware function
 */
const shouldBorrow = (req, res, next) => {
  User.findOne({
    where: { id: req.user.id },
    include: [{ model: Book }]
  })
    .then((user) => {
      const unreturnedBooks = user.Books.filter(
        book => book.BorrowedBook.returned === false
      );
      let canBorrow;
      switch (user.membershipType) {
        case 'bronze':
          canBorrow = unreturnedBooks.length <= maximumBorrrow.bronze;
          break;
        case 'silver':
          canBorrow = unreturnedBooks.length <= maximumBorrrow.silver;
          break;
        case 'gold':
          canBorrow = unreturnedBooks.length <= maximumBorrrow.gold;
          break;
        default:
          canBorrow = false;
      }
      if (canBorrow) next();
      else {
        res.status(403).send({
          success: false,
          message: `You have reached your borrowing limit.
            Return some books or upgrade your account type to borrow more`,
        });
      }
    });
};

export default shouldBorrow;