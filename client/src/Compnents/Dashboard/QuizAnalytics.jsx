import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

const data = [
  { name: "Q1", attempts: 30, correct: 20 },
  { name: "Q2", attempts: 40, correct: 25 },
  { name: "Q3", attempts: 35, correct: 30 },
  { name: "Q4", attempts: 50, correct: 45 },
  { name: "Q5", attempts: 25, correct: 10 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 rounded-lg shadow-lg border border-cyan-500">
        <p className="text-cyan-300 font-bold">{`Question ${label}`}</p>
        <p className="text-blue-400">{`Attempts: ${payload[0].value}`}</p>
        <p className="text-green-400">{`Correct: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function QuizAnalytics() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-6 h-screen overflow-hidden text-white">
      <h2 className="text-5xl font-bold mb-8 text-center text-cyan-300 tracking-wider">
        Quiz Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-cyan-500">
          <h3 className="text-xl font-semibold mb-2 text-cyan-300 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-400" />
            Participants
          </h3>
          <p className="text-gray-300">
            Total: <span className="text-cyan-400">150</span>
          </p>
          <p className="text-gray-300">
            Active: <span className="text-cyan-400">120</span>
          </p>
          <p className="text-gray-300">
            Completed: <span className="text-cyan-400">100</span>
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-cyan-500">
          <h3 className="text-xl font-semibold mb-2 text-cyan-300 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-yellow-400" />
            Average Time Spent
          </h3>
          <p className="text-gray-300">
            On Average: <span className="text-cyan-400">35 mins</span>
          </p>
          <p className="text-gray-300">
            Fastest: <span className="text-cyan-400">20 mins</span>
          </p>
          <p className="text-gray-300">
            Slowest: <span className="text-cyan-400">50 mins</span>
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-cyan-500">
          <h3 className="text-xl font-semibold mb-2 text-cyan-300 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Quiz Completion Rate
          </h3>
          <p className="text-gray-300">
            Completed: <span className="text-cyan-400">85%</span>
          </p>
          <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: "85%" }} />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-cyan-500">
          <h3 className="text-xl font-semibold mb-2 text-cyan-300 flex items-center">
            <XCircle className="w-5 h-5 mr-2 text-red-400" />
            Failure Rate
          </h3>
          <p className="text-gray-300">
            Failed: <span className="text-cyan-400">15%</span>
          </p>
          <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: "15%" }} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-96 mt-6 bg-gray-800 rounded-xl shadow-2xl border border-cyan-500 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="correct"
              stroke="#00ff00"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              filter="url(#glow)"
            />
            <Line
              type="monotone"
              dataKey="attempts"
              stroke="#0088FE"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow" height="300%" width="300%" x="-75%" y="-75%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg border border-cyan-500">
        <h3 className="text-2xl font-semibold mb-4 text-cyan-300">
          Detailed Insights
        </h3>
        <p className="text-gray-300">
          Top Scorer:{" "}
          <span className="text-green-400 font-bold">Jane Smith - 95%</span>
        </p>
        <p className="text-gray-300">
          Most Difficult Question:{" "}
          <span className="text-red-400 font-bold">Q5 (70% incorrect)</span>
        </p>
      </div>
    </div>
  );
}
