<h1>Tabletop Zealots</h1>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Built With](#built-with)
- [Purpose](#purpose)

## Overview

![Tabletop_Zealots](./client/public/images/promotionals/Home_Tabletop_Zealots.png)

Link to website - [Tabletop Zealots](https://board-games-store-kappa.vercel.app/)

Tabletop Zealots is an e-commerce website that "sells" board games/card games. The frontend is built using React, Next.js, Tailwind CSS, Shadcn UI, and is hosted on Vercel. The backend is built using .Net Core 8, Identity and Entity Frameworks, and is hosted on Azure. The e-commerce website has many of the features you typically see in any professional e-commerce website. This includes: having a catalog of products that is easy to navigate with filtering options, a shopping cart that is updated on the fly, a multi-step checkout process, the ability to update their profile settings or delete their account, and a robust payment system.

Things I want to add in the future are: testing with Vitest, a shipping tracker like ShipStation, email and address verification, a global search bar in the navigation bar, and a wishlist or holding items for a certain amount of time.

I continued my learning of Next.js/React and really tried out a lot of cool features. I played with intercepting routes of products, which was neat, but ultimately didn't really provide as much benefit as I was initially thinking it would. There were also charts and a search bar that ended up being cut because the implementation was a performance hit or just didn't provide enough value to justify keeping it. I wanted to keep the website clean and appealing, so I went with a minimalistic approach. I used TailwindCSS and Shadcn UI because of the ease of use and professional looking components. I have limited amount of experience with backend systems, so diving into .Net Core 8 and Azure were very beneficial to understanding how a backend system works in conjunction with a frontend. I used Identity in .Net Core to help with authentication/authorization and Entity to help with mapping to my backend database. The last major hurtle was deploying the backend to Azure. I had to learn how to deploy a .Net Core application to Azure and how to set up the database. This was a huge learning curve and a lot of trial and error on my part. I first decided I wanted to do a docker application, but had troubles getting my Azure to read my AppSettings.json file even though it was being copied over correctly. I ultimately decided to deploy using github actions without docker and it worked a lot better. Overall, I am pleased with the outcome of this project and I am excited to continue to learn and grow as a web developer.

## Built With

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Frontend Hosted on Vercel](https://vercel.com/)
- [.Net Core 8](https://dotnet.microsoft.com/)
- [Backend Hosted on Azure](https://azure.microsoft.com/en-us/)

## Purpose

The purpose of this project was to create a fully functioning e-commerce website that sells board games/card games. The design was to be responsive, user-friendly, visually appealing, and minimalistic.
