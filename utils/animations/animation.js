export const homePageAnimation = {
  // Page moves in from the left.
  in: {
    x: '-100vw',
  },
  // Page settles in the middle.
  animate: {
    x: 0,
  },
  // Page moves out to the left.
  out: {
    x: '-100vw',
  },
  transition: {
    duration: 0.4,
  },
};

export const menuPageAnimation = {
  // Page moves in from the right.
  in: {
    x: '100vw',
  },
  // Page settles in the middle.
  animate: {
    x: 0,
    // Framer motion automatically turns a div into display block.
    // Change back to inline so the background image stays fixed.
    transitionEnd: {
      display: 'inline',
    },
  },
  // Page moves out to the right.
  out: {
    display: 'block',
    x: '100vw',
  },
  transition: {
    duration: 0.4,
  },
};

export const cartBumpAnimation = {
  // Make the cart appear larger then change back to its regular size.
  scale: [1, 0.9, 1.1, 1.15, 1],
  transition: {
    ease: 'easeIn',
    stiffness: 100,
    duration: 0.3,
  },
};

export const modalAnimation = {
  // Modal drops in from the top of the page.
  in: {
    y: -200,
    opacity: 0.5,
  },
  // Modal sits below the header.
  animate: {
    y: 0,
    opacity: 1,
  },
  // Modal moves up and disappears.
  out: {
    y: -200,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export const cartItemAnimation = {
  out: {
    x: 100,
    opacity: 0,
  },
};

export const drinkItemListAnimation = {
  // Drink starts with opacity of zero
  in: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  // Drink animates to visible
  // All items in the list stagger 0.3s after
  animate: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

export const drinkItemAnimation = {
  in: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
};
