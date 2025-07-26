import Product from "../Models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  return res.json({
    products: products,
  });
};

export const getTotalProducts = async (req, res) => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "_id",
        totalItems: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalItems: 1,
      },
    },
  ]);
  return res.json({
    products,
  });
};

export const getTotalStocks = async (req, res) => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "_id",
        totalStock: { $sum: "$stock" },
      },
    },
  ]);
  return res.json({
    products,
  });
};

export const getAverageStocks = async (req, res) => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "_id",
        averageStock: { $avg: "$stock" },
      },
    },
  ]);
  return res.json({
    products,
  });
};

export const TotalValueofInventory = async (req, res) => {
  const products = await Product.aggregate([
    {
      $addFields: {
        totalValue: { $add: ["$price", "$stock"] },
      },
    },
    {
      $group: {
        _id: "_id",
        sumTotalValue: { $sum: "$totalValue" },
      },
    },
  ]);
  return res.json({
    products,
  });
};

export const getHighestStockProduct = async (req, res) => {
  const products = await Product.aggregate([
    {
      $sort: {
        stock: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return res.json({
    products,
  });
};

export const groupCategoryWishProducts = async (req, res) => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
      },
    },
  ]);

  return res.json({
    products,
  });
};

export const getAveragePriceCategory = async (req, res) => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        averagePrice: { $avg: "$price" },
      },
    },
  ]);
  return res.json({
    products,
  });
};

export const getTotalStockofCategory = async (req, res) => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalStock: { $sum: "$stock" },
      },
    },
  ]);
  return res.json({
    products,
  });
};

export const getCategoryWithMostProduct = async (req, res) => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
      },
    },
    {
      $sort: {
        totalProducts: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);
  return res.json({
    products,
  });
};

export const getTotalInventoryRevenue = async (req, res) => {
  const products = await Product.aggregate([
    {
      $addFields: {
        totalValue: { $add: ["$price", "$stock"] },
      },
    },
    {
      $group: {
        _id: "$category",
        totalRevenue: {
          $sum: "$totalValue",
        },
      },
    },
    {
      $sort: {
        totalRevenue: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);
  return res.json({
    products,
  });
};

export const getStocksBelow10 = async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: {
        stock: { $lt: 10 },
      },
    },
  ]);
  return res.json({
    products,
  });
};

export const addInventoryValue = async (req, res) => {
  const products = await Product.aggregate([
    {
      $addFields: {
        inventoryValue: { $multiply: ["$price", "$stock"] },
      },
    },
  ]);

  return res.json({
    products,
  });
};

export const getMostValuableProduct = async (req, res) => {
  const products = await Product.aggregate([
    {
      $addFields: {
        inventoryValue: { $multiply: ["$price", "$stock"] },
      },
    },
    {
      $sort: {
        inventoryValue: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return res.json({
    products,
  });
};

export const sortProductByInventoryValue = async (req, res) => {
  const products = await Product.aggregate([
    {
      $addFields: {
        inventoryValue: { $multiply: ["$price", "$stock"] },
      },
    },
    {
      $sort: {
        inventoryValue: -1,
      },
    },
  ]);

  return res.json({
    products,
  });
};

export const getAverageInventoryValuePerCategory = async (req, res) => {
  const products = await Product.aggregate([
    {
      $addFields: {
        inventoryValue: { $multiply: ["$price", "$stock"] },
      },
    },
    {
      $group: {
        _id: "$category",
        averageValue: { $avg: "$inventoryValue" },
      },
    },
  ]);

  return res.json({
    products,
  });
};

export const findProductPriceBetween100to500 = async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: {
        $and: [{ price: { $gt: 100 } }, { price: { $lt: 500 } }],
      },
    },
  ]);

  return res.json({
    products,
  });
};

export const findProductNameWithUltraKeyword = async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: {
        title: { $regex: /.*Ultra.*/ },
      },
    },
  ]);

  return res.json({
    products,
  });
};

export const getProductsofGroceriesWith50Stock = async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: {
        $and: [
          { category: { $eq: "groceries" } },
          {
            stock: { $gt: 50 },
          },
        ],
      },
    },
  ]);

  return res.json({
    products,
  });
};

export const getProductwithMoreStockThanAvg = async (req, res) => {
  const products = await Product.aggregate([
    {
      $setWindowFields: {
        output: {
          averageQuantity: {
            $avg: "$stock",
            window: {}
          }
        }
      }
    },
    {
      $match: {
        $expr: { $gt: ['$stock', '$averageQuantity']}
      } 
    },
    {
      $project: {
        _id: 0,
        title: 1,
        price: 1,
        stock: 1,
        averageQuantity: 1,
      }
    }
  ]);

  return res.json({
    products,
  });
};

export const convertToUppercase = async(req, res) => {
  const products = await Product.aggregate([
    {
      $project: {
        title: { $toUpper: "$title" },
        stock: 1,
        price: 1,
        category: 1
      }
    }
  ])
  return res.json({
    products
  })
}