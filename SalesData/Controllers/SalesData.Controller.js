import Orders from "../Models/Orders.js";
import moment from 'moment'

export async function getTotalSalesPerCustomer(req, res) {
  const sum = await Orders.aggregate([
    {
      $group: {
        _id: "$customerId",
        // customerId: { $first: "$customerId" },
        totalSales: { $sum: "$price" },
        totalOrder: { $sum: 1 }
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $unwind: "$customerDetails",
    },
    {
      $project: {
        _id: 0,
        customerId: "$customerDetails._id",
        name: "$customerDetails.name",
        totalSales: 1,
        totalOrder: 1
      },
    },
  ]);
  console.log(sum);
  return res.json({
    SalersPerCustomers: sum,
  });
}

export async function getTop3Products(req,res) {
  const products = await Orders.aggregate([
    {
      $unwind: '$products'
    },
    {
      $group: {
        "_id": '$products.productId',
        totalQuantity: { $sum: '$products.quantity'}
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    {
      $unwind: '$productDetails'
    },
    {
      $addFields: {
        pricePerUnit: '$productDetails.price',
        title: '$productDetails.title',
        thumbnail: '$productDetails.thumbnail',
        totalRevenue: {
          $multiply: ['$totalQuantity', '$productDetails.price']
        }
      }
    },
    {
      $sort: { totalRevenue: -1 }
    },
    {
      $limit: 3
    },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        title: 1,
        thumbnail: 1,
        totalQuantity: 1,
        pricePerUnit: 1,
        totalRevenue: 1
      }
    }
  ])

  return res.json({
    top3Product: products
  })
}

export async function getOrderMoreThanAvgQuantity(req, res) {
  const products = await Orders.aggregate([
    {
      $project: {
        customerId: 1,
        products: 1,
        totalQuantity: {
          "$sum": "$products.quantity"
        }
      }
    },
    {
      $setWindowFields: {
        output: {
          averageQuantity: {
            $avg: "$totalQuantity",
            window: {}
          }
        }
      }
    },
    {
      $match: {
        $expr: { $gt: ['$totalQuantity', "$averageQuantity"]}
      }
    },
    {
      $project: {
        _id: 0,
        customerId: 1,
        totalQuantity: 1,
        averageQuantity: 1,
        products: 1
      }
    }
  ])
  return res.json({
    products: products
  })
}

export async function getMonthlyTrends(req, res) {
  const lastYearDate = new Date()
  lastYearDate.setMonth(lastYearDate.getMonth() - 12)

  const data = await Orders.aggregate([
    {
      $match: {
        createdAt: { $gte: lastYearDate }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt"},
          month: { $month: "$createdAt"},
        },
        totalSales: { $sum: "$price" },
        totalOrder: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalSales: 1,
        totalOrder: 1
      }
    },
    {
      $sort: {
        year: 1,
        month: 1
      }
    }
  ])

  // const data = await Orders.find({}, { createdAt: 1})

  const formatData = data.map(entry => ({
    month: moment().month(entry.month - 1).year(entry.year).format("MMM YYYY"),
    totalSales: entry.totalSales,
    totalOrder: entry.totalOrder
  }))

  return res.json({
    data: formatData
  })
}