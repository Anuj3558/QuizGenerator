import React from "react";

const ClassroomDetail = ({
  classroom,
  setSelectedClassroom,
  updateClassroom,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold">{classroom.name}</h2>
      <p className="text-sm">Class Code: {classroom.code}</p>
      {/* Additional details and functionality can be added here */}
      <button
        onClick={() => setSelectedClassroom(null)}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
      >
        Back to Classrooms
      </button>
    </div>
  );
};

export default ClassroomDetail;
