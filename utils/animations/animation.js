export const pageAnimation = {
  // Item appears from the top and settles in a bouncy way.
  in: {
    y: -200,
  },
  animate: {
    y: 0,
  },
  transition: {
    type: 'spring',
    duration: 0.3,
  },
};
export const cartBumpAnimation = {
  // Make the cart appear larger then change back to its regular size.
  scale: [1, 0.9, 1.1, 1.15, 1],
  transition: {
    ease: 'easeOut',
    duration: 0.2,
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
  // Cart items disappear to the right.
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
  // Items appear from the left.
  in: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
};

export const pastOrdersAnimationList = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

export const pastOrdersAnimationItem = {
  // Items appear falling into place.
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};
