"use client";

// import { ADD_ALERT, REMOVE_ALERT } from "../actionTypes/alertActions";

export type blogProp = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  content: string;
  img_url: string;
  comments: string[];
}[];

const initialState: blogProp = [
  {
    id: 1,
    title: "Delicious Spaghetti Carbonara",
    date: "September 5, 2023",
    tags: ["Italian", "Pasta", "Comfort Food"],
    content:
      "Spaghetti Carbonara is a classic Italian pasta dish that combines perfectly cooked spaghetti with a creamy egg and cheese sauce, pancetta, and black pepper. The result is a rich, indulgent dish that's surprisingly easy to make.",
    img_url:
      "https://images.pexels.com/photos/1373915/pexels-photo-1373915.jpeg?auto=compress&cs=tinysrgb&w=600",
    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 2,
    title: "Homemade Margherita Pizza",
    date: "August 20, 2023",
    tags: ["Italian", "Pizza", "Homemade"],
    content:
      "Margherita pizza is a timeless favorite with its simple yet satisfying combination of tomato sauce, fresh mozzarella cheese, basil leaves, and a drizzle of olive oil. Making it at home allows you to savor the authentic flavors.",
    img_url:
      "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 3,
    title: "Classic Beef Stew",
    date: "July 15, 2023",
    tags: ["Comfort Food", "Stew", "Beef"],
    content:
      "Beef stew is the ultimate comfort food, featuring tender pieces of beef simmered with carrots, potatoes, and onions in a savory broth. It's a hearty and satisfying meal for any occasion.",
    img_url:
      "https://images.pexels.com/photos/16976666/pexels-photo-16976666/free-photo-of-meat-dish-in-a-metal-pan.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 4,
    title: "Refreshing Caprese Salad",
    date: "June 10, 2023",
    tags: ["Italian", "Salad", "Appetizer"],
    content:
      "Caprese salad is a light and refreshing appetizer that combines ripe tomatoes, fresh mozzarella, basil leaves, and a drizzle of balsamic glaze. It's a perfect choice for a summer day.",
    img_url:
      "https://images.pexels.com/photos/8120002/pexels-photo-8120002.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 5,
    title: "Savory Chicken Alfredo",
    date: "May 25, 2023",
    tags: ["Italian", "Pasta", "Chicken"],
    content:
      "Chicken Alfredo is a creamy pasta dish featuring tender pieces of chicken breast, fettuccine noodles, and a rich Alfredo sauce made with butter, cream, and Parmesan cheese.",
    img_url:
      "https://images.pexels.com/photos/18363397/pexels-photo-18363397/free-photo-of-roast-chicken-with-hummus-and-spinach-salad.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 6,
    title: "Fluffy Pancakes with Maple Syrup",
    date: "April 8, 2023",
    tags: ["Breakfast", "Pancakes", "Maple Syrup"],
    content:
      "Start your day right with these fluffy pancakes served with a generous drizzle of maple syrup. They are easy to make and perfect for a cozy breakfast.",
    img_url:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 7,
    title: "Homemade Guacamole",
    date: "March 19, 2023",
    tags: ["Mexican", "Dip", "Avocado"],
    content:
      "Guacamole is a popular Mexican dip made with ripe avocados, tomatoes, onions, cilantro, lime juice, and spices. It's a versatile condiment that pairs well with tortilla chips or as a topping for tacos.",
    img_url:
      "https://images.pexels.com/photos/1321942/pexels-photo-1321942.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 8,
    title: "Classic Chocolate Chip Cookies",
    date: "February 3, 2023",
    tags: ["Dessert", "Cookies", "Chocolate"],
    content:
      "Indulge in the timeless goodness of classic chocolate chip cookies. These cookies are soft, chewy, and loaded with chocolate chips, making them a favorite for all ages.",
    img_url:
      "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 9,
    title: "Creamy Tomato Basil Soup",
    date: "January 12, 2023",
    tags: ["Soup", "Tomato", "Comfort Food"],
    content:
      "Warm up with a bowl of creamy tomato basil soup. This comforting soup combines ripe tomatoes, fresh basil, and cream for a soothing and flavorful experience.",
    img_url:
      "https://images.pexels.com/photos/3493579/pexels-photo-3493579.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 10,
    title: "Garlic Butter Shrimp Pasta",
    date: "December 7, 2022",
    tags: ["Italian", "Pasta", "Seafood"],
    content:
      "Garlic butter shrimp pasta is a delightful Italian dish featuring succulent shrimp, linguine noodles, and a luscious garlic butter sauce with hints of lemon and parsley.",
    img_url:
      "https://images.pexels.com/photos/16068658/pexels-photo-16068658/free-photo-of-food-wood-restaurant-dinner.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 11,
    title: "Homemade Sushi Rolls",
    date: "November 18, 2022",
    tags: ["Japanese", "Sushi", "Homemade"],
    content:
      "Learn to make homemade sushi rolls with fresh ingredients like sushi rice, nori seaweed, and your choice of fillings, from avocado and cucumber to salmon and tuna.",
    img_url:
      "https://images.pexels.com/photos/8951202/pexels-photo-8951202.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 12,
    title: "Spicy Thai Green Curry",
    date: "October 29, 2022",
    tags: ["Thai", "Curry", "Spicy"],
    content:
      "Spicy Thai green curry is a vibrant and aromatic dish featuring tender chicken, green curry paste, coconut milk, and an assortment of vegetables. It's a burst of flavors in every bite.",
    img_url:
      "https://images.pexels.com/photos/10247492/pexels-photo-10247492.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 13,
    title: "Baked Macaroni and Cheese",
    date: "September 14, 2022",
    tags: ["Comfort Food", "Cheese", "Baked"],
    content:
      "Baked macaroni and cheese is the epitome of comfort food. This creamy and cheesy dish, topped with a golden breadcrumb crust, is a favorite for kids and adults alike.",
    img_url:
      "https://images.pexels.com/photos/8027652/pexels-photo-8027652.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
  {
    id: 14,
    title: "Refreshing Watermelon Salad",
    date: "August 26, 2022",
    tags: ["Salad", "Summer", "Fruit"],
    content:
      "Stay refreshed with a watermelon salad featuring juicy watermelon chunks, feta cheese, fresh mint, and a drizzle of balsamic glaze. It's a perfect summer salad bursting with flavor.",
    img_url:
      "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=600",

    comments: [
      "What a wonderfull article, keep it up",
      "I still have questions tho",
      "what can we do about the frying aspect",
    ],
  },
];

const getBlogByID = (state: blogProp, id: number) => {
  return state.find((blog) => blog.id === id);
};

import { createSlice } from "@reduxjs/toolkit";

// Create a slice for the blog data
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      const newId = state.length + 1;
      const newBlog = { ...action.payload, id: newId };
      state.push(newBlog);
    },
    updateBlog: (state, action) => {
      const { id, blogEdit } = action.payload;
      const blog = getBlogByID(state, id);
      if (blog) {
        Object.assign(blog, blogEdit);
      }
    },
    deleteBlog: (state, action) => {
      const idToDelete = action.payload;
      const indexToDelete = state.findIndex((blog) => blog.id === idToDelete);
      if (indexToDelete !== -1) {
        state.splice(indexToDelete, 1);
      }
    },
    commentBlog: (state, action) => {
      const { id, comment } = action.payload;
      const blog = getBlogByID(state, id);
      if (blog) {
        blog.comments.push(comment);
      }
    },
    clearBlogs: (state) => {
      state.length = 0;
    },
  },
});

export const { addBlog, updateBlog, deleteBlog, commentBlog, clearBlogs } =
  blogSlice.actions;

export default blogSlice.reducer;
