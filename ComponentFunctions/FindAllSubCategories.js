getCategoryObjSubCategories = objArray => {
  let subCategories = [];
  let newObjArray = [];

  objArray.forEach(obj => {
    if (Object.keys(obj.subCategories).length !== 0) {
      Object.keys(obj.subCategories).forEach(key => {
        subCategories.push({ key: key, parent: obj.category });
        if (Object.keys(obj.subCategories[key].subCategories).length !== 0) {
          newObjArray.push(obj.subCategories[key]);
        } else {
          console.log("no subcats for " + key);
        }
      });
    } else {
      console.log("no subcats for " + obj.category);
    }
  });

  return { newObjArray: newObjArray, subCategories: subCategories };
};

export const findAllSubCategories = passedObj => {
  let subCategoriesData = {
    newObjArray: [passedObj],
    subCategories: []
  };

  let subCategoriesNames = [];

  do {
    subCategoriesData = getCategoryObjSubCategories(
      subCategoriesData.newObjArray
    );
    console.log(subCategoriesData);
    subCategoriesNames = [
      ...subCategoriesNames,
      ...subCategoriesData.subCategories
    ];
  } while (subCategoriesData.newObjArray.length !== 0);

  return subCategoriesNames;
};

// export const findAllSubCategories = passedObj => {
//     const categoryKey = passedObj.category.replace(/\s+/g, "").toUpperCase();

//     let objArray = [passedObj]

//     let subCategories = Object.keys(passedObj.subCategories).map(key => {
//       return { key: key, parent: categoryKey };
//     });

//     let allSubcategoriesFound = false;
//     let test = 1;

//     do {
//       if (test < 5) {
//         //   test = test + 1;
//         console.log("testing");
//       } else {
//         console.log("done");
//         //allSubcategoriesFound = true;
//       }
//     } while (allSubcategoriesFound);

//     //   subCategories.forEach(item => {
//     //     let initObj = passedObj.subCategories[item.key];

//     //     if (Object.keys(initObj.subCategories).length !== 0) {
//     //       Object.keys(initObj.subCategories).forEach(key => {
//     //         subCategories.push({ key: key, parent: initObj.category });
//     //       });
//     //       //console.log(subSubCategories);
//     //     } else {
//     //       console.log("no subcats for " + item.key);
//     //     }
//     //   });

//     subCategories.forEach(item => {
//       let initObj = passedObj.subCategories[item.key];

//       const data = getCategoryObjSubCategories(initObj);
//       console.log(data);
//     });

//     return subCategories;
//   };
