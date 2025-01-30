import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { StarIcon } from 'lucide-react';
import { client } from '@/sanity/lib/client';

interface Review {
  _type: 'review';
  name: string;
  review: string;
  rating: number;
}

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="text-3xl"
          >
            <StarIcon
              className="w-8 h-8"
              fill={starValue <= (hover || rating) ? 'yellow' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Load reviews and user from localStorage on component mount
  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    const storedUser = localStorage.getItem('currentUser');

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }

    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !review || rating === 0) {
      alert('Please fill in all fields and provide a rating.');
      return;
    }

    const doc: Review = {
      _type: 'review',
      name,
      review,
      rating,
    };

    try {
      await client.create(doc);

      const updatedReviews = [...reviews, doc];
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));

      // Store the user's name in localStorage so they can delete their own reviews
      localStorage.setItem('currentUser', name);
      setCurrentUser(name);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setName('');
      setReview('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDelete = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  return (
    <div className="w-full sm:w-[570px] mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8 mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Leave a Review</h2>
        {submitted ? (
          <p className="text-green-600 font-medium text-lg">Thank you for your review!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium text-lg">
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="review" className="block text-gray-700 font-medium text-lg">
                Your Review:
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
                required
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <p className="text-gray-700 font-bold mb-4 text-xl">Rating:</p>
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-5 rounded-lg text-lg hover:bg-blue-600 transition"
            >
              Submit Review
            </button>
          </form>
        )}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Reviews</h3>
          {reviews.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {reviews.map((rev, index) => (
                <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg">
                  <div className="flex items-center gap-5">
                    <p className="font-semibold text-lg">{rev.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          fill={i < rev.rating ? 'yellow' : 'none'}
                          className="w-6 h-6"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">{rev.review}</p>

                  {/* Show delete button only if the current user matches the review's name */}
                  {currentUser === rev.name && (
                    <button
                      onClick={() => handleDelete(index)}
                      className="mt-2 text-red-500 hover:text-red-700 transition"
                    >
                      Delete Review
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 my-8 text-lg">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
