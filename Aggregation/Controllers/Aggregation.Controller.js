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

export const TotalValueofInventory = async(req, res) => {
    const products = await Product.aggregate([
        {
            $addFields: {
                totalValue: { $add: ['$price', '$stock']}
            }
        },
        {
            $group: {
                _id: '_id',
                sumTotalValue: { $sum: '$totalValue'}
            }
        }
    ])
    return res.json({
        products
    })
}

export const getHighestStockProduct = async(req, res) => {
    const products = await Product.aggregate([
        {
            $sort: {
                'stock': -1
            }
        },
        {
            $limit: 1
        }
    ])

    return res.json({
        products
    })
}

export const groupCategoryWishProducts = async(req, res) => {
    const products = await Product.aggregate([
        {
            $group: {
                _id: '$category',
                totalProducts: { $sum: 1 }
            }
        }
    ])

    return res.json({
        products
    })
}

export const getAveragePriceCategory = async(req, res) => {
    const products = await Product.aggregate([
        {
            $group: {
                _id: '$category',
                averagePrice: { $avg: '$price'}
            }
        }
    ])
    res.json({
        products
    })
}

export const getTotalStockofCategory = async(req, res) => {
    const products = await Product.aggregate([
        {
            $group: {
                _id: '$category',
                totalStock: { $sum: '$stock' }
            }
        }
    ])
    res.json({
        products
    })
}