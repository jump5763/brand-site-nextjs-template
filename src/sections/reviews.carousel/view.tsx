"use client";

import { useState } from "react";
export interface ReviewItem {
  id: string;
  name: string;
  comment: string;
  stars: number;
  avatar?: string;
}
export interface ReviewsCarouselProps {
  title: string;
  description: string;
  reviews: readonly ReviewItem[];
}
export function ReviewsCarouselView({
  title,
  description,
  reviews,
}: ReviewsCarouselProps) {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  if (!review) return null;
  return (
    <section
      className="container-site py-16"
      aria-labelledby="reviews-carousel-title"
    >
      <h2 id="reviews-carousel-title" className="t-h2">
        {title}
      </h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <figure className="mt-8 rounded-2xl border border-border bg-card p-6">
        <blockquote className="text-lg">“{review.comment}”</blockquote>
        <figcaption className="mt-4 text-sm text-muted-foreground">
          {review.name} · {"★".repeat(Math.max(0, Math.min(5, review.stars)))}
        </figcaption>
      </figure>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() =>
            setIndex((value) => (value - 1 + reviews.length) % reviews.length)
          }
          className="rounded-full border px-4 py-2"
        >
          Previous
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => setIndex((value) => (value + 1) % reviews.length)}
          className="rounded-full border px-4 py-2"
        >
          Next
        </button>
      </div>
    </section>
  );
}
