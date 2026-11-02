export interface OfferItem {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  validTill: string;
  createdAt?: string;
}

export const offersData: OfferItem[] = [
  {
    "id": "offer-1",
    "title": "Weekend Burger & Shake Combo Fest",
    "description": "Order any Chicken Crunch Burger and get 50% off on your favorite Signature Milkshake. Valid on dine-in and takeaways.",
    "image": "/images/items/cafe-combo-meal.webp",
    "badge": "50% OFF SHAKE",
    "validTill": "Valid on Saturdays & Sundays",
    "createdAt": "2026-11-02T14:50:16.760Z"
  },
  {
    "id": "offer-2",
    "title": "Cooler Hours: Refreshers & Mojitos BOGO",
    "description": "Beat the heat! Buy any 2 Mojitos or Refreshers and get the 3rd one on the house between 3:00 PM and 7:00 PM.",
    "image": "/images/items/blue-lagoon-mojito.webp",
    "badge": "BUY 2 GET 1",
    "validTill": "Daily 3:00 PM - 7:00 PM",
    "createdAt": "2026-11-02T14:50:16.763Z"
  }
];
