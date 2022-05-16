let compCategories = {
  AAPL: {
    PRODUCTS: {
      category: "Products",
      subCategories: {
        IPHONE: {
          parent: "Products",
          category: "Iphone",
          predictiveIndex: {},
          subCategories: {
            IPHONE10: {
              parent: "Iphone",
              category: "Iphone 10",
              predictiveIndex: {},
              subCategories: {}
            }
          }
        },
        MACBOOKPRO: {
          parent: "Products",
          category: "MacBook Pro",
          predictiveIndex: {},
          subCategories: {
            MAC2019: {
              parent: "MacBook Pro",
              category: "Mac 2019",
              predictiveIndex: {},
              subCategories: {}
            }
          }
        }
      },
      predictiveIndex: {}
    },
    ADVERTISING: {
      category: "Advertising",
      subCategories: {
        RECENT: {
          parent: "Advertising",
          category: "Recent",
          predictiveIndex: {},
          subCategories: {}
        }
      },
      predictiveIndex: {}
    },
    STORES: {
      category: "Stores",
      subCategories: {
        NEWYORK: {
          parent: "Stores",
          category: "New York",
          predictiveIndex: {},
          subCategories: {}
        }
      },
      predictiveIndex: {}
    },
    COMPETITION: {
      category: "Competition",
      subCategories: {
        MICROSOFT: {
          parent: "Competition",
          category: "Microsoft",
          predictiveIndex: {},
          subCategories: {}
        }
      },
      predictiveIndex: {}
    },
    OPINION: {
      category: "Opinion",
      subCategories: {
        FUTURE: {
          parent: "Opinion",
          category: "Future",
          predictiveIndex: {},
          subCategories: {}
        }
      },
      predictiveIndex: {}
    }
  }
};

export const findCompCategories = ticker => {
  const companyCategories = compCategories[ticker]
    ? compCategories[ticker]
    : { NONE: { category: "None" } };

  return companyCategories;
};

// subCategories: [
//     {
//       parent: "Products",
//       word: "Iphone",
//       predictiveIndex: {}
//     },
//     {
//       parent: "Opinion",
//       word: "Future",
//       predictiveIndex: {}
//     },
//     {
//       parent: "Competition",
//       word: "Microsoft",
//       predictiveIndex: {}
//     },
//     {
//       parent: "Stores",
//       word: "New York",
//       predictiveIndex: {}
//     },
//     {
//       parent: "Advertising",
//       word: "Recent",
//       predictiveIndex: {}
//     }
//   ]
