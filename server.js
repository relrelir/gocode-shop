import express from "express";
// import * as fsp from "fs/promises";

import mongoose from "mongoose";
import dotenv from "dotenv";
// import http from "http";
// import { request } from "https";
dotenv.config();
const app = express();

const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  description: String,
  image: String,
  rating: { rate: Number, count: Number },
});

app.use(express.json());
// Serve static files from the React app
app.use(express.static("client/build"));

app.get("/api", (_, res) => {
  res.send("Hello World!");
});

app.get("/api/products", (_, res) => {
  Product.find()
    .then((products) => {
      // if (products.length >= 0) {
      res.send(products).status(200);
      // }
    })
    .catch((err) => {
      console.log("error");
      res.send(err).status(500);
    });

  // fsp
  //   .readFile("./products.json", "utf-8")
  //   .then((data) => {
  //     const products = JSON.parse(data);

  //     if (products.length > 0) {
  //       res.send(products);
  //       console.log("products delivered");
  //     } else {
  //       res.send("no products");
  //       console.log("no products");
  //     }
  //   })
  //   .catch((eror) => {
  //     console.log("eror1");
  //     send(eror);
  //   });
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((productId) => {
      if (Product !== undefined) {
        const selectedProduct = Product.find(
          (product) => product.id === +productId
        );
        console.log(selectedProduct);
        res.send(selectedProduct).status(200);
      }
    })

    .catch((error) => res.send(error).status(500));

  // const products = JSON.parse(data);

  // if (product !== undefined) {
  //   res.send(product);
  //   console.log(`product${productId}delivered`);
  // } else {
  //   res.send("Error, no product");
  // }
});

// function getMaxId(products) {
//   const ids = products.map((product) => {
//     return product.id;
//   });

//   const max = Math.max(...ids);
//   console.log(max);
//   return max;
// }

app.post("/api/products", (req, res) => {
  // const {
  //   title,
  //   price,
  //   description,
  //   category,
  //   image,
  //   rating: { rate, count },
  // } = req.body;

  Product.insertMany(req.body)
    .then((products) => {
      res.send(products).status(200);
      console.log("done");
    })
    .catch((error) => res.send(error).status(500));
  console.log("not");

  //   if (data) {
  //     const products = JSON.parse(data);
  //     const id = getMaxId(products) + 1;
  //     products.push({
  //       id,
  //       title,
  //       price,
  //       description,
  //       category,
  //       image,
  //       rating: { rate, count },
  //     });

  //     fsp.writeFile("./products.json", JSON.stringify(products));
  //     res.send(products);
  //     console.log("done3");
  //   } else {
  //     res.send("Please send a product");
  //   }
  // })
  // .catch((eror) => {
  //   console.log("eror3");
  //   send(eror);
  // });
});

app.patch("/api/products/:productId", (req, res) => {
  const { productId } = req.params;

  Product.findByIdAndUpdate(productId, req.body)
    .then((product) => res.send(product).status(200))
    .catch((error) => res.send(error).status(500));
});

app.delete("/api/products/:productId", (req, res) => {
  const { productId } = req.params;

  Product.findByIdAndRemove(productId)
    .then((product) => res.send(product).status(200))
    .catch((error) => res.send(error).status(500));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (_, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const PORT = process.env.PORT || 8000;

const { mongodb_pass, mongodb_user, mongodb_host, mongodb_name } = prosses.env;

mongoose
  .connect(
    `mongodb+srv://${mongodb_user}:${mongodb_pass}@${mongodb_host}/${mongodb_name}`
  )
  .then(() => {
    app.listen(PORT);
  });
// mongoose.connect("mongodb://localhost:27017/ariel_products").then(() => {
//   app.listen(8000);
// });

// app.get("/products", (req, res)  => {

// }

//   fsp
//     .readFile("./en.txt", "utf-8")
//     .then((enTxt) => {
//       fsp
//         .readFile("./translations.json", "utf-8")
//         .then((jason) => {
//           const translations = JSON.parse(jason);

//           for (let i = 0; i < translations.length; i++) {
//             let translation = translations[i];
//             if (translation.en === enTxt) {
//               fsp.writeFile("./he.txt", translation.he);
//               console.log("translation ID:", translation.id);
//               response.end("done translating");
//             }
//           }
//         })
//         .catch((error) => console.log(error));
//     })
//     .catch((error) => console.log(error));
// };

// http
