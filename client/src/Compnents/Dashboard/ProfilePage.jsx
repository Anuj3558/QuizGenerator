import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../Home/ui/avatar";
import { Button } from "../Home/ui/Button.jsx";
import Badge from "../Dashboard/Badge.jsx"; // Default import
import Progress from "../Dashboard/Progress.jsx"; // Default import
import {
  Award,
  Book,
  Briefcase,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl backdrop-filter backdrop-blur-lg border border-gray-700">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-purple-500">
            <AvatarImage src="/profile-avatar.jpg" alt="Profile" />
            <AvatarFallback className="bg-purple-500 text-2xl font-bold">
              JD
            </AvatarFallback>
          </Avatar>
          <Badge className="absolute bottom-0 right-0 bg-green-500">
            Online
          </Badge>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              John Doe
            </h2>
            <p className="text-gray-400 flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> New York, USA
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Mathematics
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-500 hover:bg-green-600"
            >
              Physics
            </Badge>
            <Badge
              variant="secondary"
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Computer Science
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" /> Senior Teacher at XYZ High
              School
            </p>
            <p className="text-gray-300 flex items-center">
              <Mail className="w-4 h-4 mr-2" /> john.doe@example.com
            </p>
            <p className="text-gray-300 flex items-center">
              <Phone className="w-4 h-4 mr-2" /> +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" /> Achievements
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-purple-500" /> Teacher of the
              Year 2023
            </li>
            <li className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-purple-500" /> Best Research
              Paper Award
            </li>
            <li className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-purple-500" /> 100% Student
              Satisfaction
            </li>
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Book className="w-5 h-5 mr-2 text-blue-500" /> Current Courses
          </h3>
          <ul className="space-y-2">
            <li>
              Advanced Calculus <Badge className="ml-2">25 students</Badge>
            </li>
            <li>
              Quantum Physics <Badge className="ml-2">18 students</Badge>
            </li>
            <li>
              Data Structures <Badge className="ml-2">30 students</Badge>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Teaching Stats</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Student Satisfaction</span>
              <span>95%</span>
            </div>
            <Progress value={95} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Course Completion Rate</span>
              <span>98%</span>
            </div>
            <Progress value={98} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Average Quiz Score</span>
              <span>88%</span>
            </div>
            <Progress value={88} className="h-2" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          <MessageSquare className="w-4 h-4 mr-2" /> Contact John
        </Button>
      </div>
    </div>
  );
}
