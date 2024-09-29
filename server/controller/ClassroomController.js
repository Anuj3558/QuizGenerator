import Classroom from "../model/Classroom.js"; // Adjust the path if needed

// Utility function to generate a unique alphanumeric code
const generateUniqueCode = (length = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Define the createClassroom function
const createClassroom = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { classroom } = req.body;
    console.log(classroom);

    // Generate a unique code for the classroom
    const classroomCode = generateUniqueCode();

    const newClassroom = new Classroom({
      teacherId: classroom.teacherId, // Use the teacherId from the request
      classroomName: classroom.classroomName,
      teacherName: classroom.teacherName,
      code: classroomCode, // Use the generated code
      content: {
        videos: classroom.content.videos || [],
        notes: classroom.content.notes || [],
        announcements: classroom.content.announcements || [],
        syllabus: classroom.content.syllabus || [],
      },
    });

    // Save the classroom to the database
    const savedClassroom = await newClassroom.save();

    // Respond with the created classroom
    res.status(201).json({
      success: true,
      message: "Classroom created successfully!",
      classroom: savedClassroom,
    });
    console.log("Classroom created");
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create classroom",
      error: error.message,
    });
  }
};
const getClassrooms = async (req, res) => {
  const { teacherId } = req.body;
  console.log(teacherId);
  try {
    const classrooms = await Classroom.find({ teacherId });
    
    res.status(200).json({ classrooms });
  } catch (error) {
    console.log("Error in fetching classroos ");
  }
};

// Export the function if you are going to use it in a route
export { createClassroom, getClassrooms };
