# React Coffee Shop Website

## Table of Contents

- [Production Demo](#production-demo)
  - [Live Demo](#live-demo)
  - [Previews](#previews)
    - [Desktop Preview](#desktop-preview)
    - [Mobile Preview](#mobile-preview)
- [Description](#description)
  - [Website Description](#website-description)
  - [Project Description](#project-description)
    - [Goal](#goal)
    - [Development Process](#development-process)
  - [Tools](#tools)
- [Usage](#usage)
- [Features](#features)
- [Performance](#performance)
- [File Structure](#file-structure)

## Production Demo

### Live Demo

[Coffee Shop Website](https://react-coffee-shop.vercel.app)

### Previews

#### Desktop Preview

![Desktop Preview](/assets/desktopPreview.gif)

#### Mobile Preview

![Mobile Preview](/assets/mobilePreview.gif)

## Description

### Website Description

A website where people can order coffee drinks to go from a coffee shop. Users can order coffee as a guest or use
their created account. Authenticated users can also view their previous orders.

### Project Description

#### Goal

The goal of this project was to show the ability to use the tools mentioned [below](#tools) and implement the
features also shown [below](#features). Another goal was to have experience with the Javascript frameworks and
libraries I had learned. With these tools, I created a responsive website that communicates with the backend to fetch
and store: cart sessions, available drinks, orders, and registered users. My decision to create a coffee shop website
is due to my favorite morning hobby of drinking espresso drinks and making them.

#### Development Process

The database used in this project is MongoDB. Originally the drinks and cart sessions were in Firebase, but I wanted
more experience working with MongoDB. I also started with only ReactJS, but then decided to create a full-stack project
with NextJS. With NextJS, it was easy to host the project on Vercel for production and implement serverless functions.

The features mentioned below started as to do features I wanted to implement (Please see my previous commits to see
how that process went through). I started out with a project I did partially guided by
[Maximilian](https://github.com/maxschwarzmueller)'s React course in the project named
[Food Order Page](https://github.com/academind/react-complete-guide-code/tree/17-practice-food-order-http-forms).
The first page I had was the menu page, then the home page, then the authentication page, and finally the account page.
These four pages have multiple React components
and CSS modules for the styling.

Each time I finished a page, I move to debug and checked how many times a component rendered to make sure I was not
making unnecessary renders, and if so, I would try to change my component structure first and then use React’s hooks
like Callback, React.memo, and useMemo. I also checked how many times the backend server was called and restructured my
code to minimize server calls, like using Vercel’s SWR hook for data caching.

### Tools

- **Typescript** and **NodeJS**
- **CSS** modules
- [**ReactJS**](https://reactjs.org) component framework
- [**NextJS**](https://nextjs.org) fullstack/production framework
- [**MongoDB**](https://www.mongodb.com) database
- [**NextAuth**](https://next-auth.js.org) user authentication
- [**Redux**](https://redux.js.org) state management
- [**bcryptjs**](https://github.com/dcodeIO/bcrypt.js) cryptography
- [**Framer Motion**](https://www.framer.com/motion/) animation
- [**Vercel**](https://vercel.com) hosting

## Usage

Click the website link [above](#live-demo) to try out the project. Try out on your phone too to experience the mobile
layout. Use the app as a registered user or a guest user. If you do not want to create an account, then try the
following demo account porvided for you:

demo@gmail.com

1234567

## Features

The following features are in check list order due to they were to do to lists but are now completed, hence the
checkmark.

- [x] Ported to NextJS
- [x] React Context states to Redux State
- [x] Page animation using framer motion
- [x] Menu list animation using framer motion
- [x] Cart Button animation when cart item was added/removed using framer motion
- [x] Droplist amount for a drink item
- [x] Modal animation using framer motion
- [x] Drink items in cart animation using framer motion
- [x] Loading Animation
- [x] Cart button animation on hover
- [x] Empty Cart Button when viewing the cart module
- [x] Remove item completely from the list with trash icon as button when viewing cart
- [x] Underline the current page in the navigation bar
- [x] Backend connection using MongoDB for orders, drinks, and previous cart sessions
- [x] Status message display orders if it is successful, invalid, or a server error occurred
- [x] Environmental Variables to use for MongoDB credentials
- [x] Form validation at the front-end and back-end
- [x] Welcome and Menu Pages
- [x] Drink images in the drink list using NextJS Image
- [x] CSS rework
- [x] Mobile compatible
- [x] Icons: tab and bookmark
- [x] Create accounts (Authentication)
- [x] Display status message for signing or creating an account if it is successful, invalid input, or a server error
      occurred
- [x] Status message display for sign in or creating an account if it is successful, invalid input, or server error
- [x] Change account password
- [x] Status message display for changing a password if it is successful, invalid input, or server error occurred
- [x] Greet signed in user in the home page
- [x] Password hashing to store in MongoDB using bcryptjs
- [x] Orders created from guests or sessions
- [x] API routes protected (unauthorized users)
- [x] Hovering on pictures shows the source/link to the source
- [x] User is asked to checkout as guest/sign in if they are not already signed in
- [x] MongoDB Vercel optimization
- [x] Cart sessions from user sessions stored in the server
- [x] Cart sessions from guest sessions stored in the browser's local storage
- [x] Cart session saved in authenticated user database if logged in after saving cart items while in guest session
- [x] Receipt after checkout
- [x] Past Order History from the profile page
- [x] Past Order animation using framer motion
- [x] React 18 Migration
- [x] Typescript Migration
- [x] Redesigned mobile Navigation Bar for easier access for mobile users
- [ ] Store JWT in Cookie as recommended by JWT instead of local storage
- [ ] Next.js 13 Migration
- [ ] Validate emails using a 3rd party library
- [ ] Checkmark/button acceptance that no order is actually placed

## Performance

- Decrease about 10% the bundle size from v2.0 to 2.1
  ![2.0 Screenshot](/assets/v2.0.png)
  ![2.1 Screenshot](/assets/v2.1.png)
  ![2.3 Screenshot](/assets/v2.3.png)

- Increase content loading times

Screenshot from Vercel using [Checkly](https://vercel.com/integrations/checkly) integration
![Performance Screenshot](/assets/performance.png)

## File Structure

```bash
react-coffee-shop
├── __tests__/
├── assets/
│   ├── coffee-drinks.jpg
│   ├── coffee-shop.jpg
│   ├── coffeeLove.jpg
│   ├── coffeeWhiteBackground.jpg
│   ├── desktopPreview.gif
│   ├── mobilePreview.gif
│   ├── performance.png
│   ├── source.txt
├── components/
│   ├── Auth/
│   │   ├── AuthForm.module.css
│   │   ├── AuthForm.tsx
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   ├── Cart/
│   │   ├── Cart.module.css
│   │   ├── Cart.tsx
│   │   ├── CartContent.module.css
│   │   ├── CartContent.tsx
│   │   ├── CartItem/
│   │   │   ├── CartItem.module.css
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartItemList.module.css
│   │   │   └── CartItemList.tsx
│   │   └── Checkout/
│   │       ├── Checkout.module.css
│   │       ├── Checkout.tsx
│   │       ├── GuestCheckout.tsx
│   │       └── RegisteredCheckout.tsx
│   ├── Drinks/
│   │   ├── AvailableDrinks.module.css
│   │   ├── AvailableDrinks.tsx
│   │   ├── DrinkItem/
│   │   │   ├── DrinkItem.module.css
│   │   │   ├── DrinkItem.tsx
│   │   │   ├── DrinkItemForm.module.css
│   │   │   ├── DrinkItemForm.tsx
│   │   │   ├── DrinkItemList.module.css
│   │   │   └── DrinkItemList.tsx
│   │   ├── DrinksSummary.module.css
│   │   └── DrinksSummary.tsx
│   ├── Layout/
│   │   ├── HeadMeta.tsx
│   │   ├── Icons/
│   │   │   ├── CartCheck.tsx
│   │   │   ├── CartIcon.tsx
│   │   │   ├── ClearCart.tsx
│   │   │   ├── CompanyIcon.tsx
│   │   │   └── MenuHamburger.tsx
│   │   ├── Layout.module.css
│   │   ├── Layout.tsx
│   │   ├── MobileSideDrawer
│   │   │   ├── MobileSideDrawer.module.css
│   │   │   ├── MobileSideDrawer.tsx
│   │   │   ├── SideDrawerButton.module.css
│   │   │   └── SideDrawerButton.tsx
│   │   └── NavBar
│   │       ├── CartModal.tsx
│   │       ├── HeaderCartButton.module.css
│   │       ├── HeaderCartButton.tsx
│   │       ├── MainHeader.module.css
│   │       ├── MainHeader.tsx
│   │       ├── MainNavigation.module.css
│   │       ├── MainNavigation.tsx
│   │       ├── NavigationLinks.module.css
│   │       └── NavigationLinks.tsx
│   ├── PastOrders/
│   │   ├── DisplayPastOrders.module.css
│   │   ├── DisplayPastOrders.tsx
│   │   ├── PastOrderList.module.css
│   │   ├── PastOrderList.tsx
│   │   ├── PastOrders.module.css
│   │   └── PastOrders.tsx
│   ├── Profile/
│   │   ├── PasswordForm.module.css
│   │   ├── PasswordForm.tsx
│   │   ├── UserProfile.module.css
│   │   └── UserProfile.tsx
│   ├── Receipt/
│   │   ├── Receipt.module.css
│   │   ├── Receipt.tsx
│   │   ├── ReceiptItem.module.css
│   │   └── ReceiptItem.tsx
│   ├── UI/
│   │   ├── Card.module.css
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.module.css
│   │   ├── LoadingSpinner.tsx
│   │   ├── Modal.module.css
│   │   └── Modal.tsx
│   └── Welcome/
│       ├── WelcomeMessage.module.css
│       └── WelcomeMessage.tsx
├── drinksData/
│   ├── drinks.json
│   └── setCoffeeJSON_Data.js
├── models/
│   ├── Cart.ts
│   ├── Drink.ts
│   ├── DrinkItem.ts
│   ├── Order.ts
│   ├── Receipt.ts
│   ├── RegisteredUser.ts
│   ├── ServerStatus.ts
│   ├── UI_State.ts
│   └── User.ts
├── pages/
│   ├── HomePage.module.css
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── account/
│   │   ├── AccountPage.module.css
│   │   └── index.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth].ts
│   │   │   └── signup.ts
│   │   ├── cart/
│   │   │   └── cart.ts
│   │   ├── menu/
│   │   │   └── drinks.ts
│   │   ├── order/
│   │   │   └── order.ts
│   │   └── user/
│   │       └── change-password.ts
│   ├── auth/
│   │   ├── AuthPage.module.css
│   │   └── index.tsx
│   ├── index.tsx
│   └── menu/
│       ├── MenuPage.module.css
│       └── index.tsx
├── public
│   ├── drinkImages/
│   └── favicon/
├── store/
│   ├── cart/
│   │   ├── cart-actions.ts
│   │   └── cart-slice.ts
│   ├── fetcher/
│   │   └── fetch-items.ts
│   ├── hooks.ts
│   ├── index.ts
│   └── ui/
│       └── ui-slice.ts
├── styles/
│   └── globals.css
├── types/
│   └── next-auth.d.ts
└── utils/
    ├── animations/
    │   └── animation.ts
    ├── auth/
    │   └── auth.js
    ├── db/
    │   ├── db-drinks-util.js
    │   ├── db-util.js
    │   ├── input-validation.js
    │   └── mongodb-client.js
    └── validation/
        └── input_validation.ts
```
