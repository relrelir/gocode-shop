import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  rating: { rate: Number, count: Number },
});
const Product = mongoose.model("Product", productSchema);

// const Product = mongoose.model("Product", {
//   title: String,
//   price: Number,
//   description: String,
//   image: String,
//   category: String,
//   rating: { rate: Number, count: Number },
// });

app.use(express.json());
// Serve static files from the React app
app.use(express.static("client/build"));

app.get("/api", (_, res) => {
  res.send("Hello World!");
});

app.get("/api/products", (_, res) => {
  Product.find()
    .then((products) => {
      if (products.length >= 0) {
        res.send(products).status(200);
      }
    })
    .catch((err) => {
      console.log("error");
      res.send(err).status(500);
    });
});

app.get("/api/products", (_, res) => {
  const { title } = req.query;
  Product.find()
    .then((products) => {
      const includedProductsTitles = title
        ? products.filter((product) =>
            product.title.toLowerCase().includes(title.toLowerCase())
          )
        : res.send(includedProductsTitles).status(200);
    })
    .catch((err) => {
      console.log("error");
      res.send(err).status(500);
    });
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        res.send("Product not found").status(404);
      } else {
        res.send(product).status(200);
      }
    })
    .catch((error) => res.send(error).status(500));
});

app.post("/api/products", (req, res) => {
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
// app.get("*", (_, res) => {
//   res.sendFile("/client/build/index.html");
// });

const PORT = process.env.PORT || 8000;

const { mongodb_pass, mongodb_user, mongodb_host, mongodb_name } = process.env;

mongoose
  .connect(
    `mongodb+srv://${mongodb_user}:${mongodb_pass}@${mongodb_host}/${mongodb_name}`
  )
  .then(() => {
    app.listen(PORT);
  });

// mongoose
//   .connect(
//     `mongodb+srv://${mongodb_user}:${mongodb_pass}@${mongodb_host}/${mongodb_name}`
//   )
//   .then(async () => {
//     if (!(await Product.count())) {
//       let products = JSON.parse(await fsp.readFile("./products.json", "utf-8"));
//       await Product.insertMany(products);
//     }
//     app.listen(PORT);
//   });
