import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ReviewSection({ equipmentId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    API.get(`/review/${equipmentId}`).then(res => setReviews(res.data));
  }, []);

  const submitReview = async () => {
    await API.post("/review", {
      equipmentId,
      rating,
      comment,
    });

    alert("Review added");
  };

  return (
    <div>
      <h3>Reviews</h3>

      {reviews.map(r => (
        <p key={r._id}>{r.comment} ⭐{r.rating}</p>
      ))}

      <input onChange={e => setComment(e.target.value)} />
      <button onClick={submitReview}>Submit</button>
    </div>
  );
}