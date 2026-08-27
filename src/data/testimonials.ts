export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Ahmed",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    review: "Lina Store has completely changed how I do grocery shopping. The produce is always incredibly fresh — my avocados arrived perfectly ripe and the berries were sweet. I won't go back to the supermarket.",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "James Wilson",
    location: "Chicago, IL",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    review: "The quality of the meat and fish is exceptional. I ordered salmon fillets and chicken breast last week — both were fresh, well-packed, and arrived on time. The prices are fair too, which is a bonus.",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Emily Carter",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    review: "I love the variety of organic options! The baby spinach and sweet potatoes are my weekly staples now. The packaging is also eco-friendly, which I really appreciate. Highly recommend Lina Store.",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "Daniel Smith",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    rating: 4,
    review: "The sourdough bread and croissants are absolutely delicious — bakery quality but delivered to my door. Freshness is real. My only wish is more gluten-free bakery options. Overall, brilliant service.",
    date: "2 months ago",
  },
  {
    id: "5",
    name: "Priya Sharma",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    review: "I've tried many grocery delivery services and Lina Store stands out. The website is beautiful to use, the selection is wonderful, and every order has been perfect. The raw honey is life-changing!",
    date: "1 week ago",
  },
];
