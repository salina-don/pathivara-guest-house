export const siteConfig = {
  name: "Pathivara Guest House",
  tagline: "Simple, clean rooms in Bhaisepati, Lalitpur",
  description:
    "Affordable rooms just 2 minutes from the EPS Exam Center in Bhaisepati, Saibu, Lalitpur. Ideal for EPS test candidates. Call us to check availability.",
  url: "https://pathivaraguesthouse.com",
  location: {
    address: "Bhaisepati, Saibu",
    city: "Lalitpur-25",
    country: "Nepal",
    landmark: "2 min from EPS Exam Center",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=Bhaisepati+Saibu+Lalitpur+Nepal&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  contact: {
    phones: [
      { display: "9803593554", tel: "tel:+9779803593554" },
      { display: "9860206398", tel: "tel:+9779860206398" },
      { display: "9863455081", tel: "tel:+9779863455081" },
    ],
    checkIn: "12:00",
    checkOut: "11:00",
  },
};

export type Room = {
  id: string;
  name: string;
  bedCount: number;
  hasBathroom: boolean;
  pricePerNight: number;
  note?: string;
  image: string;
};

export const rooms: Room[] = [
  {
    id: "room-23",
    name: "Room 23",
    bedCount: 2,
    hasBathroom: true,
    pricePerNight: 1500,
    image: "/rooms/room-a.jpg",
  },
  {
    id: "room-24",
    name: "Room 24",
    bedCount: 2,
    hasBathroom: true,
    pricePerNight: 1500,
    image: "/rooms/room-b.jpg",
  },
  {
    id: "room-22",
    name: "Room 22",
    bedCount: 2,
    hasBathroom: false,
    pricePerNight: 1000,
    image: "/rooms/room-c.jpg",
  },
  {
    id: "room-25",
    name: "Room 25",
    bedCount: 2,
    hasBathroom: false,
    pricePerNight: 1000,
    image: "/rooms/room-d.jpg",
  },
  {
    id: "room-26",
    name: "Room 26",
    bedCount: 4,
    hasBathroom: false,
    pricePerNight: 1000,
    note: "Fits up to 4 people",
    image: "/rooms/room-e.jpg",
  },
];
