# React Coffee Shop Website

## Production Demo 

### Link
[Coffee Shop Website](https://react-coffee-shop.vercel.app)

### Screenshots

## Description

### Website Description
A website where people can order a list of coffee drinks to go from a coffee shop.
Users can order coffee to go using their account or order as a guest.

### Project Description

#### Goal
The puropose for this project was to show the ability to use the tools mentioned below and implement the features 
shown below. Another purpose was to have experience with the Javascript frameworks and libraries I have learned. 
With these tools I was able to create a responsive website that communicates with the 
backend to fetch and store: cart sessions, available drinks, orders, and registered users. I decided to create a 
coffee shop website since drinking and making espressos is one of my favorite morning habits. 

#### Development Process
The database used in this project is MongoDB. Originally the drinks and cart sessions were in Firebase, but I wanted
more experience working with MongoDB. I also originally started with just ReactJS, but then decided to create a full 
stack project with NextJS. With NextJS, it was easy to port the project onto Vercel for production and implement 
serverless functions.

The features mentioned below started as to do features that I wanted to implement (Please see my previous commits to see 
how that process went through). I started out with a project I did partially guided by 
[Maximilian](https://github.com/maxschwarzmueller)'s React course in the project named 
[Food Order Page](guide-code/tree/17-practice-food-order-http-forms). The first page I had was the menu page and then 
moved to the home page, the authentication page, and finally the account page. Each of those pages have multiple 
React components and CSS modules for the styling.

Each time I finished a page, I move to debugging and checked how many times a component rendered to make sure I was not 
making unesseccary renders, and if so, I would try to change my component structure first and then use React's hooks 
like Callback, React.memo, and useMemo. I also checked how many times the backend server was called and restructured my 
code to minimize server calls, like using Vercel's SWR hook for data caching.


### Tools
* **Javascript** and **NodeJS**
* **CSS** modules
* **ReactJS** component framework
* **NextJS** fullstack/production framework
* **MongoDB** database
* **NextAuth** user authentication
* **Redux** state managment
* **bcryptjs** cryptography
* **Framer Motion** animation
* **Vercel** hosting

### Features
The following features are in check list order due to they were to do to lists but are now completed, hence the 
checkmarks.

- [x] Ported to NextJs
- [x] React Context states to Redux State
- [x] Page animation using framer motion
- [x] Menu list animation using framer motion
- [x] Cart Button animation when cart item was added/removed using framer motion
- [x] Drop list amount for a drink item 
- [x] Modal animation using framer motion
- [x] Drink items in cart animation using framer motion
- [x] Loading Animation
- [x] Cart button animation on hover
- [x] Empty Cart Button when viewing cart
- [x] Remove item completely from list with trash icon as button when viewing cart
- [x] Underline current page in navigation bar
- [x] Backend connection using MongoDB for orders, drinks, and previous cart sessions
- [x] Status message display orders if it is successfull, invalid, or server error occurred
- [x] Enviornmental Variables to use for MongoDB credentials
- [x] Form validation at the front-end and back-end
- [x] Welcome and Menu Pages
- [x] Drink images in drink list using NextJS Image
- [x] CSS rework
- [x] Mobile compatible
- [x] Icons: tab and bookmark
- [x] Create accounts (Authentication)
- [x] Status message display for sign in or creating an account if it is successfull, invalid input, or server error
- [x] Change account password
- [x] Status message display for changing a password if it is successfull, invalid input, or server error occurred
- [x] Home page greeting to signed in user
- [x] Password hashing to store in MongoDB using bcryptjs
- [x] Orders created from guests or sessions
- [x] API routes protected (unauthorized users)
- [x] Hover on picture shows the source/link to the original source
- [x] User is asked to checkout as guest/sign in if they are not already signed in
- [x] MongoDB Vercel optimization
- [x] Cart sessions from user sessions stored in the server
- [x] Cart sessions from guest sessions stored in the browser's local storage
- [x] Cart session saved in authenticated user database if logged in after saving cart items while in guest session
- [x] Reciept after checkout
- [x] Past Order History from the profile page
- [x] Past Order animation using framer motion

### File Structure
