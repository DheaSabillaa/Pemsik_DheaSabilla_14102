import React from "react";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const dosen = JSON.parse(localStorage.getItem("dataDosen")) || [];
  const mahasiswa = JSON.parse(localStorage.getItem("dataMahasiswa")) || [];
  const matkul = JSON.parse(localStorage.getItem("dataMatkul")) || [];
  const kelas = JSON.parse(localStorage.getItem("dataKelas")) || [];

  const chartData = [
    { name: "Dosen", jumlah: dosen.length },
    { name: "Mahasiswa", jumlah: mahasiswa.length },
    { name: "Mata Kuliah", jumlah: matkul.length },
    { name: "Kelas", jumlah: kelas.length },
  ];

  const pieData = chartData.map((item) => ({
    name: item.name,
    value: item.jumlah,
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#a855f7"];

  // Dummy timeline data
  const timelineData = [
    { bulan: "Jan", mahasiswa: 20, dosen: 5 },
    { bulan: "Feb", mahasiswa: 40, dosen: 6 },
    { bulan: "Mar", mahasiswa: 60, dosen: 7 },
    { bulan: "Apr", mahasiswa: 80, dosen: 8 },
    { bulan: "Mei", mahasiswa: mahasiswa.length, dosen: dosen.length },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-xl font-semibold mb-4">Dashboard</h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h2 className="text-lg font-medium">Dosen</h2>
              <p className="text-3xl font-bold text-blue-600">{dosen.length}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h2 className="text-lg font-medium">Mahasiswa</h2>
              <p className="text-3xl font-bold text-green-600">
                {mahasiswa.length}
              </p>
            </div>
            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h2 className="text-lg font-medium">Mata Kuliah</h2>
              <p className="text-3xl font-bold text-yellow-600">
                {matkul.length}
              </p>
            </div>
            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h2 className="text-lg font-medium">Kelas</h2>
              <p className="text-3xl font-bold text-purple-600">
                {kelas.length}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Jumlah Data</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Proporsi Data</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Perkembangan</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mahasiswa" stroke="#10b981" />
                  <Line type="monotone" dataKey="dosen" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
