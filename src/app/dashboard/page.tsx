// "use client";
// import { useState, useEffect } from "react";
// import { client } from "@/sanity/lib/client";

// // Define Order Type
// interface Order {
//   _id: string;
//   name: string;
//   email: string;
//   totalAmount: number;
//   createdAt: string;
// }

// const DashboardStats: React.FC = () => {
//   const [orders, setOrders] = useState<number>(0);
//   const [revenue, setRevenue] = useState<number>(0);
//   const [customers, setCustomers] = useState<number>(0);
//   const [recentOrders, setRecentOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // Fetch orders from Sanity (sorted by recent orders)
//         const data: Order[] = await client.fetch(`
//           *[_type == "order"] | order(_createdAt desc)[0..4] {
//             _id,
//             name,
//             email,
//             totalAmount,
//             _createdAt
//           }
//         `);

//         // Calculate total orders
//         const totalOrders: number = data.length;

//         // Calculate total revenue
//         const totalRevenue: number = data.reduce((acc, order) => acc + order.totalAmount, 0);

//         // Calculate unique customers (Using email)
//         const uniqueCustomers: number = new Set(data.map(order => order.email)).size;

//         // Set State
//         setOrders(totalOrders);
//         setRevenue(totalRevenue);
//         setCustomers(uniqueCustomers);
//         setRecentOrders(data); // Set recent orders
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {/* Total Orders */}
//         <div className="bg-white shadow-md p-4 rounded-lg">
//           <h2 className="text-xl font-semibold">Total Orders</h2>
//           <p className="text-2xl font-bold mt-2">{orders}</p>
//         </div>

//         {/* Revenue */}
//         <div className="bg-white shadow-md p-4 rounded-lg">
//           <h2 className="text-xl font-semibold">Revenue</h2>
//           <p className="text-2xl font-bold mt-2">${revenue.toFixed(2)}</p>
//         </div>

//         {/* Total Customers */}
//         <div className="bg-white shadow-md p-4 rounded-lg">
//           <h2 className="text-xl font-semibold">Total Customers</h2>
//           <p className="text-2xl font-bold mt-2">{customers}</p>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white shadow-md p-6 rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-4 border">Order ID</th>
//                 <th className="py-2 px-4 border">Customer</th>
//                 <th className="py-2 px-4 border">Email</th>
//                 <th className="py-2 px-4 border">Total</th>
//                 <th className="py-2 px-4 border">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((order) => (
//                 <tr key={order._id} className="text-center border-t">
//                   <td className="py-2 px-4 border">{order._id.slice(-6)}</td>
//                   <td className="py-2 px-4 border">{order.name}</td>
//                   <td className="py-2 px-4 border">{order.email}</td>
//                   <td className="py-2 px-4 border">${order.totalAmount.toFixed(2)}</td>
//                   <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardStats;
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Search,
} from "lucide-react";
import { client } from "@/sanity/lib/client"; // Import Sanity client

interface Order {
  _id: string;
  name: string;
  email: string;
  totalAmount: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const DashboardStats: React.FC = () => {
  const [orders, setOrders] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [customers, setCustomers] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    // Fetch orders from Sanity
    const fetchOrders = async () => {
      try {
        const data: Order[] = await client.fetch(`
          *[_type == "order"] | order(_createdAt desc) {
            _id,
            name,
            email,
            totalAmount,
            createdAt,
            status
          }
        `);

        // Calculate stats
        const totalOrders = data.length;
        const totalRevenue = data.reduce((acc, order) => acc + order.totalAmount, 0);
        const uniqueCustomers = new Set(data.map((order) => order.email)).size;

        // Set state
        setOrders(totalOrders);
        setRevenue(totalRevenue);
        setCustomers(uniqueCustomers);
        setRecentOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Error fetching orders from Sanity:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on search term
    const filtered = recentOrders.filter(order => 
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.includes(searchTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, recentOrders]);

  return (
    <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{orders}</div>
            <p className="text-xs text-gray-600">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">${revenue.toFixed(2)}</div>
            <p className="text-xs text-gray-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Customers</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{customers}</div>
            <p className="text-xs text-gray-600">+8.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">12.5%</div>
            <p className="text-xs text-gray-600">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-4">
          <CardTitle className="text-sm sm:text-base">Revenue Overview</CardTitle>
          <div className="flex gap-1 sm:gap-2">
            <button 
              onClick={() => setTimeframe('daily')}
              className={`px-2 py-1 rounded-md text-xs sm:text-sm ${
                timeframe === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              Daily
            </button>
            <button 
              onClick={() => setTimeframe('weekly')}
              className={`px-2 py-1 rounded-md text-xs sm:text-sm ${
                timeframe === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeframe('monthly')}
              className={`px-2 py-1 rounded-md text-xs sm:text-sm ${
                timeframe === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              Monthly
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="h-[200px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-4">
          <CardTitle className="text-sm sm:text-base">Recent Orders</CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-6 pr-2 py-1 sm:pl-8 sm:pr-4 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          {/* Mobile-Friendly Card Layout */}
          <div className="lg:hidden space-y-2">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-semibold">#{order._id.slice(-6)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Customer</span>
                    <span className="text-xs sm:text-sm font-medium">{order.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Amount</span>
                    <span className="text-xs sm:text-sm font-medium">${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Date</span>
                    <span className="text-xs sm:text-sm">{new Date(order.createdAt).toDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Layout for Larger Screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600">Order ID</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600">Customer</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600">Email</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600">Amount</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600">Date</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">#{order._id.slice(-6)}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">{order.name}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">{order.email}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;